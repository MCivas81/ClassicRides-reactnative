import { TouchableOpacity, View } from "react-native";
import Map from "../components/Map";
import NavigateCard from "../components/NavigateCard";
import RideOptionsCard from "../components/RideOptionsCard";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Icon } from "@rneui/base";

const MapScreen = ({ navigation }) => {
  const Stack = createNativeStackNavigator();

  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate("HomeScreen")}
        className="absolute top-16 left-8 z-50 bg-white rounded-full p-2 shadow-lg"
      >
        <Icon type="antdesign" color="black" name="arrowleft" />
      </TouchableOpacity>
      <View className="h-1/2">
        <Map />
      </View>
      <View className=" h-1/2">
        <Stack.Navigator>
          <Stack.Screen
            name="NavigateCard"
            component={NavigateCard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RideOptionsCard"
            component={RideOptionsCard}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </View>
    </View>
  );
};

export default MapScreen;
