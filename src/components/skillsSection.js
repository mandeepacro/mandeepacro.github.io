import React, { useState, useEffect, useRef } from 'react'
import { StaticImage } from "gatsby-plugin-image"
import { useStaticQuery, graphql } from 'gatsby';
import * as styles from "./skillsSection.module.css";
import { InView } from 'react-intersection-observer';
import { Code } from 'react-content-loader'
import Typed from "typed.js";
import { error } from 'jquery';

const SkillsSection = () => {
  const skillsList = useRef([]);
  const el = useRef(null);
  const typed = useRef(null)
  const apiSecretKey = process.env.GATSBYAPP_API_SECRET_KEY;
  const [poemText, setPoemText] = useState(null);
  const [showHonourableMentionText, setShowHonourableMentionText] = useState(false);
  const [skillsIgnored, setSkillsIgnored] = useState([]);
  const [response, setResponse] = useState(null);
  const [sectionIsVisible, setSectionIsVisible] = useState(false);
  const [disableGenerateButton, setDisableGenerateButton] = useState(true);
  const ErrorMessage = "Unable to generate poem due to some error. Please try again sometime later.";
  //var typedObj = null;

  const data = useStaticQuery(
    graphql`
        query {
          allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/src/content/skills/"}}) {
            nodes {
              frontmatter {
                title,
                list {
                    domain
                    skills {
                        name
                        color
                    }
                }
              }
            }
          }
        }
    `);

  useEffect(() => {
    console.log("API key is undefined - ", process.env.GATSBYAPP_API_SECRET_KEY);
    let skillsArray = data.allMarkdownRemark.nodes[0].frontmatter.list;
    let skills = [];
    skillsArray.forEach(el => {
      el.skills.forEach(skill => {
        skills.push(skill);
      });
    })
    skillsList.current = skills;

    if (typeof window !== "undefined") {
      const fetchPoemData = async () => {
        try {
          setPoemText("initiated");
          setDisableGenerateButton(true);
          let result = await createCompletion(false);
            generateNonUsedSkills(result);
            setResponse(result);
        } catch (error) {
          console.error('Error fetching data:', error);
          setResponse(ErrorMessage);
        }
      };
      fetchPoemData();
    }
    //get the poem response from chatGPT
  }, []); // empty dependency array to run the effect only once

  
  async function createCompletion(isMock) {
    prompt = `Generate a sweet, simple and fun poem of developing a fullstack website using my skills. Here are the list of skills to use - ${skillsList.current.map(obj => obj.name).join(", ")}. Note: Generate a intersesting title for the poem as the first line and then start with the poem body, Use exact words as provided in the skills to use list.`;

    console.log("CALLING THE API");
    const DEFAULT_PARAMS = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.5
    };

    if (!isMock) {
        const result = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiSecretKey}`
          },
          body: JSON.stringify(DEFAULT_PARAMS)
        });
  
        const stream = result.body
        const output = await fetchStream(stream);
        console.log("output - ", output);
        return output.choices[0].message.content;
    }
    else {
      let mockPoem = `The Sweet Symphony of Fullstack Development
  
      With HTML and CSS, I started my quest,
      To create a website that's simply the best.
      JavaScript and SCSS, my trusty tools,
      To bring my vision to life, no longer just a fool.`;

      return new Promise((resolve, reject) => {
        // Simulating asynchronous behavior
        setTimeout(() => {
          resolve(mockPoem); // Resolve with mock data
        }, 1000);
      });
    }
  }

  async function fetchStream(stream) {
    const reader = stream.getReader();
    let charsReceived = 0;
    const li = document.createElement("li");

    // read() returns a promise that resolves
    // when a value has been received
    const result = await reader.read().then(
      function processText({ done, value }) {
        // Result objects contain two properties:
        // done  - true if the stream has already given you all its data.
        // value - some data. Always undefined when done is true.
        if (done) {
          //console.log("Stream complete");
          return li.innerText;
        }
        // value for fetch streams is a Uint8Array
        charsReceived += value.length;
        const chunk = value;
        //console.log(`Received ${charsReceived} characters so far. Current chunk = ${chunk}`);
        li.appendChild(document.createTextNode(chunk));
        return reader.read().then(processText);
      });
    const list = result.split(",")
    const numList = list.map((item) => {
      return parseInt(item)
    })
    const text = String.fromCharCode(...numList);
    const res = JSON.parse(text);
    return res;
  }

  useEffect(() => {
    //console.log("useEffect response - ",response);
    if (response && sectionIsVisible) {
      handleSectionVisibility(true);
    }
  }, [response]); // empty dependency array to run the effect only once

  useEffect(() => {
    //console.log("useEffect poemText - ",poemText);
    if (poemText && poemText != "initiated") {
      //if(typed.current == null){
      typed.current = null;
      typed.current = new Typed(el.current, {
        strings: [convertPoemTextToFormattedHtmlString(poemText)],
        backSpeed: 0,
        showCursor: false,
        loop: false,
        typeSpeed: 10,
        onComplete: handleHonourableMentionText
      });
    }
  }, [poemText]);

  const convertPoemTextToFormattedHtmlString = (poemText) => {
    if (poemText !== ErrorMessage) {
      //add br and p tag to make create HtmlString
      const [poemTitle, ...poemLines] = poemText.split("\n");
      const poemTitleHtmlString = `<h2 style="color:#fff;margin-bottom:1.2rem;margin-left:auto;font-weight:700">${poemTitle}</h2>`;
      const poemAuthourHtmlString = `<p style="font-weight:700;margin-bottom:2.5rem;">by <span style="color:#10a37f">ChatGPT</span></p>`;

      var poemBody = poemLines.join("\n");
      poemBody = poemBody.replace(/\n/g, '<br>');
      var bodyhtml = `<p>${poemBody}</p>`;

      //format each skill with different color
      const poemBodyHtmlString = skillsList.current.reduce((acc, skill) => {
        return acc.replace(skill.name, `<span style="color:${skill.color}">${skill.name}</span>`);
      }, bodyhtml);

      return poemTitleHtmlString + poemAuthourHtmlString + poemBodyHtmlString;
    }
    else {
      return `<p style="color:#aaa">${ErrorMessage}</p>`;
    }

  };

  function generateNonUsedSkills(poemText) {
    let nonusedSkills = [];
    skillsList.current.forEach(skill => {
      if (!(poemText.includes(skill.name))) {
        nonusedSkills.push(skill);
      }
    })
    setSkillsIgnored(nonusedSkills);
  }

  async function handleSectionVisibility(isVisible) {
    if (typeof window !== 'undefined') {
      if (isVisible) {
        setSectionIsVisible(true);
        //console.log("Section is now visible!");
        if (response && poemText == "initiated") {
          //console.log("Got the resonse - ", response);
          setPoemText(response);
        }
      } else {
        setSectionIsVisible(false);
        //console.log("Section is no longer visible!");
      }
    }

  }

  async function regeneratePoem() {
    //resettings the variables to default
    setSkillsIgnored([]);
    setDisableGenerateButton(true);
    setPoemText("initiated");
    setResponse(null)
    setShowHonourableMentionText(false);

    try{
    let result = await createCompletion(false);
    generateNonUsedSkills(result);
    setResponse(result);
  } catch (error) {
    console.error('Error fetching data:', error);
    setResponse(ErrorMessage);
  }
  }

  function handleHonourableMentionText() {
    setDisableGenerateButton(false);

    if (skillsIgnored.length > 0) {
      setShowHonourableMentionText(true);
    }
  }

  return (
    <div>
      <InView as="div" onChange={handleSectionVisibility} threshold={0.5}>
        <section className='relative bg-black pb-10 lg:pb-32 lg:min-h-screen' id='skills'>
          <div className='absolute h-full w-full left-0 top-0'>
            <StaticImage src="../images/skills-bg.png" className='h-full w-full object-cover object-center opacity-[0.1] pointer-events-none' alt="A kitten" />
          </div>

          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-12 lg:gap-x-16">
              <div className="col">

                <div className="text-center lg:text-left">
                  <h2 className="section-heading mb-4">
                    MY SKILLS
                  </h2>
                  <p className="text-gray text-opacity-50 italic text-lg font-normal mb-12">
                    Instead of simply listing the skills, I asked ChatGPT to generate a poem about developing a website using my skills.
                  </p>

                  <div className="mt-6 lg:mt-12">
                    <button className="btn btn-dark btn-primary" onClick={regeneratePoem} disabled={disableGenerateButton}>
                      <span>
                        generate new poem
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-span-2 lg:border-l border-darkgrey border-opacity-25">
                <div className="text-center lg:text-right">
                  {
                    (response != null && poemText !== "initiated") ?
                      <>
                        <div ref={el} className={styles.paragraph}></div>
                        {
                          skillsIgnored.length > 0 && showHonourableMentionText ? (
                            <div className='animate animate-fade-up'>
                              <h4 className='mt-20 text-white text-center lg:text-right font-semibold mb-2'>
                                Some honorable mentions that ChatGPT ignored in above masterpiece -
                              </h4>
                              <div className="text-center lg:text-right">
                                {
                                  skillsIgnored.map((skill, index) => (
                                    <p className='inline-block mr-1 text-base  lg:text-xl text-white font-bold leading-normal'>
                                      <span className='relative z-20' style={{ color: skill.color }}>
                                        {skill.name}
                                      </span>
                                      <span className='relative z-20'>
                                        {index != skillsIgnored.length - 1 ? "," : ""}
                                      </span>
                                    </p>
                                  ))
                                }
                              </div>
                            </div>
                          ) : ""
                        }
                      </>
                      :
                      <>
                        <h4 className='text-gray text-lg font-bold -mb-8'>Generating Poem...</h4>
                        <Code
                          rtl
                          speed={2}
                          width={"100%"}
                          style={{ maxWidth: 400, marginLeft: 'auto' }}
                          height={250}
                          backgroundColor="#ffffff14"
                          foregroundColor="#ffffff21"
                          gradientRatio={0.8}
                        />
                        <Code
                          rtl
                          speed={1.4}
                          width={"100%"}
                          style={{ maxWidth: 400, marginLeft: 'auto', marginTop: -92 }}
                          height={250}
                          backgroundColor="#ffffff14"
                          foregroundColor="#ffffff21"
                          gradientRatio={0.7}
                        />
                      </>
                  }
                </div>
              </div>
            </div>
          </div>
        </section>
      </InView>
    </div>

  )
}

export default SkillsSection



  // var poemText =
  //   `The Full-Stack Adventure

  //   HTML and CSS,
  //   Are where I start my quest,
  //   I add in JavaScript,
  //   And create what's best.

  //   With SCSS and Angular,
  //   My site becomes a thrill,
  //   React and Blazor,
  //   Are where I get my fill.

  //   .NET API and Azure,
  //   Are where my code takes flight,
  //   And with Figma and Adobe XD,
  //   My design is always right.

  //   GitHub and Postman,
  //   Are where my testing's done,
  //   While npm, Visual Studio,
  //   And VS Code are loads of fun.

  //   Bootstrap and Tailwind CSS,
  //   Are where my site gets styled,
  //   And building this full-stack website,
  //   Has kept me well beguiled.

  //   So come and take an adventure,
  //   Through my website you'll see,
  //   All the skills I have amassed,
  //   To create such mastery.`;


