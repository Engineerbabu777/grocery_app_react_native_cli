import {StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import React from 'react';
import {Colors, Fonts} from '@utils/Constants';
import CustomText from './CustomText';

type Props = {
  onPress: () => void;
  title: string;
  disabled: boolean;
  loading: boolean;
};

const CustomButton = ({disabled, loading, onPress, title}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      style={[
        styles.btn,
        {
          backgroundColor: disabled ? Colors.disabled : Colors.secondary,
        },
      ]}>
      {loading ? (
        <ActivityIndicator color={'white'} size={'small'} />
      ) : (
        <CustomText
          style={styles.text}
          variant="h6"
          fontFamily={Fonts.SemiBold}>
          {title}
        </CustomText>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 15,
    marginVertical: 15,
    width: '100%',
  },
  text: {
    color: '#fff',
  },
});
export default CustomButton;
