import clsx from "clsx";
import Konva from "konva";

import { useEffect, useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import { toast } from "react-toastify";

import Dialog from "./Dialog";
import ImageEditor from "./ImageEditor";
import ImageKit from "../lib/imagekit";
import KeyStore from "../lib/keystore";

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
  const imageEditorRef = useRef<Konva.Stage | null>(null);

  const [loading, setLoading] = useState(false);

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
                  key={index}
                  className={clsx(
                    "relative w-16 h-16 rounded-md flex justify-center items-center",
                    { "border-3 border-primary": selected }
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
            <div
              key={activeImage}
              className="flex-1 flex flex-col space-y-8"
            >
              <ImageEditor
                ref={imageEditorRef}
                src={activeImage}
                generating={loading}
              />
              <button
                className="md:self-center flex items-center justify-center  md:w-xs bg-primary py-2 rounded-md hover:bg-amber-500/80 active:bg-amber-600"
                onClick={async () => {
                  try {
                    setLoading(true);
                    const url = Object.create(imageEditorRef.current!)
                      .clone()
                      .toDataURL();
                    const response = await ImageKit.instance.uploadImageURL(
                      url,
                      {}
                    );
                    toast.success("Meme generated successful.");
                    const value = KeyStore.instance.get<
                      Awaited<ReturnType<ImageKit["uploadImageURL"]>>[]
                    >("generated", []);
                    value!.push(response);
                    KeyStore.instance.set("generated", value as object);
                  } catch (e) {
                    toast.error("An unexpected error! Try generating again!");
                    throw e;
                  } finally {
                    setLoading(false);
                  }
                }}
              >
                {loading ? (
                  <div className="w-6 h-6 border-3 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span>Generate Meme</span>
                )}
              </button>
            </div>
          )}
        </div>
      </Dialog>
    )
  );
}
