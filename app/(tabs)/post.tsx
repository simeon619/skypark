import React, { useCallback, useState } from 'react';
import { useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from '../../components/Themed';
import Colors from '../../constants/Colors';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { horizontalScale, moderateScale, shadow, verticalScale } from '../../Utilis/metrics';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Image } from 'expo-image';
import { MEDIUM_PIC_USER, formTextPlaceholder } from '../../constants/Value';
import { TextThin } from '../../components/StyledText';
import DefaultForm from '../../components/form/defaultForm';
import SurveyForm from '../../components/form/SurveyForm';
import useToggleStore, { useTypeForm } from '../../store/preference';
import { useRouter } from 'expo-router';

const post = () => {
  const colorScheme = useColorScheme();

  const isExpanded = useSharedValue(false);
  const route = useRouter();
  const { primaryColourLight } = useToggleStore((state) => state);

  const { IconName } = useTypeForm((state) => state);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      justifyContent: isExpanded.value ? 'center' : 'center',
    };
  }, [isExpanded]);

  const toggleViewHeight = useCallback(() => {
    isExpanded.value = !isExpanded.value;
  }, [isExpanded.value]);

  const viewStyle = useAnimatedStyle(() => {
    return {
      display: isExpanded.value ? 'none' : 'flex',
      marginVertical: isExpanded.value ? 0 : 20,
    };
  }, [isExpanded]);

  const inputStyle = useAnimatedStyle(() => {
    return {
      display: isExpanded.value ? 'flex' : 'none',
    };
  }, [isExpanded]);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors[colorScheme ?? 'light'].background,
      }}
    >
      <Animated.View
        style={[
          {
            // minHeight: verticalScale(116),
            ...shadow(5),
            borderRadius: 25,
            backgroundColor: Colors[colorScheme ?? 'light'].background,
            marginHorizontal: horizontalScale(10),
            marginTop: verticalScale(25),
            gap: 5,
            //  justifyContent: '',
            // justifyContent: canComment ? "center" : "space-between",

            paddingHorizontal: horizontalScale(15),
            overflow: 'hidden',
          },
          animatedStyle,
        ]}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            // paddingTop: verticalScale(10),
          }}
        >
          <TouchableOpacity
            style={{
              alignSelf: 'center', // Centrer l'image verticalement
            }}
            onPress={() => {
              route.push('profile');
            }}
          >
            <Image
              style={{
                width: moderateScale(MEDIUM_PIC_USER),
                aspectRatio: 1,
                marginHorizontal: moderateScale(10),
                borderRadius: MEDIUM_PIC_USER / 2,
                borderColor: primaryColourLight,
                borderWidth: 3,
              }}
              source="https://picsum.photos/seed/696/3000/2000"
              contentFit="cover"
              transition={1000}
            />
          </TouchableOpacity>

          <Animated.View style={[viewStyle, { flex: 1 }]}>
            <TouchableOpacity
              onPress={toggleViewHeight}
              style={{
                borderColor: '#1113',
                borderWidth: 1,
                height: MEDIUM_PIC_USER - 3,
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 20,
              }}
            >
              <TextThin style={{ marginLeft: horizontalScale(15) }}>{formTextPlaceholder(IconName)}</TextThin>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={[inputStyle, { flex: 1 }]}>
            <TextInput
              multiline={true}
              placeholder={formTextPlaceholder(IconName)}
              style={{
                borderColor: '#1113',
                // height: verticalScale(100),
                maxHeight: verticalScale(120),
                fontFamily: 'ExtraLight',
                // borderWidth: 1,
                paddingVertical: verticalScale(20),
              }}
            />
          </Animated.View>
        </View>
        <DefaultForm cancel={toggleViewHeight} isExpanded={isExpanded} />
        <SurveyForm cancel={toggleViewHeight} isExpanded={isExpanded} />
      </Animated.View>
    </SafeAreaView>
  );
};

export default React.memo(post);
