import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {GestureHandlerRootView, State} from 'react-native-gesture-handler';

import React from 'react';
import CustomSafeAreaView from '@components/global/CustomSafeArea';
import ProductSlider from '@components/login/ProductSlider';
import {Colors} from '@utils/Constants';

const CustomerLogin = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <CustomSafeAreaView>
          <ProductSlider />
        </CustomSafeAreaView>

        {/* Footer */}
        <View style={styles.footer}>
          <SafeAreaView />
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default CustomerLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    borderTopWidth: 0.8,
    borderColor: Colors.border,
    zIndex: 22,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f8f9fc',
    width: '100%',
    paddingBottom: 10,
    bottom: 0,
  },
});
