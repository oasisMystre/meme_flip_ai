import { useTelegramWebApp } from "@telegram-web-app/react";
import { useContext, useEffect, useState } from "react";

import { GetMemeContext } from "../providers/GetMemeProvider";
import { Meme } from "../lib/api/imgflip/models/Meme.model";

import Search from "../components/Search";
import MemeList from "../components/MemeList";
import LoadingMeme from "../components/LoadingMeme";
import LoadingMemeError from "../components/LoadingMemeError";
import ImageEditorDialog from "../components/ImageEditorDialog";

function setupTelegramWebApp(Telegram: ReturnType<typeof useTelegramWebApp>) {
  Telegram.WebApp.MainButton.text = "Add Caption";
  Telegram.WebApp.MainButton.color = "#f59e0b";
}

export default function HomePage() {
  const Telegram = useTelegramWebApp();
  const { memes, loadingState } = useContext(GetMemeContext);

  const [source, setSource] = useState<string[]>();
  const [selectedMemes, setSelectedMemes] = useState(new Set<Meme["id"]>());

  useEffect(() => {
    setupTelegramWebApp(Telegram);
    Telegram.WebApp.MainButton.onClick(function () {
      setSource(
        Array.from(selectedMemes.values()).map(
          (id) => memes.find((meme) => meme.id === id)!.url
        )
      );
    });
  }, [Telegram]);

  return (
    <>
      <div className="flex-1 flex flex-col space-y-8 p-4">
        <Search onUpload={setSource} />
        <div className="flex-1 flex flex-col">
          {loadingState === "success" ? (
            <MemeList
              memes={memes}
              selectedMemes={selectedMemes}
              onSelect={(meme) => {
                const exists = selectedMemes.has(meme.id);

                setSelectedMemes((selectedMemes) => {
                  if (exists) selectedMemes.delete(meme.id);
                  else selectedMemes.add(meme.id);
                  if (selectedMemes.size > 0) Telegram.WebApp.MainButton.show();
                  else Telegram.WebApp.MainButton.hide();
                  return new Set(selectedMemes);
                });
              }}
            />
          ) : loadingState === "failed" ? (
            <LoadingMemeError />
          ) : (
            <LoadingMeme />
          )}
        </div>
      </div>

      <ImageEditorDialog
        source={source as string[]}
        visible={!!source}
        setSource={setSource}
        onClose={() => setSource(undefined)}
      />
    </>
  );
}
