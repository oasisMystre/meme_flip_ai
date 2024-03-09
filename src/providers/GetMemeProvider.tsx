import { createContext, useEffect, useState } from "react";

import { LoadingState } from "../types";
import { Meme } from "../lib/api/imgflip/models/Meme.model";
import { Api } from "../lib";

export const GetMemeContext = createContext({
  memes: [] as Meme[],
  loadingState: "idle" as LoadingState,
});

export default function ({ children }: React.PropsWithChildren) {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [loadingState, setLoadingState] = useState<LoadingState>("idle");

  useEffect(() => {
    Api.instance.imgFlip
      .getMemes()
      .then(
        ({
          data: {
            data: { memes },
          },
        }) => {
          setMemes(memes);
          setLoadingState("success");
        }
      )
      .catch((error) => {
        setLoadingState("failed");
        throw error;
      });
  }, []);

  return (
    <GetMemeContext.Provider value={{ memes, loadingState }}>
      {children}
    </GetMemeContext.Provider>
  );
}
