import {SafeAreaView, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React from 'react';

type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
};
export default function CustomSafeAreaView({children, style}: Props) {
  return (
    <View style={styles.container}>
      <SafeAreaView />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
