import { useEffect } from "react";

export default function useOnClickOutSide(
  node: React.RefObject<HTMLElement | undefined>,
  callback: () => void
) {
  useEffect(() => {
    const onClickOutside = function (event: MouseEvent) {
      console.log(event.target);
      if (node.current!.contains(event.target as Node)) return;
      callback();
    };

    document.addEventListener("mousedown", onClickOutside);
    return document.removeEventListener("mousedown", onClickOutside);
  }, [node]);
}
