import React from 'react';
import { View, TouchableHighlight, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { appColors } from '../styles';
import { Typography } from './Typography';
import { meansure } from '../tools/resolution';

export function Button({
  label,
  disabled,
  style,
  onPress,
  icon,
  buttonStyle,
  textColor
}) {
  return (
    <View style={[styles.buttonStyle, buttonStyle]}>
      <TouchableHighlight onPress={onPress} disabled={disabled} underlayColor='white'>
      {icon ? (
        <View style={[styles.buttonWithIcon, style]}>
          {icon}
          <Typography variant='button14' color={textColor} style={{ marginLeft: meansure(1), textAlign: 'center' }}>{label}</Typography>
        </View>
      ) : (
        <View style={[disabled ? styles.buttonDisabled : styles.button, style]}>
          <Typography bold variant='header24' color={appColors.highEmphasisWhiteText}>{label}</Typography>
        </View>
      )}
      </TouchableHighlight>
    </View>
  );
}

Button.propTypes = {
  label: PropTypes.string,
  disabled: PropTypes.bool,
  onPress: PropTypes.func
}

Button.defaultProps = {
  disabled: false,
  onPress: () => { }
}

const styles = StyleSheet.create({
  buttonStyle: {
    borderRadius: meansure(1),
    overflow: 'hidden'
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    padding: meansure(1),
    backgroundColor: appColors.primary,
    color: appColors.highEmphasisWhiteText
  },
  buttonDisabled: {
    justifyContent: "center",
    alignItems: "center",
    padding: meansure(1),
    backgroundColor: '#84D0C3',
    color: appColors.highEmphasisWhiteText
  },
  buttonWithIcon: {
    flexDirection: 'row',
    padding: meansure(1)
  }
});