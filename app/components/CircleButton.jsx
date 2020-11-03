import React from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import PropTypes from 'prop-types';
import { normalize } from '../tools/functions';
import { ThemeContext } from '../ThemeContext';

export const CircleButton = ({
  size,
  onPress,
  children,
  containerStyle,
  style,
  label,
  ...props
}) => {
  const { theme } = React.useContext(ThemeContext);
  const growAnim = React.useRef(new Animated.Value(0)).current;

  const handleGrow = () => {
    Animated.timing(growAnim, {
      toValue: theme.measure(10),
      duration: 300,
      useNativeDriver: false
    }).start();
  };

  const handleRelease = () => {
    Animated.timing(growAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false
    }).start();
  }

  if (label) {
    return (
      <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={style} onLongPress={handleGrow} onPressOut={handleRelease}>
        <View on style={[styles.container, containerStyle, { minWidth: size, height: size, borderRadius: size }]} {...props}>
          <Animated.Text
            numberOfLines={1}
            style={[styles.label, { maxWidth: growAnim, marginHorizontal: theme.measure(0.25) }]}
          >{label}</Animated.Text>
          {children}
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={style}>
      <View style={[styles.container, containerStyle, { width: size, height: size, borderRadius: size }]} {...props}>
        {children}
      </View>
    </TouchableOpacity>
  );
}

CircleButton.propTypes = {
  size: PropTypes.number,
  onPress: PropTypes.func,
  label: PropTypes.string
}

CircleButton.defaultTypes = {
  size: 75,
  onPress: () => { }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    fontFamily: "roboto-regular",
    fontSize: normalize(16),
    letterSpacing: 0.15
  }
});