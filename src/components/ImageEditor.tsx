import { useRef, useState } from "react";
import { PiSparkleFill } from "react-icons/pi";
import { IoText } from "react-icons/io5";

import useImage from "use-image";
import { Layer, Image, Stage } from "react-konva";

import Text from "./konva/Text";
import TextEditDialog from "./TextEditDialog";

import { convertRemToPixels } from "../lib/utils";
import Konva from "konva";

type ImageEditorProps = {
  src: string;
};

export default function ImageEditor({ src }: ImageEditorProps) {
  const stageNodeRef = useRef<Konva.Stage | null>(null);

  const [image] = useImage(src);

  const [isOpen, setIsOpen] = useState(false);
  const [currentText, setCurrentText] = useState<Konva.Text>();
  const [textEditDialogStyle, setTextEditDialogStyle] =
    useState<React.CSSProperties>();
  const [texts, setTexts] = useState<React.ComponentProps<typeof Text>[]>([]);

  return (
    <>
      <div className="w-full max-w-[22rem] relative h-[22rem]">
        {isOpen && (
          <TextEditDialog
          currentText={currentText}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            style={textEditDialogStyle}
          />
        )}

        <Stage
          ref={stageNodeRef}
          width={convertRemToPixels(22)}
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
                onClick={(event) => {
                  event.evt.preventDefault();
                  setIsOpen(true);

                  const position = event.currentTarget.getPosition();

                  const top = position.y + 32 + "px";
                  const left = position.x - 32 + "px";

                  setCurrentText(event.target as unknown as Konva.Text);
                  setTextEditDialogStyle({
                    top,
                    left,
                  });
                }}
              />
            ))}
          </Layer>
        </Stage>
        <div className="absolute inset-x-0 bottom-8 flex space-x-2 items-center bg-black/20 p-2">
          <button className="p-2 bg-black/80 rounded-md">
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
    </>
  );
}
