import { Image, ImageProps, useImage } from "expo-image";
import device from "../../platform/device";

const AutoResizeImage = (props: ImageProps) => {
  const image = useImage(props.source, { maxWidth: device.width });
  if (!image) {
    return;
  }
  const aspectRatio = image?.width / image?.height;
  let width = device.width;
  let height = device.width / aspectRatio;
  if (height > device.height) {
    width = device.height * aspectRatio;
    height = device.height;
  }

  return (
    <Image
      recyclingKey={props?.recyclingKey}
      contentFit={props?.contentFit}
      style={{ width, height }}
      source={image}
    />
  );
};

export default AutoResizeImage;
