import React, { useState, useEffect } from "react";
import { Button } from "react-native-elements";
import { View, TextInput, StyleSheet, Platform, Image } from "react-native";
import { useForm } from "react-hook-form";
import { createEvent } from "../components/event_services";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    flexDirection: "column"
  },
  input: {
    padding: 20
  },
  image: {
    height: 300,
    width: 300
  }
});

const CreateEventScreen = ({ navigation }) => {
  const { register } = useForm();
  const [showAlert, setShowAlert] = useState(false);
  const [eventName, setEventName] = useState("");
  const [eventOwner, setEventOwner] = useState("");
  const [eventLocation, setLocation] = useState("");
  const [eventDescription, setDescription] = useState("");
  const [eventCoverImage, setEventCoverImage] = useState("");
  const [eventDate, setEventDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || eventDate;
    setEventDate(currentDate);
  };

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

  const pickImage = async () => {
    // What is going on rgiht here
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    console.log(result);

    if (!result.cancelled) {
      debugger
      setEventCoverImage(result.uri);
    }
  };
  const doesImageExist = eventCoverImage !== null && eventCoverImage !== '';
  debugger;
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
            value={eventDate}
            mode={mode}
            onChange={onChangeDate}
            is24Hour={true}
            display="default"
          />
        ))}
      <Button title="Add Cover Image" onPress={() => pickImage()} />
      {doesImageExist && <Image style={styles.image} source={{ uri: eventCoverImage}} />}
      <Button
        title="Submit"
        onPress={() =>
          handleSubmit({
            event: {
              eventName,
              eventDate,
              eventOwner,
              eventLocation,
              eventDescription,
              eventCoverImage
            }
          })
        }
      />
    </View>
  );
};

export default CreateEventScreen;
