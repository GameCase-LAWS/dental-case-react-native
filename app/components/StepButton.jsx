import React from 'react';
import { View, Animated, StyleSheet, TouchableOpacity } from 'react-native';
import { Typography } from './Typography';
import { meansure } from '../tools/resolution';

export const StepButton = ({
  title,
  step,
  currentStep,
  state,
  onPress,
  ...props
}) => {
  const growAnim = React.useRef(new Animated.Value(0)).current;
  const colorAnim = React.useRef(new Animated.Value(state)).current;

  React.useEffect(() => {
    if (currentStep > step) {
      Animated.parallel([
        Animated.timing(growAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false
        }),
        Animated.timing(colorAnim, {
          toValue: 2,
          duration: 200,
          useNativeDriver: false
        })
      ]).start();
    } else if (currentStep === step) {
      Animated.parallel([
        Animated.timing(growAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false
        }),
        Animated.timing(colorAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false
        })
      ]).start();
    }
  }, [currentStep]);

  const color = colorAnim.interpolate({
    inputRange: [0, 1, 2],
    outputRange: ['#56C1AB', '#FF8040', '#1BA488']
  });

  return (
    <View {...props}>
      <TouchableOpacity activeOpacity={0.9} onPress={onPress} disabled={currentStep !== step}>
      <View style={styles.container}>
        <Animated.View style={[styles.top, {
          borderBottomColor: color
        }]} />
        <Animated.View style={[styles.bottom, {
          height: growAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [meansure(4), meansure(5)]
          }),
          backgroundColor: color
        }]} />
        <View style={styles.absoluteContainer}>
          <Typography style={{ textAlign: 'center' }}>{title}</Typography>
        </View>
      </View>
      </TouchableOpacity>
    </View>
  );
}

StepButton.defaultProps = {
  state: 0
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    flexGrow: 1
  },
  absoluteContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: meansure(1),
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  top: {
    height: 0,
    borderBottomWidth: meansure(1),
    borderLeftWidth: meansure(1),
    borderRightWidth: meansure(1),
    borderStyle: 'solid',

    borderRightColor: 'transparent',
    borderLeftColor: 'transparent',
    backgroundColor: 'transparent'
  }
})