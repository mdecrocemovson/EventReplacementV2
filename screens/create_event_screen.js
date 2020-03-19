import React, { useState, useEffect } from "react";
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button
} from "react-native-elements";
import { View, Form, TextInput, StyleSheet } from "react-native";
import { useForm } from "react-hook-form";
import { createEvent } from '../components/event_services';

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    flexDirection: "column"
  },
  input: {
    padding: 20
  }
});

const CreateEventScreen = () => {
  const { register } = useForm();
  const onSubmit = () => {
    console.log("onsubmit");
  };
  const [eventName, setEventName] = useState('');
  const [eventOwner, setEventOwner] = useState('');
  const [eventLocation, setLocation] = useState('');
  const [eventDescription, setDescription] = useState('');

  const handleSubmit = payload => {
    event.preventDefault();
    createEvent(payload)
    .then(response => {
      if(response.ok) {
        return response;
      }
    })
    .then(response => {
      return response.json();
    })
    .then(body => {
      debugger;
    })
    .catch(error => {
      console.error("error: ", error);
    });
  }
  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        type="text"
        placeholder="Enter the name of the event"
        name="Event name"
        onChangeText={(text) => setEventName(text)}
        ref={register({ required: true, maxLength: 80 })}
      />
      <TextInput
        style={styles.input}
        type="text"
        placeholder="First name"
        name="First name"
        onChangeText={(text) => setEventOwner(text)}
        ref={register({ required: true, maxLength: 80 })}
      />
      <TextInput
        style={styles.input}
        type="text"
        placeholder="Give a place for the event"
        name="location"
        onChangeText={(text) => setLocation(text)}
        ref={register({ required: true, maxLength: 80 })}
      />
      <TextInput
        style={styles.input}
        type="text"
        placeholder="Enter a description"
        name="description"
        onChangeText={(text) => setDescription(text)}
        ref={register({ required: true, maxLength: 80 })}
      />
      <Button title='Submit' onPress={() => handleSubmit({event: {eventName, eventOwner, eventLocation, eventDescription}})}/>
    </View>
  );
};

export default CreateEventScreen;
