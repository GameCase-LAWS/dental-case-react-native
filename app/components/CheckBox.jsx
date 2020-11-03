import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { Typography } from './Typography';

import Checked from '../assets/images/checked.png';
import { ThemeContext } from '../ThemeContext';

export const CheckBox = ({ onPress, label, style, checked, backgroundColor, ...props }) => {
  const { theme } = React.useContext(ThemeContext);

  return (
    <View style={[style, { flexDirection: 'row' }]}>
      <TouchableOpacity activeOpacity={0.9} disabled={checked} onPress={onPress}>
        <View style={[theme.styles.CheckBox_checkbox, { backgroundColor }]}>
          {checked && <Image source={Checked} resizeMode="contain" style={theme.styles.CheckBox_checkIcon} />}
        </View>
      </TouchableOpacity>
      <Typography numberOfLines={2} style={{ paddingTop: 5 }}>{label}</Typography>
    </View>
  );
}

CheckBox.propTypes = {
  onPress: PropTypes.func,
  label: PropTypes.string,
  checked: PropTypes.bool,
  backgroundColor: PropTypes.string
}

CheckBox.defaultProps = {
  onPress: () => { },
  backgroundColor: '#FFF',
  checked: false
}