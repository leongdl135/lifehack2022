import * as React from "react";
import { Text, View, StyleSheet, FlatList, Image } from "react-native";
import LottieView from "lottie-react-native";

export default function AppointmentScreen({ route }) {
  const { evidence } = route.params;
  const { organisations } = route.params;
  function renderReport({ item }) {
    return (
      <View style={styles.listRecords}>
        <Text style={styles.question}>{item.question}</Text>
        <Text style={styles.textReport}>{item.answer}</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <LottieView
        style={styles.tick}
        source={require("../assets/lottie-tick.json")}
        autoPlay
      />
      <Text style={styles.textGeneral}> Your application has been sent to</Text>
      <Text style={{ fontSize: 20, lineHeight: 40, fontWeight: "bold" }}>
        {organisations}
      </Text>
      <Text></Text>
      <Text style={styles.textGeneral}>Thank you for volunteering with:</Text>
      <Image
        style={styles.logo}
        source={require("../assets/volunteerconnect.png")}
      />
      <Text style={styles.textReport}>
        A confirmation has been sent to your email. Have a great day!
      </Text>
      <Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100,
    paddingBottom: 2,
    paddingLeft: 2,
    paddingRight: 2,
    marginBottom: 5,
    backgroundColor: "white",
  },
  question: {
    fontWeight: "bold",
    fontSize: 18,
  },
  list: {
    width: "100%",
  },
  listRecords: {
    height: 70,
    justifyContent: "center",
    paddingLeft: 30,
  },
  queueNumber: {
    fontSize: 100,
    color: "#A491D3",
  },
  textGeneral: {
    fontSize: 20,
    lineHeight: 40,
  },
  textReport: {
    fontSize: 18,
    width: "80%",
    lineHeight: 40,
  },
  organisation: {
    fontSize: 30,
    fontWeight: "bold",
  },
  circle: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderColor: "#A491D3",
    width: 200,
    height: 200,
    borderRadius: 500,
    borderWidth: 5,
    margin: 20,
  },
  logo: {
    width: 200,
    height: 200,
  },
  tick: {
    width: 100,
    height: 100,
  },
});
