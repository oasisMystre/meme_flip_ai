import { useRef } from "react";
import Konva from "konva";
import { Text as KonvaText } from "react-konva";

export default function Text(props: React.ComponentProps<typeof KonvaText>) {
  const textNodeRef = useRef<Konva.Text | null>(null);

  const onTextEdit = () => {

  };

  return (
    <KonvaText
      ref={textNodeRef}
      {...props}
      onDblClick={onTextEdit}
      onDblTap={onTextEdit}
    />
  );
}
