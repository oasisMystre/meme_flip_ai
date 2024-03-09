import { MdCheckCircle } from "react-icons/md";

import { Meme } from "../lib/api/imgflip/models/Meme.model";

type MemeListProps = {
  memes: Meme[];
  selectedMemes: Set<Meme["id"]>;
  onSelect: (meme: Meme) => void;
};

export default function MemeList({
  memes,
  selectedMemes,
  onSelect,
}: MemeListProps) {
  return (
    <div className="grid grid-cols-3 gap-4 overflow-y-scroll">
      {memes.map((meme) => {
        const selected = selectedMemes.has(meme.id);
        console.log(selected)

        return (
          <div
            key={meme.id}
            className="relative max-w-36 min-h-40 max-h-40 bg-stone-800/50 rounded-md dark:bg-stone-900 overflow-hidden"
            onClick={() => onSelect(meme)}
          >
            <img
              className="w-full h-full object-cover"
              src={meme.url}
              width={meme.width}
              height={meme.height}
            />
            {selected && (
              <div className="bg-white rounded-full absolute top-2 right-2 ">
                <MdCheckCircle className="text-2xl text-amber-500" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
