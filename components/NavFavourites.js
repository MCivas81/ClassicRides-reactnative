import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Icon } from "@rneui/base";

const data = [
  {
    id: "123",
    icon: "home",
    location: "Casa",
    destination: "Viale della Libertà, 146, Palermo, Italia",
  },
  {
    id: "456",
    icon: "briefcase",
    location: "Lavoro",
    destination: "Via Roma 43, Palermo, Italia",
  },
];

const NavFavourites = () => {
  return (
    <FlatList
      className="mt-4"
      data={data}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => (
        <View className="bg-gray-100 h-0.5"/>
      )}
      renderItem={({ item }) => (
        <TouchableOpacity className="flex-row items-center p-4">
          <View className="bg-black rounded-full h-12 w-12 p-3 mr-4 flex items-center justify-center">
            <Icon type="ionicon" color="white" name={item.icon} size={20} />
          </View>
          <View>
            <Text className="font-semibold text-lg">{item.location}</Text>
            <Text className="text-gray-500">{item.destination}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavFavourites;
