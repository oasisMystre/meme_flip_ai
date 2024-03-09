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
      className={clsx("fixed inset-0  bg-black/50 lt-md:pt-16 md:flex md:items-center md:justify-center", [
        visible ? "flex flex-col" : "hidden",
      ])}
    >
      <div className="lt-md:flex-1 flex flex-col space-y-4 bg-stone-900 rounded-t-xl p-4 overflow-y-scroll md:max-w-lg">{children}</div>
    </div>
  );
}
