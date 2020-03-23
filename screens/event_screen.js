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
  Button
} from "react-native";
import { fetchSpecificEvent } from "../components/event_services";
import { setWorldAlignment } from "expo/build/AR";

const styles = StyleSheet.create({
  paddedText: {
    padding: 15
  },
  container: {
    backgroundColor: "#db7093",
    padding: 50
  },
  title: {
    fontSize: 30,
    padding: 15
  },
  subtitle: {
    fontSize: 20,
    padding: 15
  }
});

const EventScreen = ({ route, navigation }) => {
  debugger;
  const [eventDate, setEventDate] = useState("");
  const [eventOwner, setEventOwner] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventLocation, setEventLocation] = useState("");

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
        debugger;
        setEventName(body.eventName);
        setEventDate(body.eventDate);
        setEventOwner(body.eventOwner);
        setEventLocation(body.eventLocation);
        setEventDescription(body.eventDescription);
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    handleFetchedEvent();
  }, []);

  debugger;

  return (
    <ScrollView style={styles.container}>
      <Text>{route.params.eventId}</Text>
      <Text style={styles.paddedText}>{eventDate}</Text>
      <Text style={styles.title}>{eventName}</Text>
      <Text style={styles.subtitle}>Game On Fenway</Text>
      <Text style={styles.paddedText}>
        Private event hosted by {eventOwner}
      </Text>
      <Text style={styles.paddedText}>Location: {eventLocation}</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Responses />
      <Text style={styles.paddedText}>{eventDescription}</Text>
      <Posts />
      <RSVP />
    </ScrollView>
  );
};

export default EventScreen;
