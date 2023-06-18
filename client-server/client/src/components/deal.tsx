import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

import Coin from "../img/star.png";

import { toast } from "react-hot-toast";
import { NavigateFunction } from "react-router-dom";

export function toastHandler(
  title: string,
  points: number,
  id: number,
  navigate: NavigateFunction
) {
  toast.custom((t) => (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <img className="h-10 w-10 rounded-full" src={Coin} alt="coin" />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">Deal</p>
            <p className="mt-1 text-sm text-gray-500">{title}</p>
            <p className="mt-1 text-sm text-gray-500">{points} Coins</p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-200">
        <div className="w-full border bg-white border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium">
          <DoneIcon
            className=" text-green-400"
            onClick={() => {
              toast.dismiss(t.id);
              sessionStorage.setItem("dealTitle", title);
              sessionStorage.setItem("taskId", id.toString());
              sessionStorage.setItem("points", points.toString());
              navigate("../dealPage");
            }}
          />
          <CloseIcon
            className=" text-red-400"
            onClick={() => toast.dismiss(t.id)}
          />
        </div>
      </div>
    </div>
  ));
}
