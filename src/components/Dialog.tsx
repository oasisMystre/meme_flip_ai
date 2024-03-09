import clsx from "clsx";
import { useRef } from "react";
import useOnClickOutSide from "../composables/useOnClickOutside";

type DialogProps = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
} & React.PropsWithChildren;

export default function Dialog({ visible, setVisible, children }: DialogProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutSide(dialogRef, () => setVisible(false));

  return (
    <div
      ref={dialogRef}
      className={clsx("fixed inset-0  bg-black/50 pt-16", [
        visible ? "flex flex-col" : "hidden",
      ])}
    >
      <div className="flex-1 bg-stone-950 rounded-t-xl">{children}</div>
    </div>
  );
}
