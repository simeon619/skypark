import { DimensionValue, useWindowDimensions } from 'react-native';
import React, { memo } from 'react';
import { Image } from 'expo-image';
import { horizontalScale, verticalScale } from '../../Utilis/metrics';
import { View } from '../Themed';
import ShadowImage from './ShadowImage';

const GAP_MEDIA = 10;
const MediaComponent = ({ media }: { media: string[] | undefined }) => {
  if (!media) {
    return null;
  }

  const numberMedia = media?.length;

  const ImageComponent = ({ uri, width, height }: { uri: string; width: DimensionValue; height: DimensionValue }) => {
    return (
      <Image
        style={{ width, height }}
        source={{ uri }}
        priority={'high'}
        transition={0}
        allowDownscaling={true}
        cachePolicy={'memory-disk'}
      />
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
          <ShadowImage
            ratioHeight={1}
            ratioWidth={48.5}
            children={<ImageComponent uri={media[0]} width={'100%'} height={'100%'} />}
          />
          <ShadowImage
            ratioHeight={1}
            ratioWidth={48.5}
            children={<ImageComponent uri={media[1]} width={'100%'} height={'100%'} />}
          />
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
            ratioHeight={2}
            ratioWidth={100}
            children={<ImageComponent uri={media[0]} width={'100%'} height={height * 0.2} />}
          />

          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'nowrap',
              columnGap: horizontalScale(GAP_MEDIA),
            }}
          >
            <ShadowImage
              ratioHeight={2}
              ratioWidth={48.5}
              children={<ImageComponent uri={media[1]} width={'100%'} height={height * 0.2} />}
            />
            <ShadowImage
              ratioHeight={2}
              ratioWidth={48.5}
              children={<ImageComponent uri={media[2]} width={'100%'} height={height * 0.2} />}
            />
          </View>
        </View>
      )}

      {numberMedia === 4 && (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', rowGap: verticalScale(GAP_MEDIA) }}>
          <ShadowImage
            ratioHeight={2}
            ratioWidth={100}
            children={<ImageComponent uri={media[0]} width={'100%'} height={height * 0.2} />}
          />
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'nowrap',
              columnGap: horizontalScale(GAP_MEDIA),
            }}
          >
            <ShadowImage
              ratioHeight={2}
              ratioWidth={31.5}
              children={<ImageComponent uri={media[1]} width={'100%'} height={height * 0.2} />}
            />
            <ShadowImage
              ratioHeight={2}
              ratioWidth={31.5}
              children={<ImageComponent uri={media[2]} width={'100%'} height={height * 0.2} />}
            />
            <ShadowImage
              ratioHeight={2}
              ratioWidth={31.5}
              children={<ImageComponent uri={media[3]} width={'100%'} height={height * 0.2} />}
            />
          </View>
        </View>
      )}
    </View>
  );
};
export default memo(MediaComponent);
