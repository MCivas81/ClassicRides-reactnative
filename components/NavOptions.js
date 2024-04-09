import { View, FlatList, TouchableOpacity, Image, Text } from "react-native";
import { Icon } from "@rneui/base";
import { useSelector } from "react-redux";
import { selectOrigin } from "../slices/navSlice";

const data = [
  {
    id: "123",
    title: "Get a ride",
    image:
      "https://static.vecteezy.com/system/resources/previews/003/559/269/non_2x/car-classic-silhouette-classic-car-black-and-white-vector.jpg",
    screen: "MapScreen",
  },
  {
    id: "456",
    title: "Rent a car",
    image:
      "https://img.freepik.com/premium-vector/car-icon-symbol-vector-logo-black-outline-isolated-white-background_677428-514.jpg",
    screen: "RentScreen",
  },
];

const NavOptions = ({ navigation }) => {
  const origin = useSelector(selectOrigin);

  return (
    <FlatList
      className="mt-4"
      horizontal
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate(item.screen)}
          className="p-2 pl-6 pb-6 pt-4 rounded-md bg-gray-200 mr-2 mt-4 w-40 border border-gray-300"
          disabled={!origin}
        >
          <View className={`items-start ${!origin && "opacity-30"}`}>
            <Image
              className="rounded-full"
              style={{ width: 100, height: 100, resizeMode: "contain" }}
              source={{ uri: item.image }}
            />
            <Text className="text-lg font-semibold mt-2 mb-4">{item.title}</Text>
            <View className="bg-black rounded-full p-2">
              <Icon type="antdesign" color="white" name="arrowright" />
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavOptions;
