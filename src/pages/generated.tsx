import clsx from "clsx";
import { useTelegramWebApp } from "@telegram-web-app/react";

import { Menu } from "@headlessui/react";
import { useEffect, useState } from "react";
import { MdMoreVert, MdClose } from "react-icons/md";

import copy from "copy-to-clipboard";

import ImageKit from "../lib/imagekit";
import KeyStore from "../lib/keystore";
import EmptyGenerated from "../components/EmptyGenerated";
import { toast } from "react-toastify";

type UploadResponse = Awaited<ReturnType<ImageKit["uploadImageURL"]>>;

export default function GeneratedPage() {
  const Telegram = useTelegramWebApp();
  const [generated, setGenerated] = useState<UploadResponse[] | null>(null);

  useEffect(() => {
    setGenerated(KeyStore.instance.get<UploadResponse[]>("generated", []));
  }, []);

  useEffect(() => {
    if (!Telegram.WebApp.BackButton.isVisible)
      Telegram.WebApp.BackButton.show();
    return KeyStore.instance.on("change", () => {
      setGenerated(KeyStore.instance.get<UploadResponse[]>("generated", []));
    });
  }, []);

  return (
    <div className="flex-1 p-8 flex flex-col space-y-8">
      <header className="fle space-x-4 hidden">
        <button onClick={() => history.back()}>
          <MdClose className="text-xl text-white" />
        </button>
        <h1 className="font-extrabold text-2xl">Generated Memes</h1>
      </header>
      <div
        className={clsx(
          "flex-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
          [
            !generated || generated?.length === 0
              ? "flex flex-col items-center justify-center"
              : "grid grid-cols-2",
          ]
        )}
      >
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
                  className="w-full h-48 md:h-xs rounded-md"
                />
                <Menu>
                  <Menu.Button className="absolute top-2 right-2 !bg-stone-950/50 p-2 rounded-md">
                    <MdMoreVert />
                  </Menu.Button>
                  <Menu.Items className="w-32 h-32 absolute right-2 top-11 flex flex-col bg-stone-950 text-white rounded-md divide-y divide-stone-800">
                    <Menu.Item>
                      <a
                        href={generated.url}
                        download
                        className="px-4 py-2 flex items-center justify-center"
                      >
                        Download
                      </a>
                    </Menu.Item>
                    <Menu.Item>
                      <button
                        className="px-4 py-2"
                        onClick={() => {
                          copy(generated.url, {
                            debug: true,
                            onCopy() {
                              toast.success("Preview url copied to clipboard!");
                            },
                          });
                        }}
                      >
                        Copy Link
                      </button>
                    </Menu.Item>
                    <Menu.Item>
                      <button
                        className="px-4 py-2"
                        onClick={async () => {
                          await navigator.share({
                            url: generated.url,
                            text: "Check ou MemeAI to generate your custom meme.",
                          });
                        }}
                      >
                        Share
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
    </div>
  );
}
