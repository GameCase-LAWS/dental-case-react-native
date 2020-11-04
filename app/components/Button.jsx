import React from "react";
import { View, TouchableHighlight, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { appColors } from "../styles";
import { Typography } from "./Typography";
import { ThemeContext } from "../ThemeContext";

export function Button({
  label,
  disabled,
  style,
  onPress,
  icon,
  buttonStyle,
  textColor,
  fontVariant,
}) {
  const { theme } = React.useContext(ThemeContext);

  return (
    <View style={[theme.styles.componentButtonStyle, buttonStyle]}>
      <TouchableHighlight
        style={{ flex: 1 }}
        onPress={onPress}
        disabled={disabled}
        underlayColor='white'
      >
        {icon ? (
          <View style={[theme.styles.componentButtonWithIcon, style]}>
            {icon}
            <Typography
              variant='button14'
              color={textColor}
              style={{ marginLeft: 8, textAlign: "center" }}
            >
              {label}
            </Typography>
          </View>
        ) : (
          <View
            style={[
              disabled
                ? theme.styles.componentButtonDisabled
                : theme.styles.componentButton,
              style,
            ]}
          >
            <Typography
              bold
              variant={fontVariant || "button14"}
              color={appColors.highEmphasisWhiteText}
            >
              {label}
            </Typography>
          </View>
        )}
      </TouchableHighlight>
    </View>
  );
}

Button.propTypes = {
  label: PropTypes.string,
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
};

Button.defaultProps = {
  disabled: false,
  onPress: () => {},
};
