import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { Typography } from './Typography';

import Checked from '../assets/images/checked.png';

export const CheckBox = ({ onPress, label, style, checked, ...props }) => {
  return (
    <View style={[style, { flexDirection: 'row' }]}>
      <TouchableOpacity activeOpacity={0.9} disabled={checked} onPress={onPress}>
        <View style={{ width: 45, height: 30, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginRight: 15 }}>
          {checked && <Image source={Checked} resizeMode="contain" style={styles.checkIcon} />}
        </View>
      </TouchableOpacity>
      <Typography numberOfLines={2} style={{ paddingTop: 5 }}>{label}</Typography>
    </View>
  );
}

CheckBox.propTypes = {
  onPress: PropTypes.func,
  label: PropTypes.string,
  checked: PropTypes.bool
}

CheckBox.defaultProps = {
  onPress: () => { },
  checked: false
}

const styles = StyleSheet.create({
  checkIcon: {
    height: 15,
    width: 15
  }
});