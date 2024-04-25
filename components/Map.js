import MapView, { Marker } from "react-native-maps";
import { useSelector } from "react-redux";
import { selectDestination, selectOrigin, setTravelTimeInformation } from "../slices/navSlice";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_APIKEY } from "react-native-dotenv";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!origin || !destination) return;

    mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    });
  }, [origin, destination]);

  useEffect(() => {
    if (!origin || !destination) return;

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${destination.description}&language=it-IT&&origins=${origin.description}&units=metric&key=${GOOGLE_MAPS_APIKEY}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [origin, destination, GOOGLE_MAPS_APIKEY]);

  return (
    <MapView
      ref={mapRef}
      style={{ flex: 1 }}
      initialRegion={{
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      {origin && destination && (
        <MapViewDirections
          origin={origin.description}
          destination={destination.description}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="black"
        />
      )}

      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title="Origin"
          description={origin.description}
          identifier="origin"
        />
      )}

      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          title="Destination"
          description={destination.description}
          identifier="destination"
        />
      )}
    </MapView>
  );
};

export default Map;
