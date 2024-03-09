import { useRef } from "react";
import { MdPhoto, MdSearch } from "react-icons/md";

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
          className="py-2 bg-transparent hover:outline-none focus:outline-none placeholder-stone-400"
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
      <button
        className="flex space-x-2 items-center bg-amber-500 text-white px-4 py-2 rounded-md"
        onClick={() => fileRef.current?.click()}
      >
        <MdPhoto className="text-xl" />
        <span>Upload</span>
      </button>
    </div>
  );
}
