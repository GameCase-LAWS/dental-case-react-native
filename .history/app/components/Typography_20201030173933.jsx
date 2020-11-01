import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text } from 'react-native';
import { appColors } from '../styles';
import { normalize } from '../tools/functions';

export function Typography({
  color,
  variant,
  bold,
  children,
  paragraph,
  style,
  ...props
}) {
  return (
    <Text
      style={[
        styles[variant],
        bold && { fontFamily: "roboto-bold" },
        paragraph && { marginBottom: 15 },
        { color },
        style
      ]}
      {...props}
    >{children}</Text>
  );
}

Typography.propTypes = {
  color: PropTypes.string,
  variant: PropTypes.oneOf(['button14', 'header34', 'header24', 'header20', 'subtitle16', 'subtitle14', 'caption12', 'overline10']),
  bold: PropTypes.bool,
  paragraph: PropTypes.bool
}

Typography.defaultProps = {
  color: appColors.highEmphasisBlackText,
  variant: "subtitle16",
  bold: false,
  paragraph: false,
}

const styles = StyleSheet.create({
  header48: {
    fontFamily: "roboto-regular",
    fontSize: normalize(48),
    letterSpacing: 0
  },
  header34: {
    fontFamily: "roboto-regular",
    fontSize: normalize(34),
    letterSpacing: 0.25
  },
  header24: {
    fontFamily: "roboto-regular",
    fontSize: normalize(24),
    letterSpacing: 0
  },
  header20: {
    fontFamily: "roboto-bold",
    fontSize: normalize(20),
    letterSpacing: 0.15
  },
  subtitle16: {
    fontFamily: "roboto-regular",
    fontSize: normalize(16),
    letterSpacing: 0.15
  },
  subtitle14: {
    fontFamily: "roboto-bold",
    fontSize: normalize(14),
    letterSpacing: 0.1
  },
  caption12: {
    fontFamily: "roboto-regular",
    fontSize: normalize(12),
    letterSpacing: 0.4
  },
  overline10: {
    fontFamily: "roboto-regular",
    fontSize: normalize(10),
    letterSpacing: 0.5
  },
  button14: {
    fontFamily: "roboto-bold",
    textTransform: 'uppercase',
    fontSize: normalize(14),
    letterSpacing: 1.25
  }
});