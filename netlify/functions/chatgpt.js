const apiSecretKey = process.env.GATSBYAPP_API_SECRET_KEY;
const isMock = process.env.GATSBYAPP_ISMOCK;

exports.handler = async function (event, context) {
  console.log(event);
  console.log(context);
  const mockValue = isMock === "true";
  console.log("is mock", isMock, typeof(isMock));
 console.log("is mockValue", mockValue, typeof(mockValue));
    const { prompt } = event.queryStringParameters;

    if(!mockValue){
      try {
      console.log("CALLING OPENAI API");
      const DEFAULT_PARAMS = {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.5
      };
  
      const result = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiSecretKey}`
        },
        body: JSON.stringify(DEFAULT_PARAMS)
      });
      console.log("result.body", result.body);
      const parsedData = await parseStream(result.body);
      console.log("API RESPONSE: ",JSON.stringify(parsedData));
      
      return {
        statusCode: 200,
        body: JSON.stringify(parsedData),
      };
    }
  catch (err) {
    console.log("API RESPONSE: ",err);
    return {
      statusCode: 404,
      body: err.toString()
    };
    
  }
}
  else{
    console.log("CALLING MOCK API");
    const mockResponse = "{\n  \"id\": \"chatcmpl-8leknXXcP8YfTVLzDsu8accYckoES\",\n  \"object\": \"chat.completion\",\n  \"created\": 1706368765,\n  \"model\": \"gpt-3.5-turbo-0613\",\n  \"choices\": [\n    {\n      \"index\": 0,\n      \"message\": {\n        \"role\": \"assistant\",\n        \"content\": \"The Symphony of Code\\n\\nIn a realm of pixels, where dreams come alive,\\nI embarked on a journey, ready to strive.\\nWith HTML and CSS, I laid the foundation,\\nCrafting a canvas, a digital creation.\\n\\nJavaScript, my partner, brought life to the screen,\\nInteractivity and magic, like never seen.\\nSCSS added style, with elegance and grace,\\nA touch of beauty, to every single space.\\n\\nAngular and React, the dynamic duet,\\nThey danced together, a perfect internet.\\nBlazor joined the melody, with C# in its heart,\\nCreating a symphony, a work of digital art.\\n\\n.NET API, the conductor in the fray,\\nConnecting the dots, in a seamless display.\\nAzure, the cloud, where dreams took flight,\\nHosting my creation, in the vastness of the night.\\n\\nGSAP and ScrollMagic, the choreographers of motion,\\nAnimating my website, with a magical potion.\\nFigma and Adobe XD, the designers in my hand,\\nCreating visuals, that made users understand.\\n\\nGitHub and Postman, the collaborators in sync,\\nVersion control and testing, they helped me think.\\nnpm, the package manager, a treasure trove,\\nProviding tools and libraries, for me to improve.\\n\\nVisual Studio and VS Code, my trusty companions,\\nEditing and debugging, they never abandoned.\\nBootstrap and Tailwind CSS, the frameworks of choice,\\nBuilding responsive layouts, with a confident voice.\\n\\nAnd so, my fullstack website came to life,\\nA symphony of code, free from any strife.\\nWith skills as my instruments, I created a masterpiece,\\nA digital creation, that will never cease.\\n\\nSo let us celebrate, this ode to my skills,\\nFor they have brought me joy, and many thrills.\\nIn the realm of coding, I found my true bliss,\\nCreating websites, with a sweet, simple twist.\"\n      },\n      \"logprobs\": null,\n      \"finish_reason\": \"stop\"\n    }\n  ],\n  \"usage\": {\n    \"prompt_tokens\": 124,\n    \"completion_tokens\": 375,\n    \"total_tokens\": 499\n  },\n  \"system_fingerprint\": null\n}\n";
    
      return {
        statusCode: 200,
        body: JSON.stringify(mockResponse)
      };
  }
};

async function parseStream(stream) {
  const reader = stream.getReader();
  let result = '';

  async function processText({ done, value }) {
    if (done) {
      return result;
    }

    result += String.fromCharCode(...value);

    return reader.read().then(processText);
  }

  return reader.read().then(processText);
}