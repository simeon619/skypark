import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useRootNavigationState } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Dimensions, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { horizontalScale, moderateScale } from '../../Utilis/metrics';
import { View } from '../../components/Themed';
import TabPageItem from '../../components/utilis/TabPageItem';
import useToggleStore from '../../store/preference';
import Neighbor from '../pagePost/Neighbor';
import CieGestion from '../pagePost/CieGestion';
import HeaderHome from '../../components/utilis/HeaderHome';
import Colors from '../../constants/Colors';

const home = () => {
  const navigationState = useRootNavigationState();

  useEffect(() => {
    if (navigationState?.key) {
      // route.replace('register/Login');
    }
  }, [navigationState?.key]);

  const { primaryColour } = useToggleStore((state) => state);
  const colorScheme = useColorScheme();
  const Tab = createMaterialTopTabNavigator();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors[colorScheme ?? 'light'].background,
      }}
    >
      <StatusBar backgroundColor={primaryColour} style={'light'} />
      <HeaderHome />
      <View style={{ flex: 1, paddingHorizontal: horizontalScale(10) }}>
        <Tab.Navigator
          initialRouteName="Buildind"
          backBehavior="order"
          initialLayout={{
            width: Dimensions.get('window').width,
          }}
          screenOptions={{
            // tabBarGap: horizontalScale(25),
            tabBarScrollEnabled: true,
            tabBarStyle: {
              backgroundColor: '#fff',
            },
            tabBarIndicatorStyle: {
              backgroundColor: primaryColour,
            },
            tabBarItemStyle: {
              width: 'auto',
              height: 'auto',
              alignItems: 'flex-start',
            },
            tabBarLabelStyle: {
              fontSize: 80,
              height: moderateScale(7),
              fontFamily: 'Thin',
              textTransform: 'capitalize',
            },
          }}
        >
          <Tab.Screen
            name="Tous les voisins"
            component={Neighbor}
            options={{
              tabBarLabel({ focused, children }) {
                return <TabPageItem children={children} focused={focused} />;
              },
            }}
          />

          <Tab.Screen
            name="Compagnie de gestions"
            component={CieGestion}
            options={{
              tabBarLabel({ focused, children }) {
                return <TabPageItem children={children} focused={focused} />;
              },
            }}
          />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
};

export default React.memo(home);
