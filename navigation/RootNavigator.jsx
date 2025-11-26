import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Home from '../app/(dashboard)/home'
import RelationDetails from '../app/(relations)/details'

const Stack = createNativeStackNavigator()

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={Home}
        />
        <Stack.Screen 
          name="RelationDetails" 
          component={RelationDetails}
          options={{
            headerShown: true,
            title: 'Chi tiết quan hệ Artifacts',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootNavigator