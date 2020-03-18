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

  const handleSubmit = payload => {
    event.preventDefault();
    createEvent(payload)
    .then(response => {
      if(response.ok) {
        debugger;
        return response;
      }
    })
    .then(response => {
      debugger;
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
        ref={register({ required: true, maxLength: 80 })}
      />
      <TextInput
        style={styles.input}
        type="text"
        placeholder="First name"
        name="First name"
        ref={register({ required: true, maxLength: 80 })}
      />
      <TextInput
        style={styles.input}
        type="text"
        placeholder="Give a place for the event"
        name="location"
        ref={register({ required: true, maxLength: 80 })}
      />
      <TextInput
        style={styles.input}
        type="text"
        placeholder="Enter a description"
        name="description"
        ref={register({ required: true, maxLength: 80 })}
      />
      <Button title='Submit' onPress={() => handleSubmit({error: ''})}/>
    </View>
  );
};

export default CreateEventScreen;
