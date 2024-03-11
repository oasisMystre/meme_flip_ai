import { MdPhoto } from "react-icons/md";
import { Link } from "react-router-dom";

export default function EmptyGenerated() {
  return (
    <div className="self-center flex flex-col items-center justify-center space-y-4">
      <div className="w-12 h-12 flex flex-col items-center justify-center bg-white rounded-md">
        <MdPhoto className="text-2xl text-purple-500" />
      </div>
      <div className="text-center flex flex-col space-y-2">
        <h1 className="text-xl font-medium">No Meme generated yet!</h1>
        <Link
          to="/"
          className="self-center bg-primary px-4 py-2  rounded-md"
        >
          Start generating
        </Link>
      </div>
    </div>
  );
}
