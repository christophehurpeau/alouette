import {
  Sora_700Bold as SoraBold,
  Sora_800ExtraBold as SoraExtraBold,
  Sora_400Regular as SoraRegular,
  useFonts,
} from "@expo-google-fonts/sora";
import { StyleSheet, Text, View } from "react-native";
import { StorybookUIRoot } from "../.rnstorybook";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export function App() {
  const [fontsLoaded, errorFonts] = useFonts({
    SoraRegular,
    SoraBold,
    SoraExtraBold,
  });
  if (errorFonts) {
    throw errorFonts;
  }
  if (!fontsLoaded) {
    return null;
  }

  if (process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === "true") {
    return <StorybookUIRoot />;
  }
  return (
    <View style={styles.container}>
      <Text>EXPO_PUBLIC_STORYBOOK_ENABLED is not enabled</Text>
    </View>
  );
}
