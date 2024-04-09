import { Text, View } from "react-native";
import Map from "../components/Map";

const MapScreen = () => {
  return (
    <View>
      <View className="h-1/2">
        <Map />
      </View>
      <View className=" h-1/2">
        <Text>MapScreen</Text>
      </View>
    </View>
  );
};

export default MapScreen;
