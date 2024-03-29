import clsx from "clsx";
import Konva from "konva";

import { useEffect, useRef, useState } from "react";
import { IoIosColorPalette } from "react-icons/io";
import { SketchPicker } from "react-color";
import { usePopper } from "react-popper";

import useOnClickOutSide from "../composables/useOnClickOutSide";

type TextEditDialogProps = {
  currentText?: Konva.Text;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  style?: React.CSSProperties;
};

export default function TextEditDialog({
  currentText,
  style,
  isOpen,
  setIsOpen,
}: TextEditDialogProps) {
  const [isPalleteOpen, setPalleteOpen] = useState(false);
  const [text, setText] = useState(currentText?.text());

  const menuRef = useRef<HTMLDivElement | null>(null);
  const palleteRef = useRef<HTMLButtonElement | null>(null);
  const palleteMenuRef = useRef<HTMLDivElement | null>(null);

  const { styles, attributes } = usePopper(
    palleteRef.current,
    palleteMenuRef.current,
    { placement: "auto" }
  );

  useEffect(useOnClickOutSide({ isOpen, setIsOpen, menuRef }), [
    menuRef,
    isOpen,
    setIsOpen,
  ]);

  return (
    <div
      ref={menuRef}
      style={style}
      className={clsx(
        "absolute absolute flex flex-col w-56 bg-stone-950/90 p-2 rounded-md z-10"
      )}
    >
      <div className="flex space-x-2 items-center">
        <textarea
          value={text}
          className="flex-1 p-2 max-w-42 bg-stone-700/50 rounded !outline-none"
          placeholder="Edit Text"
          onInput={(event) => {
            const text = (event.target as HTMLInputElement).value;
            setText(text);
            currentText!.setText(text);
          }}
        />
        <button
          ref={palleteRef}
          className="bg-cyan p-1 rounded-md"
          onClick={() => setPalleteOpen(!isPalleteOpen)}
        >
          <IoIosColorPalette className="text-xl" />
        </button>
        <div
          ref={palleteMenuRef}
          style={{
            ...styles.popper,
            display: isPalleteOpen ? "block" : "none",
          }}
          {...attributes.popper}
        >
          <SketchPicker
            onChangeComplete={(color) => {
              console.log(color);
              currentText?.setAttrs({
                fill: color.hex,
              });
            }}
          />
        </div>
      </div>
    </div>
  );
}
