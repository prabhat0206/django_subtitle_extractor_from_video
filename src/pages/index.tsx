import React from "react";
import Popup from "../components/popup/index";
import VideoBox from "../components/video_box";
import { Store } from "../context";
import { AiOutlineSearch } from "react-icons/ai";

const Home = () => {
  const { openAndClosePopUp, videos, searchKey, setSearchKey } =
    React.useContext(Store);
  return (
    <div
      style={{
        backgroundImage: `url("https://img.freepik.com/free-photo/green-wall-mockup-with-green-plant-shelf3d-rendering_41470-4114.jpg?size=1080&ext=jpg")`,
      }}
      className="flex flex-col w-full h-screen bg-cover overflow-y-auto pb-20"
    >
      <div className="flex h-20 flex-wrap place-items-start h-22 justify-end p-4 w-full">
        <div className="text-center">
          <button
            onClick={openAndClosePopUp}
            className="p-2 pl-5 pr-5 bg-transparent border-2 border-[#CBFF5C] text-lg rounded-lg transition-colors duration-700 transform bg-[#CBFF5C] text-[#212D08] "
          >
            Upload Video
          </button>
        </div>
      </div>
      <div className="flex mt-40 h-20 flex-wrap place-items-center h-22 justify-center p-4 w-full">
        <div className="relative -mt-6 w-full sm:max-w-2xl sm:mx-auto">
          <div className="overflow-hidden  z-0 rounded-full relative p-3">
            <form className="border border-gray-300 bg-black bg-opacity-60  relative flex z-50 rounded-full">
              <input
                type="text"
                placeholder="Search Video"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
                className="rounded-full flex-1 px-6 py-4  bg-transparent text-white focus:outline-none placeholder:text-gray-300"
              />
              <button className=" text-white rounded-full font-semibold px-8 py-4 ">
                <AiOutlineSearch color="white" size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center">
        <div className="flex flex-wrap justify-evenly pt-10 w-11/12">
          {videos.map((video) => (
            <VideoBox {...video} key={video.video_name} />
          ))}
        </div>
      </div>
      <Popup />
    </div>
  );
};

export default Home;
