import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import * as SQLite from "expo-sqlite";
import { createStackNavigator } from "@react-navigation/stack";
import { Entypo } from "@expo/vector-icons";

import EditProfileScreen from "./editProfileScreen";

const db = SQLite.openDatabase("profile.db");

const SAMPLE_PROFILE = [
  { title: "Name", id: "0", value: "David Tan" },
  { title: "Age", id: "1", value: "21" },
  { title: "Sex", id: "2", value: "Male" },
  { title: "Nationality", id: "3", value: "Singaporean" },
  { title: "Race", id: "4", value: "Chinese" },
  { title: "Date of Birth", id: "5", value: "13/11/2000" },
  { title: "Email", id: "6", value: "davidtan123@gmail.com" },
  { title: "Home Number", id: "7", value: "64172313" },
  { title: "Mobile Number", id: "8", value: "91384103" },
  { title: "Address", id: "9", value: "Blk 32 Stuart Road, Singapore 164721" },
  { title: "Interests", id: "10", value: "Teaching, Arts & Craft" },
  { title: "Availability", id: "11", value: "Wednesday 9pm" },
];

function ProfileStackScreen({ route, navigation }) {
  const [profileInfo, setProfile] = useState(SAMPLE_PROFILE);

  function refreshProfile() {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM profile",
        [],
        (txObj, results) => {
          var len = results.rows.length;
          if (len > 0) {
            var tempProfile = SAMPLE_PROFILE;
            tempProfile[0].value = results.rows.item(0).name;
            tempProfile[1].value = results.rows.item(0).age;
            tempProfile[2].value = results.rows.item(0).sex;
            tempProfile[3].value = results.rows.item(0).nationality;
            tempProfile[4].value = results.rows.item(0).race;
            tempProfile[5].value = results.rows.item(0).dob;
            tempProfile[6].value = results.rows.item(0).email;
            tempProfile[7].value = results.rows.item(0).homenumber;
            tempProfile[8].value = results.rows.item(0).mobilenumber;
            tempProfile[9].value = results.rows.item(0).address;
            tempProfile[10].value = results.rows.item(0).interests;
            tempProfile[11].value = results.rows.item(0).availability;
            setProfile(tempProfile);
          }
        },
        (txObj, error) => console.log("Error ", error)
      );
    });
  }

  // Create the DB on first run
  useEffect(() => {
    db.transaction(
      (tx) => {
        tx.executeSql(`
        CREATE TABLE IF NOT EXISTS profile
        (id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          age TEXT,
          sex TEXT,
          nationality TEXT,
          race TEXT,
          dob TEXT,
          email TEXT,
          homenumber TEXT,
          mobilenumber TEXT,
          address TEXT,
          interests TEXT,
          availability TEXT);
          `);
      },
      null,
      refreshProfile
    );
  }, []);

  // Responds to coming back from the add screen
  useEffect(() => {
    if (route.params?.newProfile) {
      db.transaction(
        (tx) => {
          tx.executeSql(
            `INSERT INTO profile (name, age, sex,nationality,race,dob,email,homenumber,mobilenumner,address,interests,avaibility) 
             VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
              route.params.newProfile.name,
              route.params.newProfile.age,
              route.params.newProfile.sex,
              route.params.newProfile.nationality,
              route.params.newProfile.race,
              route.params.newProfile.dob,
              route.params.newProfile.email,
              route.params.newProfile.homenumber,
              route.params.newProfile.mobilenumber,
              route.params.newProfile.address,
              route.params.newProfile.interests,
              route.params.newProfile.availability,
            ]
          );
        },
        null,
        refreshProfile
      );
      console.log(route.params.newProfile);
    }
  }, [route.params?.newProfile]);

  // Edit button at top right
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate("Edit Profile")}>
          <Entypo
            style={{ marginRight: 10 }}
            name="edit"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      ),
    });
  });

  function renderProfile({ item }) {
    return (
      <View style={styles.listRecords}>
        <Text style={styles.profileTitle}>{item.title}</Text>
        <Text style={styles.profileText}>{item.value}</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#eb637a",
        marginTop: -20,
      }}
    >
      <Image
        style={styles.logo}
        source={require("../assets/volunteerconnect.png")}
      />
      <Text style={styles.name}>{profileInfo[0].value}</Text>
      <View style={styles.profileContainer}>
        <FlatList
          style={styles.list}
          data={profileInfo}
          renderItem={renderProfile}
          numColumns={2}
        />
      </View>
    </View>
  );
}

const Stack = createStackNavigator();

export default function ProfileScreen() {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          headerTitle: "",
          headerTitleStyle: {
            fontSize: 20,
            textAlign: "center",
          },
          headerStyle: {
            height: 100,
            backgroundColor: "#eb637a",
            borderBottomColor: "#eb637a",
            borderBottomWidth: 1,
          },
        }}
      />
      <Stack.Screen name="Edit Profile" component={EditProfileScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
    marginTop: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  list: {
    width: "100%",
  },
  listItem: {
    height: 50,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#999",
    paddingLeft: 20,
  },
  listRecords: {
    height: 100,
    justifyContent: "center",
    paddingLeft: 20,
    margin: 4,
    width: "46%",
  },
  profileText: {
    fontSize: 26,
    borderBottomWidth: 0,
    paddingTop: 10,
    textAlign: "left",
    lineHeight: 30,
  },
  profileTitle: {
    color: "grey",
    fontSize: 18,
  },
  button: {
    width: "80%",
    marginTop: 5,
    marginBottom: 5,
  },
  buttons: {
    flex: 0,
    width: "100%",
    height: 300,
    fontSize: 200,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eb637a",
    marginBottom: 5,
  },
  logo: {
    width: 150,
    height: 150,
  },
  name: {
    fontSize: 40,
    color: "white",
    fontWeight: "bold",
    marginTop: -20,
  },
});
