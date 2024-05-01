import React, { useEffect } from 'react';
import Layout from '../components/common/layout';
import HeaderSection from '../components/headerSection';
import ProjectsSection from '../components/projectsSection';
import SkillsSection from '../components/skillsSection';
import TestimonialSection from '../components/testimonialSection';
import AboutSection from '../components/aboutSection';
import { scroller } from 'react-scroll'
import Favicon from "../images/favicon.svg";
import { graphql, useStaticQuery } from "gatsby"

const navMenuDesktopWidth = 1280;

// Step 2: Define your component
const IndexPage = () => {



  useEffect(() => {

    //if(typeof localStorage !== 'undefined'){
    const scrollEasingFunction = "easeInOutCubic";
    const scrollDuration = 750;
    let sectionId = localStorage.getItem("mPortfolio_HomePageSectionId");
    let offset = parseInt(localStorage.getItem("mPortfolio_HomePageSectionOffset"));
    //}

    if (sectionId) {
      let scrollOptions = {
        duration: scrollDuration,
        smooth: scrollEasingFunction,
        //spyThrottle: 500, // Throttle scroll spy events (milliseconds)
        offset: window.innerWidth < navMenuDesktopWidth ? offset - 20 : offset, // Offset for scroll position (pixels)
        //hashSpy: true, // Scroll to element with matching hash in URL,
      };
      
      console.log("scroll to section - ", sectionId, scrollOptions)
      scroller.scrollTo(sectionId, scrollOptions);
      localStorage.removeItem("mPortfolio_HomePageSectionId");
      localStorage.removeItem("mPortfolio_HomePageSectionOffset");
    };

  }, []);

  return (
    <main id='mainWrapper'>
      <Layout>
        <HeaderSection />
        <ProjectsSection />
        <SkillsSection />
        {/* <TestimonialSection /> */}
        <AboutSection />
      </Layout>
    </main>
  )
}

export const Head = () => {
  const data = useStaticQuery(graphql`
  query {
    file(relativePath: { eq: "socialmedia_thumb.png" }) {
      publicURL
    }
  }
`)
const imageUrl = data.file.publicURL;

return (
<>
<html lang="en" />
<title>Mandeep Baghel - Full Stack Developer & Designer</title>
<link rel="icon" type="image/x-icon" href={Favicon} />
<meta name="description" content="Explore Mandeep Baghel's portfolio showcasing visually stunning and highly performant web experiences. Specializing in HTML, CSS, JavaScript, React, and more. Connect with Mandeep today!" />
<meta name="keywords" content="Mandeep Baghel, Full Stack Developer, Designer, Web Development, HTML, CSS, JavaScript, React, Portfolio" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link rel="canonical" href="https://www.mandeepbaghel.in" />
{/* Open Graph Tags (for better social media sharing) */}
<meta property="og:title" content="Mandeep Baghel - Full Stack Developer & Designer" />
<meta property="og:description" content="Explore Mandeep Baghel's portfolio showcasing visually stunning and highly performant web experiences. Specializing in HTML, CSS, JavaScript, React, and more. Connect with Mandeep today!" />
<meta property="og:url" content="https://www.mandeepbaghel.in" />
<meta property="og:image" content={imageUrl} />
<meta property="og:type" content="website"></meta>
{/* Twitter Card Tags (for better Twitter sharing)*/}
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Mandeep Baghel - Full Stack Developer & Designer" />
<meta name="twitter:description" content="Explore Mandeep Baghel's portfolio showcasing visually stunning and highly performant web experiences. Specializing in HTML, CSS, JavaScript, React, and more. Connect with Mandeep today!" />
<meta name="twitter:image" content={imageUrl} />
</>)
}

export default IndexPage