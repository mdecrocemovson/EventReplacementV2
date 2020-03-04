import * as React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Button, Divider } from "react-native-elements";
import * as WebBrowser from "expo-web-browser";

const styles = StyleSheet.create({
  paddedText: {
    padding: 15
  }, 
  title: {
    fontSize: 25,
    padding: 15,
    textAlign: 'center'
  },
  divider: {
    backgroundColor: 'blue',
  },
})

export default function Posts() {
  return (
    <View>
      <Text style={styles.title}>Posts</Text>
      <Divider style={styles.divider}/>
      <Text style={styles.paddedText}>Dad? is taht you? </Text>
    </View>
  );
}
