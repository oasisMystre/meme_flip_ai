import Openai from "openai";

export default class OpenAi {
  private ai: Openai;

  constructor() {
    this.ai = new Openai({
      apiKey: import.meta.env.VITE_APP_OPENAI_SECRET_KEY,
      dangerouslyAllowBrowser: true,
    });
  }

  recommendCaptions(imageURL: string) {
    const systemPrompt =
      "You are a meme idea generator. You will use the image to generate a meme based on an idea you suggest. Given a image, generate a meme idea for the intended audience. Only use the image for suggestions. Example response: Drake muchin chips % You can't muchin. The reason for the % is to indicate which image has the caption. Just return only the captions, don't add any word apart from captions.";

    return this.ai.chat.completions.create({
      model: "gpt-4-vision-preview",
      max_tokens: 64,
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "funny caption idea for this image?",
            },
            {
              type: "image_url",
              image_url: {
                url: imageURL,
              },
            },
          ],
        },
      ],
    });
  }

  static #instance: OpenAi;

  static get instance() {
    if (!OpenAi.#instance) OpenAi.#instance = new OpenAi();
    return OpenAi.#instance;
  }
}
