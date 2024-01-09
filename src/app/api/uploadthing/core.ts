import { userAuth } from "@/lib/user-auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = async () => {
  const user = await userAuth();

  if (!user) {
    throw new Error("Unauthorized!");
  }

  return { userId: user?.id };
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  imageUpload: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
