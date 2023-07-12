import React from 'react';

import { View } from '../../components/Themed';
import PostIndex from '../../components/post/PostIndex';

const Neighbor = () => {
  console.log('salut2');

  return (
    <View style={{ flex: 1 }}>
      <PostIndex />
    </View>
  );
};

export default React.memo(Neighbor);
