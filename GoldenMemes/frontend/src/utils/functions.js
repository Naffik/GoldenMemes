export const isFileError = (fSize, fFormat) => {
  let supportedSize = 2000000; //2MB
  const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

  if (fSize > supportedSize) return "File is too big";
  if (SUPPORTED_FORMATS.indexOf(fFormat) < 0) return "Unsupported format";

  return null;
};
