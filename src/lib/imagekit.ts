import axios from "axios";
import Kit from "imagekit-javascript";

type AuthParams = {
  token: string;
  expire: number;
  signature: string;
};

export default class ImageKit {
  client: Kit;

  constructor() {
    this.client = new Kit({
      publicKey: import.meta.env.VITE_APP_IMAGE_KIT_PUBLIC_KEY,
      urlEndpoint: "https://ik.imagekit.io/orgk45qhh",
    });
  }

  getAuthorizationParams() {
    return axios.get<AuthParams>("https://memeai.onrender.com/imagekit/auth");
  }

  async uploadImageURL(url: string) {
    const { data: authParams } = await this.getAuthorizationParams();
    const blob = await (await fetch(url)).blob();

    return this.client.upload({
      file: blob,
      ...authParams,
      folder: "meme_ai",
      fileName: "meme_ai_generated.png",
    });
  }

  static #instance: ImageKit;

  static get instance() {
    if (!ImageKit.#instance) ImageKit.#instance = new ImageKit();

    return ImageKit.#instance;
  }
}
