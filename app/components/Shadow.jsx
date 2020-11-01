import React from "react";
import { Children } from "react";
import { View, Text } from "react-native";
import { styles } from "../styles";

export const Shadow = ({
  props,
  children,
  shadowOffset,
  shadowRadius,
  shadowOpacity,
}) => {
  return (
     <>
     {children && children.map((e,k) => React.cloneElement(e,))}
     </> 
    // <View
    //   style={[
    //     {
    //       shadowOffset: {
    //         width: shadowOffset[0],
    //         height: -shadowOffset[1],
    //       },
    //       shadowOpacity,
    //       shadowRadius,
    //     },
    //   ]}
    // >
    // {children}
    // </View>
  );
};

export default Shadow;
