import { View, Text, SafeAreaView, TouchableOpacity, FlatList, Image } from "react-native";
import { Icon } from "@rneui/base";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectTravelTimeInformation } from "../slices/navSlice";
import { formatCurrency } from "../utils/formatters";

const data = [
  {
    id: "123",
    title: "Classic",
    multiplier: 1,
    image:
      "https://static.vecteezy.com/system/resources/previews/018/838/628/original/classic-muscle-car-silhouette-logo-premium-design-isolated-on-a-white-background-showing-from-the-side-best-for-badge-emblem-icon-sticker-design-available-eps-10-vector.jpg",
  },
  {
    id: "456",
    title: "Classic Sport",
    multiplier: 1.3,
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/007/073/897/small/black-and-white-car-illustration-for-conceptual-design-free-vector.jpg",
  },
  {
    id: "789",
    title: "Classic Elegance",
    multiplier: 1.75,
    image:
      "https://static.vecteezy.com/system/resources/previews/039/642/960/non_2x/a-vintage-classic-car-silhouette-black-illustration-vector.jpg",
  },
];

const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = ({ navigation }) => {
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);

  return (
    <SafeAreaView className="bg-white flex-grow">
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("NavigateCard")}
          className="absolute top-6 left-4 z-50"
        >
          <Icon type="evilicons" color="black" name="chevron-left" />
        </TouchableOpacity>
        <Text className="text-center py-5 text-xl">
          Seleziona una corsa - {travelTimeInformation?.distance?.text}
        </Text>
      </View>

      <FlatList
        className="px-5"
        data={data}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View className="bg-gray-100 h-0.5" />}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            className={`flex-row justify-between items-center p-3 ${
              item?.id === selected?.id && "bg-gray-200"
            }`}
          >
            <View className="bg-white rounded-full">
              <Image
                className="rounded-full"
                style={{ width: 80, height: 80, resizeMode: "contain" }}
                source={{ uri: item.image }}
              />
            </View>
            <View className="w-36">
              <Text className="text-lg font-semibold">{item.title}</Text>
              <Text>Durata: {travelTimeInformation?.duration?.text}</Text>
            </View>
            <Text className="text-lg">
              {formatCurrency(
                (travelTimeInformation?.duration.value * SURGE_CHARGE_RATE * item.multiplier) / 100
              )}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View className="mt-auto border-t border-gray-200">
        <TouchableOpacity
          disabled={!selected}
          className={`bg-black py-3 mx-5 my-3 ${!selected && "opacity-30"}`}
        >
          <Text className="text-white text-center text-xl">Scegli {selected?.title}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;
