import { forwardRef, useState } from "react";
import { createPortal } from "react-dom";
import { PiSparkleFill, PiMagicWandFill } from "react-icons/pi";
import { IoText } from "react-icons/io5";

import useImage from "use-image";
import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { Layer, Image, Stage } from "react-konva";

import Text from "./konva/Text";
import TextEditDialog from "./TextEditDialog";

import siri from "../assets/siri.gif";
import { convertRemToPixels } from "../lib/utils";
import OpenAi from "../lib/openai";
import { toast } from "react-toastify";
import ImageKit from "../lib/imagekit";

type ImageEditorProps = {
  src: string;
  generating: boolean;
};

export default forwardRef<Konva.Stage, ImageEditorProps>(function ImageEditor(
  { src },
  ref
) {
  const [image] = useImage(src, "anonymous");

  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestions, setSuggestions] = useState<string[][] | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [currentText, setCurrentText] = useState<Konva.Text>();
  const [textEditDialogStyle, setTextEditDialogStyle] =
    useState<React.CSSProperties>();
  const [texts, setTexts] = useState<
    Omit<React.ComponentProps<typeof Text>, "hideDecorator">[]
  >([]);

  const onTextEdit = (event: KonvaEventObject<Event>) => {
    setIsOpen(true);

    const position = event.currentTarget.getPosition();

    const top = position.y + 32 + "px";
    const left = position.x - 32 + "px";

    setCurrentText(event.target as unknown as Konva.Text);
    setTextEditDialogStyle({
      top,
      left,
    });
  };

  const removeText = function (text: any) {
    setTexts(texts.filter((value) => value !== text));
  };

  return (
    <>
      <div>
        <div className="w-full md:max-w-[22rem] relative h-[22rem] self-center">
          {isOpen && (
            <TextEditDialog
              currentText={currentText}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              style={textEditDialogStyle}
            />
          )}

          <Stage
            ref={ref}
            width={convertRemToPixels(19.5)}
            height={convertRemToPixels(20)}
          >
            <Layer>
              <Image
                image={image}
                width={360}
                height={360}
              />
              {texts.map((text, index) => (
                <Text
                  key={index}
                  {...text}
                  draggable
                  fontSize={28}
                  fill="black"
                  shadowColor="white"
                  shadowBlur={4}
                  stroke="white"
                  strokeWidth={1}
                  fontStyle="bold"
                  onDragMove={(event) => {
                    setTextEditDialogStyle({
                      left: event.target.x(),
                      top: event.target.y(),
                    });
                  }}
                  onTap={onTextEdit}
                  onClick={onTextEdit}
                  onDblClick={() => removeText(text)}
                  onDblTap={() => removeText(text)}
                />
              ))}
            </Layer>
          </Stage>
          <div className="absolute inset-x-0 bottom-8 flex space-x-2 items-center bg-black/20 p-2">
            <button
              className="p-2 bg-black/80 rounded-md"
              onClick={async () => {
                setIsGenerating(true);
                let imageURL = src;

                if (imageURL.startsWith("blob")) {
                  const response = await ImageKit.instance.uploadImageURL(src, {
                    folder: "ai",
                    fileName: "ai_input_image.png",
                  });

                  imageURL = response.url;
                }

                OpenAi.instance
                  .recommendCaptions(imageURL)
                  .then((response) =>
                    setSuggestions(
                      response.choices
                        .map((choice) => {
                          const text = choice.message.content;
                          if (text)
                            return text
                              .split("%")
                              .filter((value) => value.trim().length > 0);
                          return null;
                        })
                        .filter((message) => message != null) as string[][]
                    )
                  )
                  .catch((error) => toast.error(error.message))
                  .finally(() => setIsGenerating(false));
              }}
            >
              <PiSparkleFill className="text-xl text-cyan-500" />
            </button>
            <button
              className="p-2 bg-black/80 rounded-md"
              onClick={() => {
                setTexts((texts) => {
                  const text = {
                    text: "Tap to Edit",
                  };

                  return [text, ...texts];
                });
              }}
            >
              <IoText className="text-xl" />
            </button>
          </div>
        </div>
        {suggestions && (
          <div className="flex flex-col space-y-4">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                className="flex space-x-2 items-center bg-stone-900 px-4 py-3 rounded-md font-lato"
                onClick={() => {
                  setTexts((texts) => {
                    for (const text of suggestion)
                      texts.push({
                        text,
                      });

                    return [...texts];
                  });
                }}
              >
                <PiMagicWandFill className="text-xl text-violet-500" />
                <p>{suggestion.join(" ")}</p>
              </button>
            ))}
          </div>
        )}
      </div>
      {isGenerating &&
        createPortal(
          <div className="fixed inset-0 bg-black/50 flex flex-col items-center justify-center">
            <img
              src={siri}
              className="w-24 h-24"
            />
          </div>,
          document.body
        )}
    </>
  );
});
