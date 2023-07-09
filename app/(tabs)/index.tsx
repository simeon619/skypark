import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Image } from 'expo-image';
import { useRootNavigationState, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, TextInput, TouchableOpacity, useColorScheme, useWindowDimensions } from 'react-native';
import Animated, { SharedTransition, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons } from '../../Utilis/data';
import { horizontalScale, moderateScale, shadow, verticalScale } from '../../Utilis/metrics';
import { TextThin } from '../../components/StyledText';
import { ScrollView, View } from '../../components/Themed';
import SurveyForm from '../../components/form/SurveyForm';
import DefaultForm from '../../components/form/defaultForm';
import TabPageItem from '../../components/utilis/TabPageItem';
import Colors from '../../constants/Colors';
import { formTextPlaceholder, MEDIUM_PIC_USER, SMALL_PIC_USER } from '../../constants/Value';
import useToggleStore, { useTypeForm } from '../../store/preference';
import Neighbor from '../pagePost/Neighbor';
import CieGestion from '../pagePost/CieGestion';

const home = () => {
  const { width } = useWindowDimensions();
  const colorScheme = useColorScheme();
  const route = useRouter();
  const navigationState = useRootNavigationState();

  useEffect(() => {
    if (navigationState?.key) {
      // route.replace('register/Login');
    }
  }, [navigationState?.key]);
  const isExpanded = useSharedValue(false);

  const { primaryColour } = useToggleStore((state) => state);

  const { IconName, switchForm } = useTypeForm((state) => state);

  const Tab = createMaterialTopTabNavigator();
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <StatusBar backgroundColor={primaryColour} style={'light'} />
      <View
        style={{
          width,
          backgroundColor: primaryColour,
          // backgroundColor: "blue",
          paddingHorizontal: horizontalScale(10),
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: verticalScale(5),
        }}
      >
        <Image
          source={require('../../assets/icon/menu.png')}
          style={{
            height: moderateScale(28),
            aspectRatio: 1,
            marginTop: 3,
            tintColor: Colors[colorScheme ?? 'light'].overLay,
            transform: [{ rotate: '180deg' }],
            // backgroundColor: "red",
          }}
          transition={200}
        />
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            height: moderateScale(28),
            borderBottomWidth: 1,
            gap: horizontalScale(10),
            paddingBottom: verticalScale(5),
            marginHorizontal: horizontalScale(15),
            borderBottomColor: Colors[colorScheme ?? 'light'].overLay,
            backgroundColor: primaryColour,
          }}
        >
          <Image
            source={require('../../assets/icon/search.png')}
            style={{
              width: moderateScale(22),
              aspectRatio: 1,
              tintColor: Colors[colorScheme ?? 'light'].overLay,

              // backgroundColor: "red",
            }}
            transition={200}
          />
          <TextThin
            style={{
              color: Colors[colorScheme ?? 'light'].overLay,
              fontSize: moderateScale(16),
            }}
          >
            Search
          </TextThin>
        </View>
        <TouchableOpacity
          onPress={() => {
            route.push({ pathname: 'profile', params: { tag: '1' } });
          }}
        >
          <Animated.Image
            style={{
              width: moderateScale(SMALL_PIC_USER),
              aspectRatio: 1,
              borderRadius: SMALL_PIC_USER / 2,
            }}
            source={{ uri: 'https://picsum.photos/seed/696/3000/2000' }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          paddingBottom: horizontalScale(0),
          backgroundColor: Colors[colorScheme ?? 'light'].background,
        }}
      >
        <ScrollView
          // horizontal={true}
          style={{ paddingVertical: verticalScale(15) }}
          contentContainerStyle={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}
        >
          {icons.map((icon, index) => (
            <TouchableOpacity key={index} onPress={() => switchForm(icon.name)}>
              {
                <Image
                  source={icon.url}
                  style={{
                    width: 27,
                    aspectRatio: 1,
                    tintColor: IconName === icon.name ? primaryColour : '#000000',
                  }}
                  transition={200}
                />
              }
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
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
