import { FontAwesome } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, TouchableOpacity, useColorScheme } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { horizontalScale, moderateScale, verticalScale } from '../../Utilis/metrics';
import Colors from '../../constants/Colors';
import useToggleStore, { useDaysSurvey, useModalTimeSurvey, useTypeForm } from '../../store/preference';
import { TextLight, TextMedium, TextRegular } from '../StyledText';
import { View } from '../Themed';

const SurveyForm = () => {
  const { primaryColour, primaryColourLight, name } = useToggleStore((state) => state);
  const colorScheme = useColorScheme();
  const { IconName } = useTypeForm((state) => state);
  const { setModalTimeSurvey, modalTimeSurvey } = useModalTimeSurvey();
  const hideForm = useAnimatedStyle(() => {
    return {
      display: IconName === 'Sondage' ? 'flex' : 'none',
      opacity: withTiming(IconName === 'Sondage' ? 1 : 0),
    };
  }, [IconName]);
  const { daysSurvey } = useDaysSurvey();
  const timeoutRef = useRef<NodeJS.Timeout>();
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    if (options.length === 0) {
      timeoutRef.current = setTimeout(() => {
        setOptions((prevOptions) => ['', '']);
      });
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [options]);

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    if (options.length >= 4) {
      return;
    }
    const newOptions = [...options, ''];
    setOptions(newOptions);
  };
  const handleDeleteOption = (index: number) => {
    if (options.length <= 2) {
      return;
    }
    const newOptions = options.filter((_, i) => i !== index);

    setOptions(newOptions);
  };

  const handleSubmit = () => {
    console.log('Options sélectionnées:', options);
  };
  return (
    <Animated.View style={{ ...hideForm }}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 100}
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
      >
        <TextLight style={{ fontSize: moderateScale(16) }}>Options</TextLight>
        {options.map((option, index) => {
          let textPlaceholder = 'Option ' + (index + 1);
          return (
            <View
              key={index}
              style={{
                flexDirection: 'row-reverse',
                alignItems: 'center',
                gap: horizontalScale(5),
              }}
            >
              {index >= 2 ? (
                <FontAwesome
                  name="close"
                  size={24}
                  style={{ padding: 10 }}
                  onPress={() => {
                    handleDeleteOption(index);
                  }}
                />
              ) : (
                <View style={{ padding: 18 }} />
              )}
              <TextInput
                key={index}
                // multiline={true}
                autoFocus={index >= 2 ? true : false}
                numberOfLines={1}
                maxLength={50}
                style={{
                  borderColor: '#1113',
                  fontFamily: 'Light',
                  borderWidth: 1,
                  flex: 1,
                  fontSize: moderateScale(15),
                  paddingVertical: verticalScale(7),
                  paddingHorizontal: horizontalScale(15),
                  borderRadius: moderateScale(50),
                  marginBottom: verticalScale(15),
                  textAlignVertical: 'center',
                }}
                placeholder={textPlaceholder}
                value={option}
                onChangeText={(value) => handleOptionChange(index, value)}
              />
            </View>
          );
        })}

        {options.length <= 3 && (
          <TouchableOpacity
            style={{
              borderRadius: 8,
              paddingHorizontal: moderateScale(10),

              alignItems: 'flex-start',
              // backgroundColor: "red",
              alignSelf: 'flex-start',
            }}
            onPress={handleAddOption}
          >
            <FontAwesome name="plus-circle" size={25} />
          </TouchableOpacity>
        )}
        <View style={{}}>
          <TextLight style={{ fontSize: moderateScale(16) }}>Duree du sondage</TextLight>

          <TouchableOpacity
            style={{ flexDirection: 'row' }}
            onPress={() => {
              setModalTimeSurvey(true);
            }}
          >
            <TextMedium
              style={{
                flex: 1,
                textAlign: 'left',
                color: primaryColour,
                fontSize: moderateScale(17),
              }}
            >
              {daysSurvey} jour{daysSurvey > 1 ? 's' : ''}
            </TextMedium>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={handleSubmit}
          style={{
            backgroundColor: primaryColourLight,
            paddingHorizontal: horizontalScale(10),
            paddingVertical: verticalScale(5),
            borderRadius: moderateScale(50),
            marginVertical: verticalScale(15),
          }}
        >
          <TextRegular
            style={{
              color: Colors[colorScheme ?? 'light'].overLay,
              fontSize: 16,
              textAlign: 'center',
            }}
          >
            Valider
          </TextRegular>
        </TouchableOpacity>
        <TouchableOpacity style={{ paddingBottom: verticalScale(10) }} onPress={() => {}}>
          <TextRegular
            style={{
              color: primaryColour,
              paddingVertical: verticalScale(1),
              textAlign: 'center',
            }}
          >
            Annuler
          </TextRegular>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </Animated.View>
  );
};

export default SurveyForm;
