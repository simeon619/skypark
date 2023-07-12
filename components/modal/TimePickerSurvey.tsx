import React from 'react';

import { Modal, TouchableWithoutFeedback } from 'react-native';
import useToggleStore, { useDaysSurvey, useModalTimeSurvey } from '../../store/preference';
import { ScrollView, View } from '../Themed';
import { TextLight } from '../StyledText';
import { horizontalScale, moderateScale, verticalScale } from '../../Utilis/metrics';

const TimePickerSurvey = () => {
  const { setModalTimeSurvey, modalTimeSurvey } = useModalTimeSurvey();
  const { primaryColourLight, primaryColour } = useToggleStore((state) => state);
  const { setDaysSurvey, daysSurvey } = useDaysSurvey();
  const handleBackdropPress = () => {
    setModalTimeSurvey(false);
  };
  const handleModalPress = () => {
    // Do Nothing
  };

  const timesSurveyDays = [{ d: 1 }, { d: 2 }, { d: 3 }, { d: 4 }, { d: 5 }, { d: 6 }, { d: 7 }];
  return (
    <Modal
      visible={modalTimeSurvey}
      animationType="fade"
      transparent={true}
      onRequestClose={() => {
        setModalTimeSurvey(false);
      }}
    >
      <TouchableWithoutFeedback onPress={handleBackdropPress}>
        <View style={{ flex: 1, backgroundColor: '#0008' }}>
          <TouchableWithoutFeedback onPress={handleModalPress}>
            <ScrollView
              style={{
                position: 'absolute',
                left: horizontalScale(5),
                zIndex: 99,
                right: horizontalScale(5),
                bottom: verticalScale(10),
                padding: moderateScale(10),
                borderRadius: 10,
              }}
              keyboardShouldPersistTaps="handled"
            >
              {timesSurveyDays.map(({ d }, i) => (
                <View
                  // onPress={() => {
                  //   console.log(d);
                  // }}
                  onTouchStart={() => {
                    setDaysSurvey(d);
                    setModalTimeSurvey(false);
                  }}
                  key={i}
                  style={{
                    flexDirection: 'row',
                    paddingVertical: verticalScale(7),
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                  }}
                >
                  <View
                    style={{
                      width: moderateScale(19),
                      aspectRatio: 1,
                      borderRadius: 100,
                      borderWidth: 1,
                      borderColor: '#0009',
                      backgroundColor: daysSurvey === d ? primaryColour : '#0000',
                    }}
                  />
                  <TextLight style={{ fontSize: moderateScale(17), paddingTop: verticalScale(5) }}>
                    <TextLight> {d} </TextLight>
                    <TextLight>jour{d > 1 ? 's' : ''} </TextLight>{' '}
                  </TextLight>
                </View>
              ))}
            </ScrollView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default TimePickerSurvey;
