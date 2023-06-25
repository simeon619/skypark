import {
  Poppins_900Black as Black,
  Poppins_900Black_Italic as BlackItalic,
  Poppins_700Bold as Bold,
  Poppins_700Bold_Italic as BoldItalic,
  Poppins_800ExtraBold as ExtraBold,
  Poppins_800ExtraBold_Italic as ExtraBoldItalic,
  Poppins_200ExtraLight as ExtraLight,
  Poppins_200ExtraLight_Italic as ExtraLightItalic,
  Poppins_300Light as Light,
  Poppins_300Light_Italic as LightItalic,
  Poppins_500Medium as Medium,
  Poppins_500Medium_Italic as MediumItalic,
  Poppins_400Regular as Regular,
  Poppins_400Regular_Italic as RegularItalic,
  Poppins_600SemiBold as SemiBold,
  Poppins_600SemiBold_Italic as SemiBoldItalic,
  Poppins_100Thin as Thin,
  Poppins_100Thin_Italic as ThinItalic,
} from "@expo-google-fonts/poppins";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...{
      Thin,
      ThinItalic,
      ExtraLight,
      ExtraLightItalic,
      Light,
      LightItalic,
      Regular,
      RegularItalic,
      Medium,
      MediumItalic,
      SemiBold,
      SemiBoldItalic,
      Bold,
      BoldItalic,
      ExtraBold,
      ExtraBoldItalic,
      Black,
      BlackItalic,
    },
    // ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <>
      {/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
      {!loaded && <SplashScreen />}
      {loaded && <RootLayoutNav />}
    </>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: "modal" }} />
          <Stack.Screen
            name="profile/index"
            options={{
              presentation: "modal",
              headerShown: false,
              animation: "simple_push",
            }}
          />
        </Stack>
      </ThemeProvider>
    </>
  );
}
