import Bot from "../assets/bot.gif";

export default function LoadingMemeError() {
  return (
    <div className="flex-1 flex flex-col space-y-4 items-center justify-center">
      <img
        className="w-16 h-16"
        src={Bot}
        width={48}
        height={48}
      />
      <div className="text-center flex flex-col space-y-2">
        <p className="text-white">Oops! Can't load meme list</p>
        <button className="bg-amber-500 px-8 py-2 rounded-md">Retry</button>
      </div>
    </div>
  );
}
