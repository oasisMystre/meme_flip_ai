import { forwardRef, useState } from "react";
import { PiSparkleFill } from "react-icons/pi";
import { IoText } from "react-icons/io5";

import useImage from "use-image";
import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { Layer, Image, Stage } from "react-konva";

import Text from "./konva/Text";
import TextEditDialog from "./TextEditDialog";

import { convertRemToPixels } from "../lib/utils";


type ImageEditorProps = {
  src: string;
  generating: boolean;
};

export default forwardRef<Konva.Stage, ImageEditorProps>(function ImageEditor(
  { src },
  ref
) {
  const [image] = useImage(src, "anonymous");

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

  return (
    <>
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
});
