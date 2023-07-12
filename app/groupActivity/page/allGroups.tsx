import React from 'react';
import { ScrollView } from '../../../components/Themed';
import ListActivity from '../../../components/utilis/listActivity';
import SearchGroup from '../../../components/utilis/searchGroup';

const AllGroups = () => {
  return (
    <ScrollView>
      <SearchGroup />
      <ListActivity />
    </ScrollView>
  );
};
export default AllGroups;
