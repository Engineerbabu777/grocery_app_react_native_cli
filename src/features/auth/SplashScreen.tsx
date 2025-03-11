import {Alert, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {Colors} from '@utils/Constants';
import {screenHeight, screenWidth} from '@utils/Scaling';
import Logo from '@assets/images/logo.jpeg';
import {navigate, resetAndNavigate} from '@utils/NavigationUtils';
import GeoLocation, {
  GeolocationError,
  GeolocationResponse,
} from '@react-native-community/geolocation';
import {useAuthStore} from '@service/authStore';
import {tokenStorage} from '@state/storage';
import {jwtDecode} from 'jwt-decode';
import {getUser, refreshAccessToken} from '@service/authServce';
import {reverseGeocode} from '@service/mapService';

GeoLocation.setRNConfiguration({
  skipPermissionRequests: false,
  authorizationLevel: 'auto',
  enableBackgroundLocationUpdates: true,
  locationProvider: 'auto',
});

interface decodedToken {
  exp: number;
}

export default function SplashScreen() {
  const {user, setUser} = useAuthStore();

  const tokenCheck = async () => {
    const _accessToken = tokenStorage.getString('accessToken') as string;
    const _refreshToken = tokenStorage.getString('refreshToken') as string;
    console.log({_accessToken});
    if (_accessToken) {
      const decodedAccessToken = jwtDecode<decodedToken>(_accessToken);
      const decodedRefreshToken = jwtDecode<decodedToken>(_refreshToken);

      const currentTime = Date.now() / 1000;

      if (decodedRefreshToken?.exp < currentTime) {
        resetAndNavigate('CustomerLogin');
        Alert.alert('Session Expired, Login Again');
        return false;
      }

      if (decodedAccessToken?.exp < currentTime) {
        try {
          refreshAccessToken();
          await getUser(setUser);
        } catch (error) {
          console.log(error);
          Alert.alert('There was an error refreshing token!');
          return false;
        }
      }

      if (user?.role === 'Customer') {
        resetAndNavigate('ProductDashboard');
      } else {
        resetAndNavigate('DeliveryDashboard');
      }

      return true;
    }

    resetAndNavigate('CustomerLogin');
    return false;
  };

  useEffect(() => {
    const initialStartUp = async () => {
      try {
        await GeoLocation.requestAuthorization();
        GeoLocation.getCurrentPosition(
          async (position: GeolocationResponse) => {
            console.log({position});

            if (position?.coords?.latitude) {
              try {
                const response = await reverseGeocode(
                  position.coords.latitude,
                  position.coords.longitude,
                );
                console.log({response}); 
              } catch (err) {
                console.error('Reverse geocoding failed:', err);
              }
            }

            resetAndNavigate('ProductDashboard');
          },
          (error: GeolocationError) => {
            console.error('Location error:', error);
          },
          {
            enableHighAccuracy: true,
            timeout: 30000,
            maximumAge: 1000,
          },
        );
      } catch (error) {
        Alert.alert(
          'Sorry, we need location services to give you a better shopping experience',
        );
      }
    };

    const timeId = setTimeout(() => {
      initialStartUp();
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
