import { useEffect } from "react";
import TrackPlayer, {
  Track
} from "react-native-track-player";
import playerlistJson from "../assets/playerlist.json";
import VStack from "../components/views/VStack";
import { SetupService } from "../service/SetupService";
import TrackList from "./components/TrackList";
const initialPlayer = async () => {
  await SetupService();
  TrackPlayer.add(playerlistJson as Track[])
    .then((value) => {
      console.log("TrackPlayer add success", value);
    })
    .catch((err) => {
      console.error("Err", err);
    });
};
const TrackPlayerScreen = () => {
  useEffect(() => {
    initialPlayer();
  }, []);

  return (
    <VStack center="both" flex className={"bg-card pt-safe-or-8"}>
      <TrackList />
    </VStack>
  );
};

export default TrackPlayerScreen;
