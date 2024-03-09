import { useEffect, useRef, useState } from "react";
import Konva from "konva";
import { Text as KonvaText, Transformer } from "react-konva";

export const MIN_WIDTH = 30;

export default function Text({
  onDragMove,
  ...props
}: React.ComponentProps<typeof KonvaText>) {
  const textNodeRef = useRef<Konva.Text | null>(null);
  const transformerNodeRef = useRef<Konva.Transformer | null>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>();

  const onTextEdit = () => {};

  useEffect(() => {
    const textNode = textNodeRef.current!;
    const transformerNode = transformerNodeRef.current!;

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
        padding={8}
        enabledAnchors={["middle-left", "middle-right"]}
        boundBoxFunc={(oldBox, newBox) => {
          if (Math.abs(newBox.width) < MIN_WIDTH) return oldBox;
          return newBox;
        }}
        flipEnabled
      />

      <KonvaText
        ref={textNodeRef}
        {...props}
        width={256}
        wrap="word"
        x={position?.x}
        y={position?.y}
        onDblClick={onTextEdit}
        onDblTap={onTextEdit}
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
