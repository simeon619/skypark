import { TouchableOpacity, useColorScheme, useWindowDimensions, View } from 'react-native';
import React from 'react';
import { horizontalScale, moderateScale, verticalScale } from '../../Utilis/metrics';
import { Image } from 'expo-image';
import Colors from '../../constants/Colors';
import { TextThin } from '../StyledText';
import Animated from 'react-native-reanimated';
import { SMALL_PIC_USER } from '../../constants/Value';
import { ScrollView } from '../Themed';
import { icons } from '../../Utilis/data';
import { useRouter } from 'expo-router';
import useToggleStore, { useTypeForm } from '../../store/preference';

const HeaderHome = () => {
  const { width } = useWindowDimensions();
  const colorScheme = useColorScheme();
  const { primaryColourLight, primaryColour } = useToggleStore((state) => state);
  const { IconName, switchForm } = useTypeForm((state) => state);
  const route = useRouter();
  return (
    <>
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
    </>
  );
};
export default HeaderHome;
