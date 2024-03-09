import { PiSparkleFill } from "react-icons/pi";
import { IoText } from "react-icons/io5";

import useImage from "use-image";
import { Layer, Image, Stage, Text } from "react-konva";

import { convertRemToPixels } from "../lib/utils";

type ImageEditorProps = {
  src: string;
};

export default function ImageEditor({ src }: ImageEditorProps) {
  const [image] = useImage(src);

  return (
    <div className="w-full relative h-xs">
      <Stage
        width={convertRemToPixels(22)}
        height={convertRemToPixels(20)}
      >
        <Layer>
          <Image
            image={image}
            width={window.innerWidth}
            height={window.innerWidth}
          />
          <Text
            text="How far nha?"
            fontStyle="bold"
            fill="white"
            fontSize={56}
            onTransform={() => {}}
            onDblClick={() => {}}
            onDblTap={() => {}}
            draggable
          />
        </Layer>
      </Stage>
      <div className="absolute inset-x-0 bottom-0 flex space-x-2 items-center p-2">
        <button className="p-2 bg-black/80 rounded-md">
          <PiSparkleFill className="text-xl text-cyan-500" />
        </button>
        <button className="p-2 bg-black/80 rounded-md">
          <IoText className="text-xl" />
        </button>
      </div>
    </div>
  );
}
