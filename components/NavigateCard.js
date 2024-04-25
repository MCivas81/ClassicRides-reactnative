import { Text, SafeAreaView, View, TouchableOpacity } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "react-native-dotenv";
import { useDispatch } from "react-redux";
import { selectDestination, setDestination } from "../slices/navSlice";
import NavFavourites from "./NavFavourites";
import { useSelector } from "react-redux";

const NavigateCard = ({ navigation }) => {
  const dispatch = useDispatch();
  const destination = useSelector(selectDestination);

  return (
    <SafeAreaView className="bg-white flex-1">
      <Text className="text-center py-5 text-xl">Scegli la destinazione</Text>
      <View>
        <View className="px-4">
          <GooglePlacesAutocomplete
            placeholder="Dove vuoi andare?"
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
            returnKeyType={"search"}
            fetchDetails={true}
            minLength={2}
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  location: details.geometry.location,
                  description: data.description,
                })
              );

              navigation.navigate("RideOptionsCard");
            }}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: "it",
            }}
            enablePoweredByContainer={false}
            styles={{
              textInputContainer: {
                backgroundColor: "rgba(0,0,0,0)",
              },
              container: {
                flex: 0,
              },
              textInput: {
                fontSize: 18,
                backgroundColor: "#e5e5e5",
                height: 48,
              },
            }}
          />
        </View>
        <NavFavourites />
      </View>
      <View className="flex-row justify-evenly mt-auto px-4">
        <TouchableOpacity
          disabled={!destination}
          onPress={() => navigation.navigate("RideOptionsCard")}
          className={`px-4 w-28 py-3 rounded-full bg-black ${!destination && "opacity-30"}`}
        >
          <Text className="text-white text-center">Corse</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={!destination}
          className={`px-4 w-28 py-3 rounded-full bg-black ${!destination && "opacity-30"}`}
        >
          <Text className="text-white text-center">Noleggio</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NavigateCard;
