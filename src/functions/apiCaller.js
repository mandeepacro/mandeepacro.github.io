const apiSecretKey = process.env.GATSBYAPP_API_SECRET_KEY;

export async function createSkillsPoem(skillsList, isMock = true) {
    prompt = `Generate a sweet, simple and fun poem of developing a fullstack website using my skills. Here are the list of skills to use - ${skillsList.map(obj => obj.name).join(", ")}. Note: Generate a intersesting title for the poem as the first line and then start with the poem body, Use exact words as provided in the skills to use list.`;

    console.log("CALLING OPENAI API");
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
      console.log("API RESPONSE: ", output);
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
