import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const UserScreen = ({ users = [] }) => {
  const [index, setIndex] = useState(0);
  const [userData, setUserData] = useState(users.length > 0 ? users[0] : {});

  const handleNext = () => {
    if (index < users.length - 1) {
      setIndex(index + 1);
      setUserData(users[index + 1]);
    }
  };

  const handlePrevious = () => {
    if (index > 0) {
      setIndex(index - 1);
      setUserData(users[index - 1]);
    }
  };

  if (users.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No user data available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* User Avatar */}
        <Image source={{ uri: userData.avatar }} style={styles.avatar} />

        {/* User Profile Header */}
        <Text style={styles.header}>{userData.username}</Text>

        {/* User Details */}
        <View style={styles.infoContainer}>
          {/* First Name & Last Name in One Row */}
          <View style={styles.row}>
            <View style={styles.halfField}>
              <Text style={styles.label}>First Name</Text>
              <View style={styles.inputContainer}>
                <FontAwesome name="user" size={20} color="#555" />
                <TextInput
                  style={styles.input}
                  value={userData.first_name}
                  onChangeText={(text) => setUserData({ ...userData, first_name: text })}
                />
              </View>
            </View>

            <View style={styles.halfField}>
              <Text style={styles.label}>Last Name</Text>
              <View style={styles.inputContainer}>
                <FontAwesome name="user" size={20} color="#555" />
                <TextInput
                  style={styles.input}
                  value={userData.last_name}
                  onChangeText={(text) => setUserData({ ...userData, last_name: text })}
                />
              </View>
            </View>
          </View>

          {/* Username - Full Width */}
          <View style={styles.fullField}>
            <Text style={styles.label}>Username</Text>
            <View style={styles.inputContainer}>
              <FontAwesome name="user" size={20} color="#555" />
              <TextInput
                style={styles.input}
                value={userData.username}
                onChangeText={(text) => setUserData({ ...userData, username: text })}
              />
            </View>
          </View>

          {/* Email - Full Width */}
          <View style={styles.fullField}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputContainer}>
              <MaterialIcons name="email" size={20} color="#555" />
              <TextInput
                style={styles.input}
                value={userData.email}
                keyboardType="email-address"
                onChangeText={(text) => setUserData({ ...userData, email: text })}
              />
            </View>
          </View>

          {/* Password - Full Width */}
          <View style={styles.fullField}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputContainer}>
              <AntDesign name="lock" size={20} color="#555" />
              <TextInput
                style={styles.input}
                value={userData.password}
                secureTextEntry
                onChangeText={(text) => setUserData({ ...userData, password: text })}
              />
            </View>
          </View>

          {/* ID & UID in One Row */}
          <View style={styles.row}>
            <View style={styles.halfField}>
              <Text style={styles.label}>ID</Text>
              <View style={styles.inputContainer}>
                <AntDesign name="idcard" size={20} color="#555" />
                <TextInput style={styles.input} value={String(userData.id)} editable={false} />
              </View>
            </View>

            <View style={styles.halfField}>
              <Text style={styles.label}>UID</Text>
              <View style={styles.inputContainer}>
                <FontAwesome name="user-secret" size={20} color="#555" />
                <TextInput style={styles.input} value={userData.uid} editable={false} />
              </View>
            </View>
          </View>
        </View>

        {/* Navigation Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, index === 0 && styles.disabledButton]}
            onPress={handlePrevious}
            disabled={index === 0}
          >
            <Text style={styles.buttonText}>⬅ Previous</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, index === users.length - 1 && styles.disabledButton]}
            onPress={handleNext}
            disabled={index === users.length - 1}
          >
            <Text style={styles.buttonText}>Next ➡</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

// ✅ **Updated Styling**
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFC",
    alignItems: "center",
  },
  scrollContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    marginBottom: 15,
    borderWidth: 4,
    borderColor: "black",
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "blue",
  },
  infoContainer: {
    width: "90%",
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 20,
    elevation: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfField: {
    width: "48%",
  },
  fullField: {
    width: "100%",
    marginTop: 10,
  },
  label: {
    fontSize: 14,
    color: "black",
    fontWeight: "bold",
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F3F5",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 50,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "85%",
    marginTop: 20,
  },
  button: {
    flex: 1,
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
  },
  disabledButton: {
    backgroundColor: "#A0A0A0",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default UserScreen;
