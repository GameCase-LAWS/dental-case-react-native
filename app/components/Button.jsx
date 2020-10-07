import React from 'react';
import { View, TouchableHighlight, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { appColors } from '../styles';
import { Typography } from './Typography';

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
          <Typography variant='button14' color={textColor} style={{ marginLeft: 16, textAlign: 'center', flexGrow: 1 }}>{label}</Typography>
        </View>
      ) : (
        <View style={[styles.button, style]}>
          <Typography variant='button14' color={appColors.highEmphasisWhiteText}>{label}</Typography>
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
    borderRadius: 15,
    overflow: 'hidden'
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    backgroundColor: appColors.primary,
    color: appColors.highEmphasisWhiteText
  },
  buttonWithIcon: {
    flexDirection: 'row',
    padding: 15
  }
});