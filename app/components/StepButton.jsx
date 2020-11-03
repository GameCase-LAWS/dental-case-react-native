import React from 'react';
import { View, Animated, StyleSheet, TouchableOpacity } from 'react-native';
import { Typography } from './Typography';
import { ThemeContext } from '../ThemeContext';

export const StepButton = ({
  title,
  step,
  currentStep,
  state,
  onPress,
  ...props
}) => {
  const { theme } = React.useContext(ThemeContext);

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
      <View style={theme.styles.componentStepButtonContainer}>
        <Animated.View style={[theme.styles.componentStepButtonTop, {
          borderBottomColor: color
        }]} />
        <Animated.View style={{
          height: growAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [theme.measure(4), theme.measure(5)]
          }),
          backgroundColor: color
        }} />
        <View style={theme.styles.componentStepButtonAbsoluteContainer}>
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