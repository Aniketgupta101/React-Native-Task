# React Native Project Setup

This guide provides step-by-step instructions to set up and run the React Native project.

## Prerequisites
Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Android Studio](https://developer.android.com/studio) (for emulator)
- `adb` command-line tool (comes with Android Studio or can be installed separately)

---

## Steps to Set Up and Run the Project

### Step 1: Install Required Packages

1. Install `expo-modules-core` (try both commands if one fails):
   ```bash
   expo install expo-modules-core
   npm install expo-modules-core
   ```

2. Install additional dependencies:
   ```bash
   npm install expo-document-picker
   npm install react-native-toast-message
   npm install react-native-youtube-iframe
   npm install @react-native-community/slider
   npm install react-native-document-picker
   npm install react-native-fs
   ```

3. *(Optional)* Install `expo-file-system` if required:
   ```bash
   expo install expo-file-system
   ```

4. *(Optional)* Reinstall `expo-document-picker` if necessary:
   ```bash
   expo install expo-document-picker
   ```

### Step 2: Install Project Dependencies

Move into the project directory and run:
```bash
npm install
```

### Step 3: Check Device Connectivity

1. Connect your mobile device via USB or launch the Android Studio Emulator.
2. Verify the connection using the following command:
   ```bash
   adb devices
   ```
   Ensure your device appears in the list of connected devices.

### Step 4: Run the Project

1. Start the project on an Android device:
   ```bash
   npm run android
   ```
2. **Note:** The first build may take some time. Be patient.

---

## Troubleshooting

- **Device Not Detected:**
  - Ensure USB debugging is enabled on your device.
  - Run `adb kill-server` followed by `adb start-server`.
  - Check your USB connection.

- **Package Installation Errors:**
  - Clear the npm cache:
    ```bash
    npm cache clean --force
    ```
  - Delete `node_modules` and reinstall:
    ```bash
    rm -rf node_modules package-lock.json
    npm install
    ```

- **Build Errors:**
  - Check the Expo and React Native documentation for common issues.

---

## Additional Notes

- The dependencies `expo-file-system` and `react-native-fs` are optional and may not be used in this project.
- Make sure to keep all tools and dependencies updated for smooth development.

---
