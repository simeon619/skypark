import React, { useEffect } from 'react';
import { useColorScheme, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from '../../components/Themed';
import Colors from '../../constants/Colors';
import Animated from 'react-native-reanimated';
import { horizontalScale, moderateScale, verticalScale } from '../../Utilis/metrics';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Image } from 'expo-image';
import { formTextPlaceholder, MEDIUM_PIC_USER } from '../../constants/Value';
import DefaultForm from '../../components/form/defaultForm';
import SurveyForm from '../../components/form/SurveyForm';
import useToggleStore, { useTypeForm } from '../../store/preference';
import { usePathname, useRouter } from 'expo-router';
import TimePickerSurvey from '../../components/modal/TimePickerSurvey';

const post = () => {
  const colorScheme = useColorScheme();

  const route = useRouter();
  const { primaryColourLight } = useToggleStore((state) => state);

  const { IconName } = useTypeForm((state) => state);
  const refInput = React.useRef<TextInput>(null);
  const { width } = useWindowDimensions();
  useEffect(() => {
    refInput.current?.focus();
  }, [usePathname()]);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors[colorScheme ?? 'light'].background,
      }}
    >
      <View
        style={[
          {
            borderRadius: 25,
            backgroundColor: Colors[colorScheme ?? 'light'].background,
            gap: 5,
            paddingHorizontal: horizontalScale(15),
            paddingTop: verticalScale(15),
          },
        ]}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            style={{
              alignSelf: 'center',
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

          <Animated.View style={[{ flex: 1 }]}>
            <TextInput
              multiline={true}
              ref={refInput}
              placeholder={formTextPlaceholder(IconName)}
              style={{
                fontSize: moderateScale(16),
                maxHeight: width * 0.4,
                fontFamily: 'Light',
                paddingVertical: verticalScale(5),
              }}
            />
          </Animated.View>
        </View>
        <DefaultForm />
        <SurveyForm />
      </View>
      <TimePickerSurvey />
    </SafeAreaView>
  );
};

export default React.memo(post);
