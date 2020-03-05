import * as React from "react";
import Responses from '../components/responses';
import RSVP from '../components/rsvp';
import Posts from '../components/posts';
import { Platform, StyleSheet, Text, View, ScrollView, Button } from "react-native";

const styles = StyleSheet.create({
  paddedText: {
    padding: 15
  },
  container: {
    backgroundColor: '#db7093',
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


const HomeScreen = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paddedText}>Your events!</Text>
      <Button 
        title="Go to next screen"
        onPress={() => navigation.navigate('Event')}
        />
    </ScrollView>
  )
}

export default HomeScreen;
