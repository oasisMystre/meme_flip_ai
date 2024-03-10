import Konva from "konva";

import { useEffect, useRef, useState } from "react";
import { Text as KonvaText, Transformer } from "react-konva";

export const MIN_WIDTH = 30;

export default function Text({
  onDragMove,
  onClick,
  ...props
}: React.ComponentProps<typeof KonvaText>) {
  const textNodeRef = useRef<Konva.Text | null>(null);
  const transformerNodeRef = useRef<Konva.Transformer | null>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>();

  useEffect(() => {
    const textNode = textNodeRef.current;
    const transformerNode = transformerNodeRef.current;

    if (!transformerNode) return;
    if (!textNode) return;

    transformerNode.nodes([textNode]);
    transformerNode.getLayer()!.batchDraw();
    setPosition({
      x: textNode.getStage()!.width() / 7,
      y: textNode.getStage()!.height() / 2,
    });
  }, [transformerNodeRef, textNodeRef]);

  return (
    <>
      <Transformer
        ref={transformerNodeRef}
        padding={0}
        enabledAnchors={["middle-left", "middle-right"]}
        boundBoxFunc={(oldBox, newBox) => {
          if (Math.abs(newBox.width) < MIN_WIDTH) return oldBox;
          return newBox;
        }}
        flipEnabled
        onClick={onClick}
      />

      <KonvaText
        ref={textNodeRef}
        {...props}
        padding={8}
        width={256}
        wrap="word"
        x={position?.x}
        y={position?.y}
        onClick={onClick}
        onTransform={() => {
          const textNode = textNodeRef.current!;

          textNode.setAttrs({
            scaleX: 1,
            scaleY: 1,
            width: Math.max(textNode.width() * textNode.scaleX(), MIN_WIDTH),
          });
        }}
        onDragMove={(event) => {
          setPosition({
            x: event.target.x(),
            y: event.target.y(),
          });
          if (onDragMove) onDragMove(event);
        }}
      />
    </>
  );
}
