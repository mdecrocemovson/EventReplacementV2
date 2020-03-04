import * as React from "react";
import { Platform, StyleSheet, Text, View, Picker } from "react-native";

const styles = StyleSheet.create({
  responses: {
    paddingLeft: 14,
    flex: 1,
    flexDirection: "row",
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#808000"
  },
  text: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  title: {
    paddingBottom: 5,
    paddingTop: 10
  }
});

export default function Responses() {
  return (
    <View>
      <View style={styles.title}>
        <Text style={styles.title}>Responses</Text>
      </View>
      <View style={styles.responses}>
        <Text style={styles.text}>Went </Text>
        <Text style={styles.number}> 12</Text>
        <Text style={styles.text}>Maybe </Text>
        <Text style={styles.number}> 0</Text>
        <Text style={styles.text}>Invited </Text>
        <Text style={styles.number}> 38</Text>
      </View>
    </View>
  );
}
