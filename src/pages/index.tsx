import { useContext, useEffect, useState } from "react";

import { GetMemeContext } from "../providers/GetMemeProvider";
import { Meme } from "../lib/api/imgflip/models/Meme.model";

import Search from "../components/Search";
import MemeList from "../components/MemeList";
import LoadingMeme from "../components/LoadingMeme";
import LoadingMemeError from "../components/LoadingMemeError";
import ImageEditorDialog from "../components/ImageEditorDialog";

export default function HomePage() {
  const { memes, loadingState } = useContext(GetMemeContext);

  const [source, setSource] = useState<string[]>();
  const [selectedMemes, setSelectedMemes] = useState(new Set<Meme["id"]>());

  const onSelect = () => {
    setSource(
      Array.from(selectedMemes.values()).map(
        (id) => memes.find((meme) => meme.id === id)!.url
      )
    );
  };

  return (
    <>
      <div className="flex-1 flex flex-col space-y-8 p-4">
        <Search
          onUpload={(source) => {
            setSource(source);
          }}
        />
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
        {selectedMemes.size > 0 && (
          <div className="fixed inset-x-0 bottom-0 flex flex-col">
            <button
              className="bg-primary py-4"
              onClick={onSelect}
            >
              <p className="uppercase">Add Caption</p>
            </button>
          </div>
        )}
      </div>

      <ImageEditorDialog
        source={source as string[]}
        visible={!!source}
        setSource={setSource}
        onClose={() => {
          setSource(undefined);
          setSelectedMemes(new Set());
        }}
      />
    </>
  );
}
