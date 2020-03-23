import React, { useState, useEffect } from "react";
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button
} from "react-native-elements";
import { View, Form, TextInput, StyleSheet, Input, Alert } from "react-native";
import { useForm } from "react-hook-form";
import { createEvent } from "../components/event_services";
import DateTimePicker from "@react-native-community/datetimepicker";

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    flexDirection: "column"
  },
  input: {
    padding: 20
  }
});

const CreateEventScreen = ({ navigation }) => {
  const { register } = useForm();
  const [showAlert, setShowAlert] = useState(false);
  const [eventName, setEventName] = useState("");
  const [eventOwner, setEventOwner] = useState("");
  const [eventLocation, setLocation] = useState("");
  const [eventDescription, setDescription] = useState("");
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");

  const handleSubmit = payload => {
    createEvent(payload)
      .then(response => {
        debugger;
        if (response.ok) {
          return response;
        }
      })
      .then(response => {
        debugger;
        return response.json();
      })
      .then(body => {
        debugger;
        navigation.navigate("Event", {
          eventId: body.id
        });
        debugger;
        console.log("did this get here?");
      })
      .catch(error => {
        console.error("error: ", error);
      });
  };
  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        type="text"
        placeholder="Enter the name of the event"
        name="Event name"
        onChangeText={text => setEventName(text)}
        ref={register({ required: true, maxLength: 80 })}
      />
      <TextInput
        style={styles.input}
        type="text"
        placeholder="First name"
        name="First name"
        onChangeText={text => setEventOwner(text)}
        ref={register({ required: true, maxLength: 80 })}
      />
      <TextInput
        style={styles.input}
        type="text"
        placeholder="Give a place for the event"
        name="location"
        onChangeText={text => setLocation(text)}
        ref={register({ required: true, maxLength: 80 })}
      />
      <TextInput
        style={styles.input}
        type="text"
        placeholder="Enter a description"
        name="description"
        onChangeText={text => setDescription(text)}
        ref={register({ required: true, maxLength: 80 })}
      />
      {Platform.OS === "android" ||
        (Platform.OS === "ios" && (
          <DateTimePicker
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            value={date}
            mode={mode}
            onChange={(selectedDate) => setDate(selectedDate)}
            is24Hour={true}
            display="default"
          />
        ))}
      <Button
        title="Submit"
        onPress={() =>
          handleSubmit({
            event: { eventName, eventDate, eventOwner, eventLocation, eventDescription }
          })
        }
      />
    </View>
  );
};

export default CreateEventScreen;
