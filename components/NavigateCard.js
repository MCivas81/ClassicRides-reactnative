import { Text, SafeAreaView, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "react-native-dotenv";
import { useDispatch } from "react-redux";
import { setDestination } from "../slices/navSlice";
import NavFavourites from "./NavFavourites";

const NavigateCard = ({ navigation }) => {
  const dispatch = useDispatch();

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
    </SafeAreaView>
  );
};

export default NavigateCard;
