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


const EventScreen = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paddedText}>Sat, Feb 29th -- 4pm</Text>
      <Text style={styles.title}>Union ReUnion</Text>
      <Text style={styles.subtitle}>Game On Fenway</Text>

      <Text style={styles.paddedText}>Private event by Jenna Grace</Text>
      <Text style={styles.paddedText}>Game On Fenway</Text>
      <Text style={styles.paddedText}>
        82 Landsdowne street, Boston, Mass 02215
      </Text>
      <Button 
        title="Go to next screen"
        onPress={() => navigation.navigate('Next')}
        />


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

      <Posts/>

      <RSVP/>

      <Button
        title="Go back"
        onPress={() => navigation.goBack()}
        />
      
    
    </ScrollView>
  )
}

export default EventScreen;
