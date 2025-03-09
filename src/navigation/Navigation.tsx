import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from '@utils/NavigationUtils';
import SplashScreen from '@features/auth/SplashScreen';
import DeliveryLogin from '@features/auth/DeliveryLogin';
import CustomerLogin from '@features/auth/CustomerLogin';
import ProductDashboard from '@features/dasboard/ProductDashboard';

const Stack = createNativeStackNavigator();
export default function Navigation() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen
          name="DeliveryLogin"
          component={DeliveryLogin}
          options={{
            animation: 'fade',
          }}
        />
        <Stack.Screen
          name="CustomerLogin"
          component={CustomerLogin}
          options={{
            animation: 'fade',
          }}
        />
        <Stack.Screen
          name="ProductDashboard"
          component={ProductDashboard}
          options={{
            animation: 'fade',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
