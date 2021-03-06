import React, { useState, useEffect } from "react";
import { Button } from "react-native-elements";
import {
  View,
  ScrollView,
  TextInput,
  StyleSheet,
  Platform,
  Image
} from "react-native";
import { useForm } from "react-hook-form";
import { editEvent } from "../components/event_services";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    flexDirection: "column",
    padding: 50
  },
  input: {
    padding: 20
  },
  image: {
    height: 300,
    width: 300
  },
  imageContainer: {
    flex: 1,
    textAlign: "center",
    justifyContent: "center",
    padding: 20
  },
  button: {
    width: 200,
    justifyContent: "center"
  }
});

const EditEventScreen = ({ navigation }) => {
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

  const handleSubmit = (payload, id) => {
    editEvent(payload, id)
      .then(response => {
        if (response.ok) {
          return response;
        }
      })
      .then(response => {
        return response.json();
      })
      .then(body => {
        navigation.navigate("Event", {
          eventId: body.id
        });
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
      setEventCoverImage(result.uri);
    }
  };
  const doesImageExist = eventCoverImage !== null && eventCoverImage !== "";
  return (
    <ScrollView style={styles.formContainer}>
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
      <Button
        style={styles.button}
        title="Add Cover Image"
        onPress={() => pickImage()}
      />
      {doesImageExist && (
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: eventCoverImage }} />
        </View>
      )}
      <Button
        style={styles.button}
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
    </ScrollView>
  );
};

export default EditEventScreen;
