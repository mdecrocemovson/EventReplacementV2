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
import { fetchAllEvents } from "../components/event_services";
import {
  FormLabel,
  FormInput,
  FormValidationMessage
} from "react-native-elements";

const styles = StyleSheet.create({
  paddedText: {
    padding: 15
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
});

const HomeScreen = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState('');

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
      <Text style={styles.paddedText}>Your events!</Text>
      <Button 
        title={`Create a new event`}
        onPress={() => 
          navigation.navigate("CreateEvent")
        }
        />
      {events.map(event => {
        return (
          <View>
            <Text>Date: {event.eventDate}</Text>
            <Text>Owner: {event.eventOwner}</Text>
            <Button
              title={`Event number ${event.id}`}
              onPress={() =>
                navigation.navigate("Event", {
                  eventId: event.id
                })
              }
            />
          </View>
        );
      })}
    </ScrollView>
  );
};

export default HomeScreen;
