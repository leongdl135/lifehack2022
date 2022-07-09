import React, { useState } from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";
import SearchDropDown from "../shared/SearchDropDown";
import Quiz from "../shared/quiz";

export default function SkillsScreen({ navigation, route }) {
  const { selectedName } = route.params;
  const [dataSource] = useState([
    "Art & Craft",
    "Befriending",
    "Coaching",
    "Counselling",
    "Emcee",
    "Entrepreneurship",
    "Event Management",
    "First Aid",
    "Graphic Design",
    "Language Design",
    "Music",
    "Photography",
    "Public Relations",
    "Reading",
    "Sign Language",
    "Social Media",
    "Software Development",
    "Sound Engineering",
    "Sports",
    "Story Telling",
    "Tutoring",
    "Ushering",
    "Web Design",
    "Others",
    "Advertising",
    "None",
  ]);
  const [filtered, setFiltered] = useState(dataSource);
  const [searching, setSearching] = useState(false);
  const onSearch = (text) => {
    if (text) {
      setSearching(true);
      const temp = text.toLowerCase();

      const tempList = dataSource.filter((item) => {
        if (item.toLowerCase().match(temp)) return item;
      });
      setFiltered(tempList);
    } else {
      setSearching(false);
      setFiltered(dataSource);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.prompt}>What skills are you equipped with?</Text>
      </View>
      <TextInput
        style={styles.textInput}
        placeholder="Search skills"
        placeholderTextColor="lightgray"
        onChangeText={onSearch}
      />
      <Text style={styles.subheading}>
        If you have more than one, select the skill you are most proficient at!
      </Text>
      {searching && (
        <SearchDropDown
          dataSource={filtered}
          navigation={navigation}
          organisations={selectedName}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: "5%",
    flex: 1,
    paddingTop: 10,
    backgroundColor: "white",
  },
  heading: {
    width: "80%",
    paddingVertical: 14,
  },
  prompt: {
    // fontFamily: "Roboto",
    fontSize: 24,
    fontWeight: "bold",
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  subheading: {
    // fontFamily: "Roboto",
    fontSize: 16,
    width: "80%",
    paddingVertical: 10,
  },
  textInput: {
    backgroundColor: "white",
    width: "80%",
    borderRadius: 10,
    borderColor: "#eb637a",
    borderWidth: 1,
    height: 50,
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
});


