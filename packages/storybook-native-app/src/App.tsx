import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

function App() {
  return (
    <View style={styles.container}>
      <Text>EXPO_PUBLIC_STORYBOOK_ENABLED is not enabled</Text>
    </View>
  );
}

export default process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === "true"
  ? // eslint-disable-next-line unicorn/prefer-module
    require("../.rnstorybook").default
  : App;
