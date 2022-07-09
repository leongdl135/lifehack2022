import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function QuestionScreen({ route, navigation }) {
  const { organisations } = route.params;
  const questions = [
    {
      title: "Have you had any prior volunteering experience?",
      options: [
        { name: "A few times", key: "1" },
        { name: "A few months", key: "2" },
        { name: "More than a year", key: "3" },
      ],
    },
    {
      title: "How long are you able to commit to volunteering?",
      options: [
        { name: "A few sessions", key: "1" },
        { name: "A few months", key: "2" },
        { name: "A year and beyond", key: "3" },
      ],
    },
  ];
  const [evidence, setEvidence] = useState([]);
  const [question, setQuestion] = useState(questions[0]);
  const [options, setOptions] = useState(questions[0].options);
  const [questionNum, setQuestionNum] = useState(0);

  const setNextQuestion = (answer) => {
    let currentEvidence = evidence;
    currentEvidence.push({
      question: question.title,
      id: questionNum.toString(),
      answer: answer,
    });
    setEvidence(currentEvidence);
    let n = questionNum;
    n = n + 1;
    setQuestionNum(n);
    setQuestion(questions[n]);
    setOptions(questions[n].options);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Text style={styles.questionTitle}>{question.title}</Text>
      {options.map((option) => {
        return (
          <View key={option.key}>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => {
                if (questionNum < 1) {
                  setNextQuestion(option.name);
                } else {
                  evidence.push({
                    question: question.title,
                    id: (questionNum + 1).toString(),
                    answer: option.name,
                  });
                  navigation.navigate("AppointmentScreen", {
                    evidence,
                    organisations,
                  });
                }
              }}
            >
              <Text style={styles.optionText}>{option.name}</Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    // fontFamily: "Roboto",
    color: "gray",
  },
  questionTitle: {
    fontSize: 32,
    padding: 12,
    fontWeight: "bold",
    // fontFamily: "Roboto",
    textAlign: "center",
  },
  optionButton: {
    width: 300,
    marginTop: 20,
    backgroundColor: "#eb637a",
    padding: 15,
    borderRadius: 50,
  },
  optionText: {
    color: "white",
    fontSize: 16,
    justifyContent: "center",
    textAlign: "center",
    // fontFamily: "Roboto",
  },
});