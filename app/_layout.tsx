import {
  Poppins_100Thin as Thin,
  Poppins_100Thin_Italic as ThinItalic,
  Poppins_200ExtraLight as ExtraLight,
  Poppins_200ExtraLight_Italic as ExtraLightItalic,
  Poppins_300Light as Light,
  Poppins_300Light_Italic as LightItalic,
  Poppins_400Regular as Regular,
  Poppins_400Regular_Italic as RegularItalic,
  Poppins_500Medium as Medium,
  Poppins_500Medium_Italic as MediumItalic,
  Poppins_600SemiBold as SemiBold,
  Poppins_600SemiBold_Italic as SemiBoldItalic,
  Poppins_700Bold as Bold,
  Poppins_700Bold_Italic as BoldItalic,
  Poppins_800ExtraBold as ExtraBold,
  Poppins_800ExtraBold_Italic as ExtraBoldItalic,
  Poppins_900Black as Black,
  Poppins_900Black_Italic as BlackItalic,
} from '@expo-google-fonts/poppins';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { MenuProvider } from 'react-native-popup-menu';

import * as Font from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { useColorScheme, View } from 'react-native';
import { KeyboardProvider } from 'react-native-keyboard-controller';

export { ErrorBoundary } from 'expo-router';

export default function RootLayout() {
  SplashScreen.preventAutoHideAsync();
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // load fonts, make any API calls you need to do here
        await Font.loadAsync({
          SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
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
        });
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  return (
    <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
      {appIsReady && <RootLayoutNav />}
    </View>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <KeyboardProvider>
          <MenuProvider>
            <Stack screenOptions={{}}>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen
                name="modal/FormViewerImage"
                options={{
                  presentation: 'transparentModal',
                  headerShown: false,
                  animation: 'fade_from_bottom',
                  customAnimationOnGesture: true,
                }}
              />
              <Stack.Screen
                name="profile/index"
                options={{
                  presentation: 'modal',
                  headerShown: false,
                  animation: 'default',
                }}
              />
              <Stack.Screen
                name="register/Login"
                options={{
                  headerShown: false,
                  animation: 'simple_push',
                }}
              />
              <Stack.Screen
                name="register/Signup"
                options={{
                  presentation: 'card',
                  headerShown: false,
                  animation: 'simple_push',
                }}
              />
              <Stack.Screen
                name="modal/discussion"
                options={{
                  presentation: 'card',
                  headerShown: false,
                  animation: 'slide_from_right',
                }}
              />
              <Stack.Screen
                name="settings/CheckProfile"
                options={{
                  presentation: 'card',
                  headerShown: false,
                  animation: 'simple_push',
                }}
              />
              <Stack.Screen
                name="groupActivity/index"
                options={{
                  presentation: 'card',
                  headerShown: false,
                  animation: 'simple_push',
                }}
              />
            </Stack>
          </MenuProvider>
        </KeyboardProvider>
      </ThemeProvider>
    </>
  );
}
