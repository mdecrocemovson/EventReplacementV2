import React, { useState, useEffect } from "react";
import Responses from "../components/responses";
import RSVP from "../components/rsvp";
import Posts from "../components/posts";
import { Image, StyleSheet, Text, View, ScrollView } from "react-native";
import { Button } from "react-native-elements";
import { fetchAllEvents } from "../components/event_services";

const styles = StyleSheet.create({
  paddedText: {
    padding: 15
  },
  paddedHeader: {
    padding: 15,
    fontWeight: "bold",
    fontSize: 20
  },
  paddedTitle: {
    padding: 15,
    color: "#385898",
    fontSize: 20,
    fontWeight: "bold"
  },
  title: {
    fontSize: 30,
    padding: 15
  },
  subtitle: {
    fontSize: 20,
    padding: 15
  },
  createEventContainer: {
    width: 200,
    padding: 20
  },
  image: {
    height: 200,
    width: 200
  },
  imageContainer: {
    flex: 1,
    width: '20%',
    textAlign: "center",
    justifyContent: "center",
    padding: 20
  },
  eventContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 20
  },
  detailsContainer: {
    flex: 1,
    flexDirection: 'column',
    width: '80%'
  }
});

const HomeScreen = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState("");

  const handleFetchedEvents = () => {
    fetchAllEvents()
      .then(response => {
        if (response.ok) {
          return response;
        }
      })
      .then(response => {
        return response.json();
      })
      .then(body => {
        setEvents(body);
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };
  useEffect(() => {
    handleFetchedEvents();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.createEventContainer}>
        <Button
          title={`Create a new event`}
          onPress={() => navigation.navigate("CreateEvent")}
        />
      </View>
      <Text style={styles.paddedHeader}>Events</Text>
      {events.map(event => {
        let convertedDate = new Date(event.eventDate);
        return (
          <View key={event.id} style={styles.eventContainer}>
            <View style={styles.imageContainer}>
              <Image
              style={styles.image}
              source={{ uri: event.eventCoverImage }}
            />
            </View>
            <View style={styles.detailsContainer}>
            <Text
              style={styles.paddedTitle}
              onPress={() =>
                navigation.navigate("Event", {
                  eventId: event.id
                })
              }
            >
              {event.eventName}
            </Text>
            <Text style={styles.paddedText}>
              Date:{" "}
              {`${convertedDate.getUTCMonth()}/${convertedDate.getUTCDate()}`}
            </Text>
            <Text style={styles.paddedText}>
              Location: {event.eventLocation}
            </Text>
            <Text style={styles.paddedText}>Owner: {event.eventOwner}</Text>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default HomeScreen;
