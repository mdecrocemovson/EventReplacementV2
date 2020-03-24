import React, { useState, useEffect } from "react";
import Responses from "../components/responses";
import RSVP from "../components/rsvp";
import Posts from "../components/posts";
import { Platform, StyleSheet, Text, View, ScrollView } from "react-native";
import { Button } from "react-native-elements";
import { fetchAllEvents } from "../components/event_services";

const styles = StyleSheet.create({
  paddedText: {
    padding: 15
  },
  paddedHeader: {
    padding: 15,
    fontWeight: 'bold',
    fontSize: 20
  },
  paddedTitle: {
    padding: 15,
    color: '#385898',
    fontSize: 14
  },
  container: {
    padding: 50
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
        return (
          <View>
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
            <Text style={styles.paddedText}>Date: {event.eventDate}</Text>
            <Text style={styles.paddedText}>Owner: {event.eventOwner}</Text>
            <Text style={styles.paddedText}>
              Location: {event.eventLocation}
            </Text>
            <Text style={styles.paddedText}>
              Description: {event.eventDescription}
            </Text>
            <Text style={styles.paddedText}>Other Attendees: </Text>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default HomeScreen;
