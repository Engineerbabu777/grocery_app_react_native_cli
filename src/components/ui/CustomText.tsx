/* eslint-disable @typescript-eslint/no-unused-vars */
import {View, Text, TextStyle, StyleSheet} from 'react-native';
import React from 'react';
import {Colors, Fonts} from '@utils/Constants';
import {RFValue} from 'react-native-responsive-fontsize';

type Props = {
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'h7'
    | 'h8'
    | 'h9'
    | 'body';
  children?: React.ReactNode;
  style?: TextStyle | TextStyle[];
  numberOfLines?: number;
  fontSize?: number;
  fontFamily?: Fonts;
  onLayout?: (event: object) => void;
};

const CustomText = ({
  variant = 'body',
  children,
  style,
  numberOfLines,
  fontSize,
  fontFamily,
  onLayout,
  ...props
}: Props) => {
  let computedFontSize: number;

  switch (variant) {
    case 'h1':
      computedFontSize = RFValue(fontSize || 22);
      break;
    case 'h2':
      computedFontSize = RFValue(fontSize || 20);
      break;
    case 'h3':
      computedFontSize = RFValue(fontSize || 18);
      break;
    case 'h4':
      computedFontSize = RFValue(fontSize || 16);
      break;
    case 'h5':
      computedFontSize = RFValue(fontSize || 14);
      break;
    case 'h6':
      computedFontSize = RFValue(fontSize || 12);
      break;
    case 'h7':
      computedFontSize = RFValue(fontSize || 12);
      break;
    case 'h8':
      computedFontSize = RFValue(fontSize || 10);
      break;
    case 'h9':
      computedFontSize = RFValue(fontSize || 9);
      break;
    case 'body':
      computedFontSize = RFValue(fontSize || 12);
      break;
  }

  const fontFamilyStyle = {
    fontFamily,
  };
  return (
    <Text
      onLayout={onLayout}
      numberOfLines={numberOfLines || undefined}
      style={[
        styles.text,
        fontFamilyStyle,
        style,
        {
          fontSize: computedFontSize,
        },
      ]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'left',
  },
});
export default CustomText;
