import { useEffect, useState } from "react";
import { MdMoreVert, MdClose, MdPhoto } from "react-icons/md";

import ImageKit from "../lib/imagekit";
import KeyStore from "../lib/keystore";
import EmptyGenerated from "../components/EmptyGenerated";

type UploadResponse = Awaited<ReturnType<ImageKit["uploadImageURL"]>>;

export default function GeneratedPage() {
  const [generated, setGenerated] = useState<UploadResponse[] | null>(null);

  useEffect(() => {
    setGenerated(KeyStore.instance.get<UploadResponse[]>("generated", []));
  }, []);

  useEffect(() => {
    return KeyStore.instance.on("change", () => {
      setGenerated(KeyStore.instance.get<UploadResponse[]>("generated", []));
    });
  }, []);

  return (
    <div className="flex-1 p-8 flex flex-col space-y-8">
      <header className="flex space-x-4">
        <button onClick={() => history.back()}>
          <MdClose className="text-xl text-white" />
        </button>
        <h1 className=
        "font-extrabold text-2xl">Generated Memes</h1>
      </header>
      <div className="flex-1 grid grid-cols-1 gap-y-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {generated ? (
          generated.length > 0 ? (
            generated.map((generated, index) => (
              <div
                key={index}
                className="relative"
              >
                <img
                  src={generated.url}
                  width={generated.width}
                  height={generated.height}
                  className="w-full h-xs rounded-md"
                />
                <button className="absolute top-2 right-2 bg-stone-800/50 p-2 rounded-md">
                  <MdMoreVert />
                </button>
              </div>
            ))
          ) : (
            <EmptyGenerated />
          )
        ) : (
          <div className="w-8 h-8 border-3  border-amber-500 border-t-transparent rounded-full" />
        )}
      </div>
    </div>
  );
}
