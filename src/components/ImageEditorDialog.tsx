import clsx from "clsx";

import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";

import Dialog from "./Dialog";
import ImageEditor from "./ImageEditor";

export type ImageEditorDialogElement = {
  toggle: (state?: boolean) => void;
};

type ImageEditorDialogProps = {
  source: string[];
  setSource: React.Dispatch<React.SetStateAction<string[] | undefined>>;
  visible: boolean;
  onClose: () => void;
};

export default function ImageEditorDialog({
  source,
  visible,
  setSource,
  onClose,
}: ImageEditorDialogProps) {
  const [activeImage, setActiveImage] = useState<string>();
  useEffect(() => setActiveImage(source?.[0]), [source]);
  return (
    source && (
      <Dialog
        visible={visible}
        setVisible={onClose}
      >
        <header>
          <button onClick={onClose}>
            <MdClose className="text-xl" />
          </button>
        </header>
        <div className="flex-1 flex space-x-2 overflow-y-scroll">
          <div className="flex flex-col space-y-4 w-16">
            {source.map((image, index) => {
              const selected = image === activeImage;

              return (
                <div
                  className={clsx(
                    "relative w-full h-12 rounded-md flex justify-center items-center",
                    { "border-3 border-amber-300": selected }
                  )}
                  onClick={() => setActiveImage(image)}
                >
                  <img
                    className="w-full h-full object-cover rounded"
                    key={index}
                    src={image}
                  />
                  {source.length > 1 && (
                    <button
                      className="absolute top-0.5 right-0.5 w-4 h-4 bg-red-500 rounded-full"
                      onClick={() => {
                        setSource((source) => {
                          source = source!.filter((value) => value !== image);
                          setActiveImage(source![0]);
                          return source;
                        });
                      }}
                    >
                      <MdClose />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
          {activeImage && (
            <div className="flex-1 flex flex-col space-y-8">
              <ImageEditor src={activeImage} />
              <div>
                <div className="bg-stone-800/70 px-2 rounded">
                  <input
                    className="bg-transparent py-2"
                    placeholder="Enter Text"
                  />
                </div>
              </div>
              <button className="bg-amber-500 py-2 rounded-md hover:bg-amber-500/80 active:bg-amber-600">
                Generate Meme
              </button>
            </div>
          )}
        </div>
      </Dialog>
    )
  );
}
