import React, { useEffect } from "react";
import axios from "axios";

interface ISubtitle {
  start: string;
  end: string;
  text: string;
}

interface IVideo {
  url: string;
  video_name: string;
  subtitles: ISubtitle[];
  text_location: ISubtitle;
}

interface IContext {
  openAndClosePopUp: () => void;
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  isUploading: boolean;
  progress: number;
  uploadVideo: () => void;
  searchKey: string;
  setSearchKey: React.Dispatch<React.SetStateAction<string>>;
  videos: IVideo[];
}

export const Store = React.createContext<IContext>({
  openAndClosePopUp: () => {},
  file: null,
  setFile: () => {},
  isUploading: false,
  progress: 0,
  uploadVideo: () => {},
  searchKey: "",
  setSearchKey: () => {},
  videos: [],
});

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const openAndClosePopUp = () => {
    const videoUploadBox = document.getElementById("videoUploadBox");
    videoUploadBox?.classList.toggle("hidden");
  };
  const [file, setFile] = React.useState<File | null>(null);
  const [isUploading, setIsUploading] = React.useState<boolean>(false);
  const [progress, setProgress] = React.useState<number>(0);
  const [searchKey, setSearchKey] = React.useState<string>("");
  const [videos, setVideos] = React.useState<IVideo[]>([]);
  const baseUrl = "https://api.codencrafts.live";

  const uploadVideo = async () => {
    if (file) {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("video", file);
      await axios({
        method: "POST",
        url: `${baseUrl}/api/upload`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          setProgress(
            Math.round((progressEvent.loaded / progressEvent.total) * 100)
          );
        },
      })
        .then((res) => {
          if (res.data.status === "success") {
            alert("Video Uploaded Successfully");
            openAndClosePopUp();
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsUploading(false);
          setProgress(0);
          setFile(null);
        });
    }
  };

  useEffect(() => {
    const getVideos = async () => {
      await axios
        .get(`${baseUrl}/api/search`, {
          params: {
            q: searchKey,
          },
        })
        .then((res) => {
          setVideos(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (searchKey) {
      getVideos();
    } else {
      setVideos([]);
    }
  }, [searchKey]);

  return (
    <Store.Provider
      value={{
        openAndClosePopUp,
        file,
        setFile,
        isUploading,
        progress,
        uploadVideo,
        searchKey,
        setSearchKey,
        videos,
      }}
    >
      {children}
    </Store.Provider>
  );
};
