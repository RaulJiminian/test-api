import express from "express";
import cors from "cors";
import axios from "axios";
import { Configuration, OpenAIApi } from "openai";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3000, () => {
  console.log("port running!");
});

app.get("/", (req, res) => {
  res.json({ hello: "World" });
});

app.get("/data/:user_input", async (req, res) => {
  const configuration = new Configuration({
    apiKey: "insert api key",
  });

  const openai = new OpenAIApi(configuration);

  const prompt = await openai.createImage({
    //prompt will be the user input
    prompt: req.params.user_input,
    //number of images to generate (max 10):
    n: 1,
    //must be Must be one of 256x256, 512x512, or 1024x1024:
    size: "1024x1024",
  });

  let url = prompt.data.data[0].url;

  // let response = await axios.get(prompt);
  // console.log(response);

  res.json({ url });
});
