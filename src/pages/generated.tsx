import clsx from "clsx";
import { BackButton } from "@vkruglikov/react-telegram-web-app";

import { Menu } from "@headlessui/react";
import { useEffect, useState } from "react";
import {
  MdMoreVert,
  MdDelete,
  MdDownload,
  MdCopyAll,
  MdShare,
} from "react-icons/md";
import { toast } from "react-toastify";

import copy from "copy-to-clipboard";

import ImageKit from "../lib/imagekit";
import KeyStore from "../lib/keystore";
import EmptyGenerated from "../components/EmptyGenerated";

type UploadResponse = Awaited<ReturnType<ImageKit["uploadImageURL"]>>;

export default function GeneratedPage() {
  const [showBack, setShowBack] = useState(false);
  const [generated, setGenerated] = useState<UploadResponse[] | null>(null);

  useEffect(() => {
    setGenerated(KeyStore.instance.get<UploadResponse[]>("generated", []));
  }, []);

  useEffect(() => {
    setShowBack(true);
    return KeyStore.instance.on("change", () => {
      setGenerated(KeyStore.instance.get<UploadResponse[]>("generated", []));
    });
  }, []);

  const deleteGenerated = (value: UploadResponse) => {
    const filtered = generated!.filter((generated) => generated !== value);
    setGenerated(filtered);
    KeyStore.instance.set("generated", filtered);

    toast("Meme deleted succesfully.");
  };

  return (
    <div className="flex-1 p-8 flex flex-col space-y-8">
      <div
        className={clsx(
          "flex-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
          [
            !generated || generated?.length === 0
              ? "flex flex-col items-center justify-center"
              : "grid grid-cols-2 md:grid-cols-4 lg:md-cols-5 xl:md-cols-6",
          ]
        )}
      >
        {generated ? (
          generated.length > 0 ? (
            generated.map((generated, index) => (
              <div
                key={index}
                className="relative h-48"
              >
                <img
                  src={generated.url}
                  width={generated.width}
                  height={generated.height}
                  className="w-full h-full md:h-xs rounded-md"
                />
                <Menu>
                  <Menu.Button className="absolute top-2 right-2 !bg-stone-950/50 p-2 rounded-md">
                    <MdMoreVert />
                  </Menu.Button>
                  <Menu.Items className="w-32 absolute right-2 top-11 flex flex-col bg-stone-950 text-white rounded-md divide-y divide-stone-800">
                    <Menu.Item>
                      <button
                        className="flex items-center space-x-2 p-2"
                        onClick={async () => {
                          const blob = await fetch(generated.url).then((r) =>
                            r.blob()
                          );
                          const file = new File([blob], "Customize_Meme.png", {
                            type: "image/png",
                          });

                          await navigator.share({
                            files: [file],
                          });
                        }}
                      >
                        <MdShare />
                        <span>Share</span>
                      </button>
                    </Menu.Item>
                    <Menu.Item>
                      <button
                        className="flex items-center space-x-2 p-2"
                        onClick={() => deleteGenerated(generated)}
                      >
                        <MdDelete />
                        <span>Delete</span>
                      </button>
                    </Menu.Item>

                    <Menu.Item>
                      <a
                        href={generated.url}
                        download={generated.name}
                        className="flex items-center space-x-2 p-2"
                      >
                        <MdDownload className="text-lg" />
                        <span>Download</span>
                      </a>
                    </Menu.Item>
                    <Menu.Item>
                      <button
                        className="flex items-center space-x-2 p-2"
                        onClick={() => {
                          copy(generated.url, {
                            debug: true,
                            onCopy() {
                              toast.success("Preview url copied to clipboard!");
                            },
                          });
                        }}
                      >
                        <MdCopyAll className="text-xl" />
                        <span>Copy Link</span>
                      </button>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              </div>
            ))
          ) : (
            <EmptyGenerated />
          )
        ) : (
          <div className="w-8 h-8 border-3  border-purple-500 border-t-transparent rounded-full" />
        )}
      </div>
      {showBack && <BackButton onClick={() => window.history.back()} />}
    </div>
  );
}
