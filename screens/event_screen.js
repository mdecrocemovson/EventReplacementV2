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
  },
});



const EventScreen = ({ route, navigation }) => {
  debugger
  const [eventDate, setEventDate] = useState('');
  const [eventOwner, setEventOwner] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventLocation, setEventLocation] = useState('');

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
        debugger
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
      <Text style={styles.title}>Union ReUnion</Text>
      <Text style={styles.subtitle}>Game On Fenway</Text>

      <Text style={styles.paddedText}>Private event hosted by {eventOwner}</Text>
      <Text style={styles.paddedText}>Location: {eventLocation}</Text>
      <Text style={styles.paddedText}>
        82 Landsdowne street, Boston, Mass 02215
      </Text>

      <Button title="Go back" onPress={() => navigation.goBack()} />

      <Responses />

      <Text style={styles.paddedText}>
        Time for a little over-due Union ReUnion. If you’re feeling nostalgic
        about the good old days on frat row and taking selfies by the Nott, come
        help us take over the bar Game On in Fenway on Saturday, Feb 29th at
        4PM. Let’s kick off the leap year right - Starting with late day
        drinking and see how late we can go. Friends and plus ones encouraged,
        feel free to spread the word about a good time. See your drunk ass
        there! Your hosts, Olio, Shiraz, Nat & Jenna
      </Text>

      <Posts />

      <RSVP />
    </ScrollView>
  );
};

export default EventScreen;
