import {Alert, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {Colors} from '@utils/Constants';
import {screenHeight, screenWidth} from '@utils/Scaling';
import Logo from '@assets/images/logo.jpeg';
import {navigate, resetAndNavigate} from '@utils/NavigationUtils';
import GeoLocation from '@react-native-community/geolocation';
import {useAuthStore} from '@service/authStore';
import {tokenStorage} from '@state/storage';
import {jwtDecode} from 'jwt-decode';

GeoLocation.setRNConfiguration({
  skipPermissionRequests: false,
  authorizationLevel: 'always',
  enableBackgroundLocationUpdates: true,
  locationProvider: 'auto',
});

interface decodedToken {
  exp: number;
}

export default function SplashScreen() {
  const {user, setUser} = useAuthStore();

  const tokenCheck = async () => {
    const accessToken = tokenStorage.getString('accessToken') as string;
    const refreshToken = tokenStorage.getString('refreshToken') as string;

    if (accessToken) {
      const decodedAccessToken = jwtDecode<decodedToken>(accessToken);
      const decodedRefreshToken = jwtDecode<decodedToken>(refreshToken);

      const currentTime = Date.now() / 1000;

      if (decodedAccessToken?.exp > currentTime) {
        resetAndNavigate('CustomerLogin');
        Alert.alert('Session Expired, Login Again');
        return false;
      }
    }

    resetAndNavigate('CustomerLogin');
    return false;
  };
  useEffect(() => {
    const navigateUser = async () => {
      try {
        navigate('CustomerLogin');
      } catch (error) {}
    };
    const timeId = setTimeout(() => {
      navigateUser();
    }, 1000);

    return () => clearTimeout(timeId);
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.logoImage} source={Logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    height: screenHeight * 0.4,
    width: screenWidth * 0.4,
    resizeMode: 'contain',
  },
});
