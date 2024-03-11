import { useRef } from "react";
import { MdEmojiEmotions, MdPhoto, MdSearch } from "react-icons/md";
import { Link } from "react-router-dom";

type SearchProps = {
  onUpload: (source: string[]) => void;
};

export default function Search({ onUpload }: SearchProps) {
  const fileRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="flex items-center space-x-2">
      <div
        id="search"
        className="flex-1 flex items-center space-x-2 px-2 bg-stone-800/50 rounded-md  border-1 border-transparent focus-within:ring-3 focus-within:border-amber-500 ring-amber-300"
      >
        <MdSearch className="text-xl text-stone-400" />
        <input
          className="lt-md:w-28 py-2 bg-transparent hover:outline-none focus:outline-none placeholder-stone-400 truncate"
          placeholder="Search meme, gifs, tags"
        />
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        hidden
        multiple
        onChange={(event) => {
          const files = event.target.files;
          if (files) onUpload(Array.from(files).map(URL.createObjectURL));
        }}
      />
      <div className="flex space-x-4 items-center">
        <Link
          to="/generated"
          className="flex space-x-2 items-center bg-white text-purple-500 p-2 rounded-md"
        >
          <MdEmojiEmotions className="text-xl" />
          <span>Memes</span>
        </Link>
        <button
          className="flex space-x-2 items-center bg-primary text-white p-2 rounded-md"
          onClick={() => fileRef.current?.click()}
        >
          <MdPhoto className="text-xl" />
          <span>Upload</span>
        </button>
      </div>
    </div>
  );
}
