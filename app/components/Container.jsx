import React from 'react';
import { View } from 'react-native';
import { ThemeContext } from '../ThemeContext';

export const Container = ({ children, containerStyle, style, overflowChildren, ...props }) => {
  const { theme } = React.useContext(ThemeContext);

  return (
    <View style={[containerStyle, { flex: 1, overflow: 'hidden' }]} {...props}>
      <View style={[theme.screenContainer, style]}>
        {children}
      </View>
      {overflowChildren}
    </View>
  );
}