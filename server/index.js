const express = require("express");
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require("openai");

const PORT = process.env.PORT || 3001;

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const client = new OpenAIApi(configuration);


const app = express();
app.use(bodyParser.json());

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.post('/generate', async(req, res) => {
  try {
    // Get the prompt text from the request body
    const prompt = req.body.prompt;

    // Generate text using the OpenAI API
    const response = await client.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
    });

    // Send the generated text as the response
    res.send(response.data.choices[0].text);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error generating text');
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
