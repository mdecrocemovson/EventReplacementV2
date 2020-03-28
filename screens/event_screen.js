import React, { useState, useEffect } from "react";
import Responses from "../components/responses";
import RSVP from "../components/rsvp";
import Posts from "../components/posts";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Button
} from "react-native";
import { fetchSpecificEvent } from "../components/event_services";
import { Ionicons } from "@expo/vector-icons";

const styles = StyleSheet.create({
  paddedText: {
    padding: 15,
    color: "white",
    fontSize: 17
  },
  paddedDate: {
    padding: 15,
    color: "red",
    fontSize: 20
  },
  container: {
    paddingTop: 30,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: "#4887B0"
  },
  title: {
    fontSize: 27,
    padding: 15
  },
  subtitle: {
    fontSize: 20,
    padding: 15
  },
  paddedDescription: {
    padding: 15,
    fontSize: 17
  },
  boldedText: {
    fontWeight: "bold"
  },
  image: {
    height: 200,
    width: "100%"
  },
  imageContainer: {
    padding: 0
  }
});

const EventScreen = ({ route, navigation }) => {
  const [eventId, setEventId] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventOwner, setEventOwner] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventCoverImage, setEventCoverImage] = useState("");

  const handleFetchedEvent = () => {
    fetchSpecificEvent(route.params.eventId)
      .then(response => {
        if (response.ok) {
          return response;
        }
      })
      .then(response => {
        return response.json();
      })
      .then(body => {
        setEventId(body.eventId);
        setEventName(body.eventName);
        setEventDate(body.eventDate);
        setEventOwner(body.eventOwner);
        setEventLocation(body.eventLocation);
        setEventDescription(body.eventDescription);
        setEventCoverImage(body.eventCoverImage);
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    handleFetchedEvent();
  }, []);

  let convertedDate = new Date(eventDate);
  let convertedDateOutput = `${convertedDate.getUTCMonth()}/${convertedDate.getUTCDate()}`;
  return (
    <ScrollView style={styles.container} alwaysBounceVertical>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: eventCoverImage }} />
      </View>
      <Text style={styles.paddedDate}>{convertedDateOutput}</Text>
      <Text style={styles.title}>{eventName}</Text>
      <Text style={styles.subtitle}>
        Private Event by <Text style={styles.boldedText}>{eventOwner}</Text>
      </Text>
      <Text style={styles.paddedText}>
        <Ionicons name="md-map" size={20} />
        {"  -  "} {eventLocation}
      </Text>
      <Text style={styles.paddedText}>
        22-55 33rd Street, Long Island City, NY 11105
      </Text>
      {/* <View style={styles.paddedText}><Responses /></View> */}
      <Text style={styles.paddedText}>Details</Text>
      <Text style={styles.paddedDescription}>{eventDescription}</Text>
      <Text
        style={styles.paddedText}
        onPress={() =>
          navigation.navigate("EditEvent", {
            eventId: 2
          })
        }
      >
        Edit
      </Text>
      <Posts />
      <RSVP />
    </ScrollView>
  );
};

export default EventScreen;
