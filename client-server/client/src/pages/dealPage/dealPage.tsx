import React from "react";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import Layout from "../../layout/loggedIn/layout";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import ImageUploading from "react-images-uploading";
import { useNavigate } from "react-router-dom";
import { updateProgress } from "../../utils/data-utils";
import useAuthUser from "react-auth-kit/dist/hooks/useAuthUser";
import { fetchRestEndpoint } from "../../utils/client-server";
import { Toaster, toast } from "react-hot-toast";

const DealPage = () => {
  const auth = useAuthUser();

  const [images, setImages] = React.useState([]);
  const maxNumber = 1;
  let navigate = useNavigate();

  const onChange = (imageList: any, addUpdateIndex: any) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  async function onComplete() {
    await updateProgress(
      Number(auth()?.id),
      Number(sessionStorage.getItem("points")),
      1
    );

    navigate("../dashboard");
    onClickHandler(Number(sessionStorage.getItem("taskId")));
  }

  const onClickHandler = async (taskId: number) => {
    try {
      const response = await fetchRestEndpoint(
        "http://localhost:8000/api/taskQueue/" + taskId,
        "PUT",
        JSON.parse(`{"completed": "${1}"}`)
      );
    } catch (error: any) {
      toast.error(error.message);
    }
    toast.success("Habit completed");
  };
  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <h1 className="text-4xl text-center mb-2">
          {sessionStorage.getItem("dealTitle")}
        </h1>
        <h1 className="text-center text-2xl">
          Points: {sessionStorage.getItem("points")}
        </h1>
        <div className="flex justify-center mt-5">
          <CloseIcon
            onClick={() => navigate("../dashboard")}
            className="text-red-400"
          />
        </div>

        <div className="flex justify-center mt-5">
          <CountdownCircleTimer
            isPlaying
            duration={7}
            colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
            colorsTime={[7, 5, 2, 0]}
            onComplete={() => {
              onComplete();
            }}
          >
            {({ remainingTime }) => remainingTime}
          </CountdownCircleTimer>
        </div>
        {/* 
        <ImageUploading
          multiple
          value={images}
          onChange={onChange}
          maxNumber={maxNumber}
          dataURLKey="data_url"
        >
          {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
            // write your building UI
            <div className="upload__image-wrapper">
              <button
                style={isDragging ? { color: "red" } : undefined}
                onClick={onImageUpload}
                {...dragProps}
              >
                Click or Drop here
              </button>
              &nbsp;
              <button onClick={onImageRemoveAll}>Remove all images</button>
              {imageList.map((image, index) => (
                <div key={index} className="image-item">
                  <img src={image["data_url"]} alt="" width="100" />
                  <div className="image-item__btn-wrapper">
                    <button onClick={() => onImageUpdate(index)}>Update</button>
                    <button onClick={() => onImageRemove(index)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ImageUploading>
        */}
      </div>
    </div>
  );
};

export default DealPage;
