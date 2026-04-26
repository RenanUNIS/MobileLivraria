import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../pages/Home';
import { BookDetails } from '../pages/BookDetails';
import { Reading } from '../pages/Reading';

const { Navigator, Screen } = createNativeStackNavigator();

export function Routes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={Home} />
      <Screen name="BookDetails" component={BookDetails} />
      <Screen name="Reading" component={Reading} />
    </Navigator>
  );
}