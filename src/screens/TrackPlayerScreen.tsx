import { RefObject, useEffect, useRef } from "react";
import TrackPlayer, { Track } from "react-native-track-player";
import playerlistJson from "../assets/playerlist";
import VStack from "../components/views/VStack";
import device from "../platform/device";
import { SetupService } from "../service/SetupService";
import TrackControl from "./components/TrackControl";
import TrackList, { TrackListRef } from "./components/TrackList";
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
  const listRef = useRef() as RefObject<TrackListRef>;
  const goTo = (to: "next" | "prev") => {
    listRef.current?.scrollTo(to)
  };
  return (
    <VStack flex className={"bg-card py-safe-or-8"}>
      <TrackList ref={listRef} />
      <TrackControl goTo={goTo} />
    </VStack>
  );
};

export default TrackPlayerScreen;
const SIZE = device.width / 1.3;
