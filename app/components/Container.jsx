import React, { Children } from 'react';
import { View } from 'react-native';
import { ScreenContext } from '../ScreenContextProvider';

export const Container = ({ children, containerStyle, style, overflowChildren, ...props }) => {
  const {screenContainer} = React.useContext(ScreenContext)
  return (
    <View style={[containerStyle, { flex: 1, overflow: 'hidden' }]} {...props}>
      <View style={[screenContainer, style]}>
        {children}
      </View>
      {overflowChildren}
    </View>
  );
}