import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderHome from '../../components/utilis/HeaderHome';
import { View } from '../../components/Themed';
import { horizontalScale, moderateScale } from '../../Utilis/metrics';
import { Dimensions, useColorScheme } from 'react-native';
import TabPageItem from '../../components/utilis/TabPageItem';
import useToggleStore from '../../store/preference';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AllGroups from './page/allGroups';
import MyGroups from './page/myGroups';
import Colors from '../../constants/Colors';

const Index = () => {
  const { primaryColour } = useToggleStore((state) => state);
  const colorScheme = useColorScheme();
  const Tab = createMaterialTopTabNavigator();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors[colorScheme ?? 'light'].background }}>
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
            name="Touts les groupes"
            component={AllGroups}
            options={{
              tabBarLabel({ focused, children }) {
                return <TabPageItem children={children} focused={focused} />;
              },
            }}
          />

          <Tab.Screen
            name="Mes groupes"
            component={MyGroups}
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
export default Index;
