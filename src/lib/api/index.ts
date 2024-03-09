import axios, { AxiosInstance } from "axios";
import ImgFlip from "./imgflip";



export default class Api {
  private readonly axios: AxiosInstance;
  readonly imgFlip: ImgFlip;

  constructor() {
    this.axios = axios.create({
      baseURL: "https://api.imgflip.com",
    });

    this.imgFlip = new ImgFlip(this.axios);
  }

  static #instance: Api;

  static get instance() {
    if (!Api.#instance) Api.#instance = new Api();

    return Api.#instance;
  }
}
