import ImageCompression from "browser-image-compression";

export const compressImage = async (file) => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };
  try {
    const compressedFile = await ImageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.error(error);
  }
};
