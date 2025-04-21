import { Image } from "expo-image";
import { type Track } from "react-native-track-player";
import VStack from "../../components/views/VStack";
import { styles } from "./styles";
interface TrackCardPlayerProps extends Track {}
const TrackCardPlayer = ({ artwork }: TrackCardPlayerProps) => {
  const imageUri = Object.hasOwn(artwork as any, "uri")
    ? artwork?.uri
    : artwork;
  return (
    <VStack style={styles.container}>
      <Image
        recyclingKey={imageUri}
        source={{ uri: imageUri }}
        style={styles.artwork}
      />
    </VStack>
  );
};

export default TrackCardPlayer;
