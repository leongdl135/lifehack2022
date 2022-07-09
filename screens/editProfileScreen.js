import React from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";

export default function EditProfileScreen({ navigation }) {
  var newProfile = {
    name: "",
    age: "",
    sex: "",
    nationality: "",
    race: "",
    dob: "",
    email: "",
    homenumber: "",
    mobilenumber: "",
    address: "",
    interests: "",
    availability: "",
  };

  return (
    <ScrollView style={styles.profilePrompts}>
      <Text style={styles.text}>Name (full name as shown in NRIC):</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => {
          newProfile.name = text;
        }}
      />
      <Text style={styles.text}>Age:</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => {
          newProfile.age = text;
        }}
      />
      <Text style={styles.text}>Sex (Male/Female):</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => {
          newProfile.sex = text;
        }}
      />
      <Text style={styles.text}>Nationality:</Text>
      <TextInput
        style={styles.textInput}
        keyboardType="numeric"
        onChangeText={(text) => {
          newProfile.nationality = text;
        }}
        
      />
      <Text style={styles.text}>Race:</Text>
      <TextInput
        style={styles.textInput}
        keyboardType="numeric"
        onChangeText={(text) => {
          newProfile.race = text;
        }}
        
      />
      <Text style={styles.text}>Date of Birth (DD/MM/YYYY):</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => {
          newProfile.dob = text;
        }}
        maxLength={10}
      />
      <Text style={styles.text}>Email:</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => {
          newProfile.email = text;
        }}
      />
      <Text style={styles.text}>Homenumber:</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => {
          newProfile.homenumber = text;
        }}
      />
      <Text style={styles.text}>mobilenumber:</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => {
          newProfile.mobilenumber = text;
        }}
      />
      <Text style={styles.text}>Address</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => {
          newProfile.address = text;
        }}
      />
      <Text style={styles.text}>Interests</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => {
          newProfile.interests = text;
        }}
      />
      <Text style={styles.text}>Availability (Days/Time):</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => {
          newProfile.availability = text;
        }}
      />
      <Text></Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("Profile", { newProfile });
        }}
      >
        <Text style={{ textAlign: "center", fontSize: 20, color: "#eb637a" }}>
          Submit
        </Text>
      </TouchableOpacity>
      <Text></Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Text style={{ textAlign: "center", fontSize: 20, color: "#eb637a" }}>
          Cancel
        </Text>
      </TouchableOpacity>
      <Text>{"\n\n"}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  profilePrompts: {
    paddingTop: 30,
    flex: 1,
    paddingLeft: 30,
  },
  textInput: {
    borderColor: "black",
    borderRadius: 10,
    padding: 7,
    backgroundColor: "white",
    marginTop: 3,
    width: "92%",
  },
  button: {
    width: "60%",
    marginTop: 5,
    marginBottom: 5,
    paddingLeft: "31%",
  },
  text: {
    paddingTop: 17,
    paddingBottom: 2,
    fontSize: 17,
  },
});
