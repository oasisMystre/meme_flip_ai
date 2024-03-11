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
    return this.ai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "What's meme caption is do you recommend for this image?",
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
