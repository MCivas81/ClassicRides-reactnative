import { View, SafeAreaView, Image, Text, StyleSheet } from "react-native";
import NavOptions from "../components/NavOptions";
import NavFavourites from "../components/NavFavourites";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "react-native-dotenv";
import { useDispatch } from "react-redux";
import { setDestination, setOrigin } from "../slices/navSlice";
import { Allura_400Regular } from "@expo-google-fonts/allura";
import { useFonts } from "expo-font";

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [fontsLoaded] = useFonts({
    Allura_400Regular,
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView className="bg-white h-full">
      <View>
        <View className="flex-row items-center mb-4 px-5">
          <Image
            style={{
              width: 120,
              height: 120,
              resizeMode: "contain",
              marginLeft: -18,
            }}
            source={{
              uri: "https://img.freepik.com/premium-vector/classic-car-logo_1366-140.jpg",
            }}
          />
          <View className="flex-1 items-center">
            <Text style={styles.allura}>Classic Rides</Text>
          </View>
        </View>

        <GooglePlacesAutocomplete
          placeholder="Da dove parti?"
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
          onPress={(data, details = null) => {
            dispatch(
              setOrigin({ location: details.geometry.location, description: data.description })
            );
            dispatch(setDestination(null));
          }}
          returnKeyType={"search"}
          fetchDetails={true}
          minLength={2}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "it",
          }}
          enablePoweredByContainer={false}
          styles={{
            textInputContainer: {
              backgroundColor: "rgba(0,0,0,0)",
              borderBottomWidth: 1,
            },
            container: {
              flex: 0,
              marginHorizontal: 20,
            },
            textInput: {
              fontSize: 18,
            },
          }}
        />
        <NavOptions navigation={navigation} />
        <NavFavourites />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  allura: {
    fontFamily: "Allura_400Regular",
    fontSize: 48,
    color: "black",
  },
});

export default HomeScreen;
