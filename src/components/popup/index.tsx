import { GrFormClose } from "react-icons/gr";
import { BsFillCloudUploadFill } from "react-icons/bs";
import React from "react";
import { Store } from "../../context";

const PopUp = () => {
  const {
    openAndClosePopUp,
    setFile,
    file,
    progress,
    isUploading,
    uploadVideo,
  } = React.useContext(Store);

  return (
    <div
      id="videoUploadBox"
      className="w-full h-screen z-10 hidden fixed bg-black bg-opacity-70 top-0 left-0"
    >
      <div className="flex w-full h-full justify-center items-center">
        <div className="flex items-center border border-gray-300 bg-white bg-opacity-80 backdrop-filter filter backdrop-blur-sm flex-col rounded-lg mb-10 w-2/3 h-[80vh]">
          <div className="flex justify-between items-center border-b border-gray-200  w-full h-16 rounded-t-lg">
            <div className="flex p-4 text-md font-bold">Upload a Video</div>
            {!isUploading && (
              <div className="flex items-center justify-center h-5 w- p-4">
                <GrFormClose
                  style={{
                    height: "25px",
                    width: "25px",
                    backgroundColor: "D3D3D3",
                    borderRadius: "30px",
                  }}
                  onClick={openAndClosePopUp}
                  className="cursor-pointer"
                />
              </div>
            )}
          </div>
          <div className="flex w-full h-80 justify-center">
            {file ? (
              <div className="mt-5">
                {!isUploading && (
                  <video
                    className="w-full h-full"
                    src={URL.createObjectURL(file)}
                    controls
                  />
                )}
                {isUploading ? (
                  <div className="flex flex-col mt-4 w-1/2">
                    <span className="text-2xl mt-5">{progress}% Uploaded</span>
                  </div>
                ) : (
                  <button
                    onClick={uploadVideo}
                    className="p-2 mt-10 pl-5 pr-5 bg-indigo-500 border border-indigo-300 hover:bg-indigo-700 text-white text-lg rounded-lg transition-colors duration-700 transform  hover:text-gray-100 focus:border-4 focus:border-indigo-300"
                  >
                    Upload Video
                  </button>
                )}
              </div>
            ) : (
              <div className="flex flex-col mt-4 w-1/2 justify-center items-center">
                <div className="flex w-full justify-center h-28">
                  <div className="flex w-32 justify-center items-center h-32 rounded-full bg-blue-200">
                    <BsFillCloudUploadFill
                      style={{ width: "60px", color: "gray", height: "110px" }}
                    />
                  </div>
                </div>
                <div className="flex w-full justify-center items-center text-sm text-gray-400">
                  <label className="h-full flex justify-center items-center">
                    <span className="p-2 mt-10 pl-5 pr-5 bg-indigo-500 border border-indigo-300 hover:bg-indigo-700 text-white text-lg rounded-lg transition-colors duration-700 transform  hover:text-gray-100 focus:border-4 focus:border-indigo-300">
                      Browse Your Computer
                    </span>
                    <input
                      onChange={(e) => {
                        if (e.target.files) {
                          setFile(e.target.files[0]);
                        }
                      }}
                      type="file"
                      name="file"
                      id="file"
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
