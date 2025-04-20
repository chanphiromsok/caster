import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect } from "react";
import VStack from "../components/views/VStack";
import { LegendList } from "@legendapp/list";
import TrackPlayer, {
  Track,
  useActiveTrack,
  useIsPlaying,
} from "react-native-track-player";
import playerlistJson from "../assets/playerlist.json";
import { SetupService } from "../service/SetupService";
import TextFigtree from "../components/views/TextFigtree";
import MaterialSymbolIcons from "../components/icons/MaterialSymbolIcons";
import HStack from "../components/views/HStack";
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

  const track = useActiveTrack();
  console.log("track", track);
  const { playing, bufferingDuringPlay } = useIsPlaying();

  return (
    <VStack center="both" flex className={"bg-card"}>
      <HStack center="vertical">
        <TouchableWithoutFeedback
          onPress={() => {
            TrackPlayer.skipToPrevious();
          }}
        >
          <MaterialSymbolIcons size={48} name="arrow_back" color={"white"} />
        </TouchableWithoutFeedback>
        {bufferingDuringPlay ? (
          <ActivityIndicator />
        ) : (
          <TouchableWithoutFeedback
            onPress={playing ? TrackPlayer.pause : TrackPlayer.play}
          >
            <MaterialSymbolIcons
              name={playing ? "pause" : "play_circle"}
              size={48}
              color={"white"}
            />
          </TouchableWithoutFeedback>
        )}
        <TouchableWithoutFeedback
          onPress={() => {
            TrackPlayer.skipToNext();
          }}
        >
          <MaterialSymbolIcons size={48} name="arrow_forward" color={"white"} />
        </TouchableWithoutFeedback>
      </HStack>
    </VStack>
  );
};

export default TrackPlayerScreen;
