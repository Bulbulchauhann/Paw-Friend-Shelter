"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { X } from "lucide-react";
import Image from "next/image";

import "@uploadthing/react/styles.css";

type FileUploadProps = {
  onChange: (url?: string) => void;
  value: string;
  endPoint: "imageUpload";
};

const FileUpload = ({ onChange, value, endPoint }: FileUploadProps) => {
  const fileType = value?.split(".").pop();

  console.log("Filetype", fileType);

  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20">
        <Image fill src={value} alt="Upload" className="rounded-full" />
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endPoint}
      onClientUploadComplete={(res) => {
        console.log("file uploaded", res);
        onChange(res?.[0].url);
      }}
      onUploadError={(error) => {
        console.log(error);
      }}
    />
  );
};

export default FileUpload;
