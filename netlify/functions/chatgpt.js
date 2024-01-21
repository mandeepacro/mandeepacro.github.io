const apiSecretKey = process.env.GATSBYAPP_API_SECRET_KEY;

exports.handler = async function (event, context) {
  console.log(event);
  console.log(context);
  try {
    const { prompt } = event.queryStringParameters;
    console.log("CALLING OPENAI API");
    const DEFAULT_PARAMS = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.5
    };

    // if (!isMock) {
    const result = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiSecretKey}`
      },
      body: JSON.stringify(DEFAULT_PARAMS)
    });
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