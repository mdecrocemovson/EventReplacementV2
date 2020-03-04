import * as React from "react";
import { Platform, StyleSheet, Text, View, ScrollView } from "react-native";
import { Button } from "react-native-elements";
import * as WebBrowser from "expo-web-browser";
import RSVP from './components/rsvp';
import Posts from './components/posts';
import Responses from './components/responses';

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

export default function HomeScreen() {
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
    
    </ScrollView>
  );
}

HomeScreen.navigationOptions = {
  header: null
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use
        useful development tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    "https://docs.expo.io/versions/latest/workflow/development-mode/"
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    "https://docs.expo.io/versions/latest/get-started/create-a-new-app/#making-your-first-change"
  );
}
