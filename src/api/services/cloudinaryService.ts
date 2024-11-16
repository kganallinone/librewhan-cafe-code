import CryptoJS from "crypto-js";
import { CLOUDINARY } from "./../../app/config/commonConfig";

// Define types for the function parameters and return values
type UploadResponse = {
  public_id: string;
  secure_url: string;
  [key: string]: any;
};

type RemoveResponse = {
  result: string;
  [key: string]: any;
};

// Upload file to Cloudinary
export const uploadFileToCloudinary = async (
  file: File,
  _folderName: string
): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("cloud_name", CLOUDINARY.CLOUD_NAME);
  formData.append("upload_preset", CLOUDINARY.UPLOAD_PRESET_UNSIGNED);
  formData.append("folder", CLOUDINARY.DEFAULT_FOLDER + _folderName);

  const response = await fetch(CLOUDINARY.IMAGE_UPLOAD_ENDPOINT, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Chunk upload failed.");
  }

  return (await response.json()) as UploadResponse;
};

// Remove file from Cloudinary
export const removeFileFromCloudinary = async (
  publicId: string
): Promise<RemoveResponse> => {
  const timeStampNow = Math.floor(Date.now() / 1000); // Use Unix timestamp in seconds
  const stringToHash = `public_id=${publicId}&timestamp=${timeStampNow}${CLOUDINARY.API_SECRET}`;
  const hashSignature = CryptoJS.SHA1(stringToHash).toString(CryptoJS.enc.Hex);

  const formData = new FormData();
  formData.append("api_key", CLOUDINARY.API_KEY);
  formData.append("public_id", publicId);
  formData.append("timestamp", timeStampNow.toString());
  formData.append("signature", hashSignature);

  const response = await fetch(CLOUDINARY.IMAGE_DESTROY_ENDPOINT, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to remove image.");
  }

  return (await response.json()) as RemoveResponse;
};
