export type Meme = {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
  box_count: number;
};

export type GetMemeResponse = {
  success: boolean;
  data: {
    memes: Meme[];
  };
};
