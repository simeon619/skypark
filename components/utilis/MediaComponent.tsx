import { useRouter } from 'expo-router';
import React, { memo } from 'react';
import { DimensionValue, useWindowDimensions } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { horizontalScale, verticalScale } from '../../Utilis/metrics';
import { View } from '../Themed';
import ShadowImage from './ShadowImage';

const GAP_MEDIA = 10;
const MediaComponent = ({ media }: { media: string[] | undefined }) => {
  if (!media) {
    return null;
  }
  const router = useRouter();
  const numberMedia = media?.length;

  const ImageComponent = ({ uri, width, height }: { uri: string; width: DimensionValue; height: DimensionValue }) => {
    return (
      <TouchableHighlight onPress={() => router.push({ pathname: 'modal/FormViewerImage', params: { uri } })}>
        <Animated.Image
          style={{ width, height }}
          source={{ uri }}
          // priority={'high'}
          // transition={0}
          // allowDownscaling={true}
          // cachePolicy={'memory-disk'}
        />
      </TouchableHighlight>
    );
  };

  const { height } = useWindowDimensions();
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      {numberMedia === 1 && (
        <ShadowImage
          ratioHeight={1}
          ratioWidth={100}
          children={<ImageComponent uri={media[0]} width={'100%'} height={'100%'} />}
        />
      )}
      {numberMedia === 2 && (
        <View style={{ flexDirection: 'row', columnGap: horizontalScale(GAP_MEDIA) }}>
          {[0, 1].map((index) => (
            <ShadowImage
              key={index}
              ratioHeight={1}
              ratioWidth={48.5}
              children={<ImageComponent uri={media[index]} width={'100%'} height={'100%'} />}
            />
          ))}
        </View>
      )}
      {numberMedia === 3 && (
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            rowGap: verticalScale(GAP_MEDIA),
          }}
        >
          <ShadowImage
            ratioHeight={1.4}
            ratioWidth={100}
            children={<ImageComponent uri={media[0]} width={'100%'} height={'100%'} />}
          />
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'nowrap',
              columnGap: horizontalScale(GAP_MEDIA),
            }}
          >
            {[1, 2].map((index) => (
              <ShadowImage
                key={index}
                ratioHeight={2}
                ratioWidth={48.5}
                children={<ImageComponent uri={media[index]} width={'100%'} height={'100%'} />}
              />
            ))}
          </View>
        </View>
      )}

      {numberMedia === 4 && (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', rowGap: verticalScale(GAP_MEDIA) }}>
          <ShadowImage
            ratioHeight={1.4}
            ratioWidth={100}
            children={<ImageComponent uri={media[0]} width={'100%'} height={'100%'} />}
          />
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'nowrap',
              columnGap: horizontalScale(GAP_MEDIA),
            }}
          >
            {[1, 2, 3].map((index) => (
              <ShadowImage
                key={index}
                ratioHeight={2.5}
                ratioWidth={31.5}
                children={<ImageComponent uri={media[index]} width={'100%'} height={'100%'} />}
              />
            ))}
          </View>
        </View>
      )}
    </View>
  );
};
export default memo(MediaComponent);
