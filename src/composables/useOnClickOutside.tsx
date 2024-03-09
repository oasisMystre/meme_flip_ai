type Props = {
  isOpen: boolean;
  menuRef: React.RefObject<HTMLElement>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function useOnClickOutSide({
  menuRef,
  setIsOpen,
}: Props) {
  return () => {
    if (!menuRef.current) return;

    const events = ["click", "touchstart"] as const;

    function onClick(event: TouchEvent | MouseEvent) {
      if (menuRef.current?.contains(event.target as Node)) return;
      setIsOpen(false);
      events.forEach((type) => document.removeEventListener(type, onClick));
    }

    setTimeout(() => {
      events.forEach((type) => {
        document.addEventListener(type, onClick);
      });
    }, 500);

    return () => {
      events.forEach((type) => document.removeEventListener(type, onClick));
    };
  };
}
