import { useTelegramWebApp } from "@telegram-web-app/react";
import { useContext, useEffect, useRef, useState } from "react";
import { MdSearch } from "react-icons/md";

import { GetMemeContext } from "../providers/GetMemeProvider";
import MemeList from "../components/MemeList";
import { Meme } from "../lib/api/imgflip/models/Meme.model";
import ImageEditorDialog, {
  ImageEditorDialogElement,
} from "../components/ImageEditorDialog";

function setupTelegramWebApp(Telegram: ReturnType<typeof useTelegramWebApp>) {
  Telegram.WebApp.MainButton.text = "Add Caption";
  Telegram.WebApp.MainButton.color = "#f59e0b";
}

export default function HomePage() {
  const Telegram = useTelegramWebApp();
  const { memes } = useContext(GetMemeContext);

  const imageEditorRef = useRef<ImageEditorDialogElement | null>(null);
  const [selectedMemes, setSelectedMemes] = useState(new Set<Meme["id"]>());

  useEffect(() => setupTelegramWebApp(Telegram), [Telegram]);

  return (
    <>
      <div className="flex flex-col space-y-8 p-4">
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
      </div>
      <button className="bg-green-500 px-8 py-2" onClick={() => imageEditorRef.current?.toggle()}>Show Dialoh</button>
      <ImageEditorDialog ref={imageEditorRef} />
    </>
  );
}
