import React from "react";

interface Subtitle {
  start: string;
  end: string;
  text: string;
}

interface IVideoBox {
  url: string;
  video_name: string;
  subtitles: Subtitle[];
  text_location: Subtitle;
}

export default function VideoBox(props: IVideoBox) {
  return (
    <div className="flex flex-col h-80 border bg-black bg-opacity-50 rounded-xl backdrop-blur-sm filter backdrop-filter">
      <div className="box-border h-60 w-80 p-4 ">
        <video
          className="w-full h-full overflow-hidden"
          src={props.url}
          controls
        />
      </div>
      <div className="flex w-full flex-col text-white justify-center bold items-center">
        <span className="text-xl mt-2">
          {props.video_name.length > 22
            ? `${props.video_name.slice(0, 22)}...`
            : props.video_name}
        </span>
        <span>
          Text location: {props.text_location.start.split(",")[0]} -{" "}
          {props.text_location.end.split(",")[0]}
        </span>
      </div>
    </div>
  );
}
