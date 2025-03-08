import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {Colors} from '@utils/Constants';
import {screenHeight, screenWidth} from '@utils/Scaling';
import Logo from '@assets/images/logo.jpeg';
import {navigate} from '@utils/NavigationUtils';

export default function SplashScreen() {
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
    height: screenHeight * 0.7,
    width: screenWidth * 0.7,
    resizeMode: 'contain',
  },
});
