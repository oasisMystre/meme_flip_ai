import { AxiosInstance } from "axios";

import { GetMemeResponse } from "./models/Meme.model";

export class ApiImpl {
  constructor(protected readonly axios: AxiosInstance) {}
}
export default class ImgFlip extends ApiImpl {
  getMemes() {
    return this.axios.get<GetMemeResponse>("get_memes");
  }
}
