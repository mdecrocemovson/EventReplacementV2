import * as React from "react";
import {useState} from 'react';
import { Platform, StyleSheet, Text, View, Picker } from "react-native";
import { Button } from "react-native-elements";
import * as WebBrowser from "expo-web-browser";

export default function RSVP() {
  const [attending, setAttending] = useState(1);
  return (
    <View>
      <Picker
        selectedValue={attending}
        style={{ height: 50, width: 300 }}
        onValueChange={(itemValue) =>
          setAttending(itemValue)
        }
      >
        <Picker.Item label="Going" value={0} />
        <Picker.Item label="Undecided" value={1} />
        <Picker.Item label="Not going" value={2} />
      </Picker>
      
    </View>
  );
}
