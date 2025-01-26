import React, { useState, useCallback } from "react";
import { Button, View, Alert, TextInput, StyleSheet } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import * as Notifications from "expo-notifications";
import * as Linking from "expo-linking";

export default function App() {
  const [playing, setPlaying] = useState(false);
  const [reminderTime, setReminderTime] = useState("");

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("Video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  const scheduleNotification = async () => {
    if (!reminderTime || isNaN(reminderTime)) {
      Alert.alert("Invalid Input", "Please enter a valid number for reminder time.");
      return;
    }

    const triggerTime = new Date();
    triggerTime.setMinutes(triggerTime.getMinutes() + parseInt(reminderTime));

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Reminder",
        body: "It's time to watch the video!",
        data: { screen: "VideoPage" },
      },
      trigger: triggerTime,
    });

    Alert.alert(
      "Notification Scheduled",
      `You will be reminded to watch the video in ${reminderTime} minutes.`
    );
  };

  return (
    <View style={styles.container}>
      <YoutubePlayer
        height={300}
        play={playing}
        videoId={"-o58aScxrDw"} // change this id of YouTube
        onChangeState={onStateChange}
      />
      <Button title={playing ? "Pause" : "Play"} onPress={togglePlaying} />

      <View style={styles.reminderContainer}>
        <TextInput
          style={styles.input}
          placeholder="Reminder time in minutes"
          keyboardType="numeric"
          value={reminderTime}
          onChangeText={setReminderTime}
        />
        <Button title="Set Reminder" onPress={scheduleNotification} />
      </View>
    </View>
  );
}

// Request notification permissions
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Navigate to the video page when a notification is tapped
Notifications.addNotificationResponseReceivedListener((response) => {
  const data = response.notification.request.content.data;
  if (data.screen === "explore") {
    Linking.openURL("my-app//app/explore");
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff", // Ensure light mode
  },
  reminderContainer: {
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff", // Light mode input
    color: "#000", // Ensure text is visible
  },
});