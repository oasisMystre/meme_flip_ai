export default function LoadingMeme() {
  return (
    <div className="grid grid-cols-3 gap-4 overflow-y-scroll">
      {Array.from(new Array(100).values()).map((index) => {
        return (
          <div
            key={index}
            className="relative max-w-36 min-h-40 max-h-40 bg-stone-700 rounded-md  overflow-hidden animate-pulse"
          />
        );
      })}
    </div>
  );
}
