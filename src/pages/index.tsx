import { useTelegramWebApp } from "@telegram-web-app/react";
import { useContext, useEffect, useRef, useState } from "react";
import { MdSearch } from "react-icons/md";

import { GetMemeContext } from "../providers/GetMemeProvider";
import MemeList from "../components/MemeList";
import { Meme } from "../lib/api/imgflip/models/Meme.model";
import ImageEditorDialog, {
  ImageEditorDialogElement,
} from "../components/ImageEditorDialog";
import LoadingMeme from "../components/LoadingMeme";
import LoadingMemeError from "../components/LoadingMemeError";

function setupTelegramWebApp(Telegram: ReturnType<typeof useTelegramWebApp>) {
  Telegram.WebApp.MainButton.text = "Add Caption";
  Telegram.WebApp.MainButton.color = "#f59e0b";
}

export default function HomePage() {
  const Telegram = useTelegramWebApp();
  const { memes, loadingState } = useContext(GetMemeContext);

  const imageEditorRef = useRef<ImageEditorDialogElement | null>(null);
  const [selectedMemes, setSelectedMemes] = useState(new Set<Meme["id"]>());

  useEffect(() => {
    setupTelegramWebApp(Telegram);
    Telegram.WebApp.MainButton.onClick = function () {
      imageEditorRef.current?.toggle();
      return Telegram.WebApp.MainButton;
    };
  }, [Telegram]);

  return (
    <>
      <div className="flex-1 flex flex-col space-y-8 p-4">
        <div
          id="search"
          className="flex items-center space-x-2 px-2 bg-stone-800/50 rounded-md  border-1 border-transparent focus-within:ring-3 focus-within:border-green-500 ring-green-300"
        >
          <MdSearch className="text-xl text-stone-400" />
          <input
            className="py-2 bg-transparent hover:outline-none focus:outline-none placeholder-stone-400"
            placeholder="Search meme, gifs, tags"
          />
        </div>
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
      <ImageEditorDialog ref={imageEditorRef} />
    </>
  );
}
