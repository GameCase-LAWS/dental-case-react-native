import React, { Children } from 'react';
import { View } from 'react-native';
import { screenContainer } from '../tools/resolution';

export const Container = ({ children, containerStyle, style, overflowChildren, ...props }) => {
  return (
    <View style={[containerStyle, { flex: 1, overflow: 'hidden' }]} {...props}>
      <View style={[screenContainer, style]}>
        {children}
      </View>
      {overflowChildren}
    </View>
  );
}