//@ts-nocheck
import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { SurveySchema } from '../../types/PostType';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TextLight } from '../StyledText';
import { horizontalScale, moderateScale, verticalScale } from '../../Utilis/metrics';
import { AntDesign, Entypo } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';

const SurveyComponent = ({ dataSurvey }: { dataSurvey: SurveySchema | undefined }) => {
  if (!dataSurvey) return null;

  //ici on aura plus tard une liste venant du serveur qui renvera true ou false en fonction de si l'user a voté ou non
  const [hasVoted, setHasVoted] = useState(false);
  const [dataSurveyA, setDataSurveyA] = useState(dataSurvey);

  const handleVote = (item: any) => {
    if (!hasVoted) {
      // setHasVoted(true);

      // Crée une nouvelle copie de l'objet d'état avec les modifications nécessaires
      const updatedOptions = [...dataSurveyA.options];
      const index = updatedOptions.findIndex((option) => option.id === item.id);
      if (index !== -1) {
        updatedOptions[index] = { ...item, votes: item.votes + 1 };
      }

      setDataSurveyA({ ...dataSurveyA, options: updatedOptions, totalVotes: dataSurveyA.totalVotes + 1 });
    }
  };

  return (
    <View style={{ flex: 1, rowGap: horizontalScale(7) }}>
      {dataSurveyA.options.map((item, index) => {
        console.log(item, dataSurveyA.totalVotes);
        let percentage = ((item.votes * 100) / dataSurveyA.totalVotes).toFixed(1);
        percentage = percentage === 'NaN' ? '0' : percentage;
        return (
          <TouchableOpacity
            key={index}
            onPress={() => handleVote(item)}
            style={{ borderBottomColor: '#3F21B822', borderBottomWidth: 1, paddingBottom: verticalScale(10) }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: horizontalScale(10) }}>
              <TextLight style={{ fontSize: moderateScale(16), color: '#777' }}>{percentage} %</TextLight>
              <TextLight style={{ fontSize: moderateScale(15) }}>{item.label}</TextLight>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: horizontalScale(10),
                paddingRight: horizontalScale(35),
              }}
            >
              <View
                style={{
                  width: 20,
                  aspectRatio: 1,
                  borderRadius: 50,
                  backgroundColor: '#3F21B8',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Entypo name="check" size={moderateScale(15)} color="white" />
              </View>
              <Animated.View
                style={{
                  height: verticalScale(7),
                  width: `${percentage}%`,
                  backgroundColor: '#3F21B8',
                  borderRadius: 10,
                }}
              />
            </View>
          </TouchableOpacity>
        );
      })}
      <TextLight style={{ fontSize: moderateScale(15) }}> Votes: {dataSurveyA.totalVotes}</TextLight>
    </View>
  );
};

export default SurveyComponent;
