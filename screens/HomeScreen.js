import { View, SafeAreaView, Image } from "react-native";
import NavOptions from "../components/NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "react-native-dotenv";
import { useDispatch } from "react-redux";
import { setDestination, setOrigin } from "../slices/navSlice";

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  return (
    <SafeAreaView className="bg-white h-full">
      <View className="p-5">
        <Image
          style={{
            width: 120,
            height: 120,
            resizeMode: "contain",
            marginLeft:-18
          }}
          source={{
            uri: "https://img.freepik.com/premium-vector/classic-car-logo_1366-140.jpg",
          }}
        />

        <GooglePlacesAutocomplete
          placeholder="Where From?"
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
            },
            textInput: {
              fontSize: 18,
            },
          }}
        />
        <NavOptions navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
