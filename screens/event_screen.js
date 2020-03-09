import React, { useState } from "react";
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

  tabBarInfoContainer: {
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  }
});

const fetchEvents = () => {
  fetch("http://localhost:3000/events", {
    credentials: "same-origin"
  })
    .then(response => {
      if (response.ok) {
        debugger;
        return response;
      }
    })
    .then(response => {
      debugger;
      return response.json();
    })
    .then(body => {
      setDate(body[0].date);
      setOwner(body[0].owner);
    })
    .catch(error => {
      console.error("Error:", error);
    });
};

const removeDuplicates = nums => {
  let newHash = {};
  nums.forEach(element => {
    if (Object.keys(newHash).length === 0) {
      debugger;
      newHash[element] = 1;
    } else if (newHash[element] !== undefined) {
      const nhElement = newHash[element];
      newHash[element] = nhElement + 1;
    } else if (newHash[element] === undefined) {
      newHash[element] = 1;
    }
    debugger;
  });
  debugger
  const keys = Object.keys(newHash);
  const newKeys = keys.map((element => {
    return parseInt(element);
  }))
  debugger
  return newKeys.length;
};

const EventScreen = ({ route, navigation }) => {
  const [date, setDate] = useState("");
  const [owner, setOwner] = useState("");

  // fetchEvents();
  const answer = removeDuplicates([1, 1, 2]);

  debugger;

  return (
    <ScrollView style={styles.container}>
      <Text>{route.params.eventId}</Text>
      <Text style={styles.paddedText}>{date}</Text>
      <Text style={styles.title}>Union ReUnion</Text>
      <Text style={styles.subtitle}>Game On Fenway</Text>

      <Text style={styles.paddedText}>Private event by {owner}</Text>
      <Text style={styles.paddedText}>Game On Fenway</Text>
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
