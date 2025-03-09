import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '@utils/Constants';

type Props = {
  left: React.ReactNode;
  right: boolean;
  onClear?: () => void;
};

const CustomInput = ({
  left,
  right,
  onClear,
  ...props
}: Props & React.ComponentProps<typeof TextInput>) => {
  return (
    <View style={styles.flexRow}>
      {left}
      <TextInput
        {...props}
        style={styles.inputContainer}
        placeholderTextColor={'#ccc'}
      />
      <View style={styles.icon}>
        {props?.value?.length !== 0 && right && (
          <TouchableOpacity onPress={onClear}>
            <Icon name="close-circle-sharp" size={RFValue(16)} color={'#ccc'} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '70%',
    height: '100%',
    bottom: -1,
    color: Colors.text,
    paddingVertical: 14,
    paddingBottom: 15,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderWidth: 0.5,
    borderColor: Colors.border,
    shadowColor: Colors.border,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.6,
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: '#fff',
  },
  icon: {
    width: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  text: {
    width: '10%',
    marginLeft: 10,
  },
});

export default CustomInput;
