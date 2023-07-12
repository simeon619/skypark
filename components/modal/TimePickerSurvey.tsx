import React, { useState } from 'react';
import { horizontalScale, moderateScale, verticalScale } from '../../Utilis/metrics';

import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { Modal } from 'react-native';

const TimePicker = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const { primaryColour } = useToggleStore((state) => state);
  const handleBackdropPress = () => {
    // closeModal();
  };
  const handleModalPress = () => {
    // Do Nothing
  };

  return (
    <>
      <Modal
        visible={modalVisible}
        animationType="none"
        transparent={true}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <TouchableWithoutFeedback onPress={handleBackdropPress}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(01, 0, 40, 0.3)',
            }}
          >
            <TouchableWithoutFeedback onPress={handleModalPress}>
              <ScrollView
                keyboardShouldPersistTaps="handled"
                style={{
                  position: 'absolute',
                  left: horizontalScale(5),
                  zIndex: 99,
                  right: horizontalScale(5),
                  bottom: verticalScale(10),
                  padding: moderateScale(10),
                  borderRadius: 10,
                  // backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
              >
                <TextLight>7878787</TextLight>
              </ScrollView>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default TimePicker;
