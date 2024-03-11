import clsx from "clsx";
import { useEffect, useRef } from "react";
import useOnClickOutSide from "../composables/useOnClickOutSide";

type DialogProps = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
} & React.PropsWithChildren;

export default function Dialog({ visible, setVisible, children }: DialogProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(
    useOnClickOutSide({
      menuRef: dialogRef,
      isOpen: visible,
      setIsOpen: setVisible,
    }),
    [visible, setVisible, dialogRef]
  );

  return (
    <div
      ref={dialogRef}
      className={clsx(
        "fixed inset-0  bg-black/50 lt-md:pt-16 md:flex md:items-center md:justify-center",
        [visible ? "flex flex-col" : "hidden"]
      )}
    >
      <div className="lt-md:flex-1 flex flex-col space-y-4 bg-stone-950 rounded-t-xl p-4 overflow-y-scroll md:max-w-lg">
        {children}
      </div>
    </div>
  );
}
