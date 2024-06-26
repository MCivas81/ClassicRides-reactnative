import { View, FlatList, TouchableOpacity, Image, Text } from "react-native";
import { Icon } from "@rneui/base";
import { useSelector } from "react-redux";
import { selectOrigin } from "../slices/navSlice";

const data = [
  {
    id: "123",
    title: "Prenota una corsa",
    image:
      "https://static.vecteezy.com/system/resources/previews/003/559/269/non_2x/car-classic-silhouette-classic-car-black-and-white-vector.jpg",
    screen: "MapScreen",
  },
  {
    id: "456",
    title: "Noleggia un'auto",
    image:
      "https://img.freepik.com/premium-vector/car-icon-symbol-vector-logo-black-outline-isolated-white-background_677428-514.jpg",
    screen: "RentScreen",
  },
];

const NavOptions = ({ navigation }) => {
  const origin = useSelector(selectOrigin);

  return (
    <FlatList
      className="mt-4 px-5"
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate(item.screen)}
          className="p-6 rounded-md bg-gray-200 mt-4 border border-gray-300"
          disabled={!origin}
        >
          <View className={`flex-row justify-between items-center space-x-4 ${!origin && "opacity-30"}`}>
            <Image
              className="rounded-full"
              style={{ width: 130, height: 130, resizeMode: "contain" }}
              source={{ uri: item.image }}
            />
            <View className="w-40">
              <Text className="text-lg font-semibold mb-4">{item.title}</Text>
              <View className="bg-black rounded-full p-2">
                <Icon type="antdesign" color="white" name="arrowright" />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavOptions;
