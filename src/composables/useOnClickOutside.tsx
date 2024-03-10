type Props = {
  isOpen: boolean;
  menuRef: React.RefObject<HTMLElement>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function useOnClickOutSide({ menuRef, setIsOpen }: Props) {
  return () => {
    if (!menuRef.current) return;

    function onClick(event: TouchEvent | MouseEvent) {
      if (menuRef.current?.contains(event.target as Node)) return;
      setIsOpen(false);
      document.removeEventListener("click", onClick);
    }

    setTimeout(() => {
      document.addEventListener("click", onClick);
    }, 500);

    return () => {
      document.removeEventListener("click", onClick);
    };
  };
}
