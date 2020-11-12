import React from "react";
import { View, Animated, TouchableOpacity } from "react-native";
import { ThemeContext } from "../ThemeContext";
import { ArrowIcon } from "../assets/icons";
import { CheckBox } from "./CheckBox";
import { Typography } from "./Typography";

export const SpeechThink = ({
  isSpeech,
  showText,
  text,
  arrowBlink,
  onArrowClick,
  showArrow,
  options,
  onOptionPress,
  styles,
  ...props
}) => {
  const { theme } = React.useContext(ThemeContext);
  const fadeAnim = React.useRef(new Animated.Value(1)).current;
  const [blinkAnim, setBlinkAnim] = React.useState();

  const zIndex = isSpeech ? -1 : 1;
  const backgroundColor = isSpeech ? "#ACDCCE" : "#FFF";

  if (arrowBlink && !blinkAnim) {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.2,
          duration: 600,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
        }),
      ]),
    );

    setBlinkAnim(anim);
    anim.start();
  }

  const endBlink = () => {
    if (blinkAnim) {
      blinkAnim.stop();
      fadeAnim.setValue(1);
      setBlinkAnim();
    }
  };

  const handleArrowClick = () => {
    endBlink();
    onArrowClick();
  };

  const handleOptionClick = (i) => () => {
    onOptionPress(i);
  };

  return (
    <View style={[
      theme.styles.GameScreenPlayerSpeechThinkBox,
      theme.styles.dropShadow,
      { zIndex, backgroundColor, paddingLeft: theme.measure(isSpeech ? 6 : 4) },
      styles
    ]}>
      <View style={[theme.styles.spacedRow, { flexGrow: 1 }]}>
        {showText ? (
          <View style={{ flexShrink: 1, justifyContent: "center" }}>
            <Typography variant='header34'>{text}</Typography>
          </View>
        ) : (
          <View style={{ flexShrink: 1, justifyContent: "space-between" }}>
            {options.map((option, i) => (
              <CheckBox
                backgroundColor={isSpeech ? "#FFF" : "#ACDCCE"}
                label={option.texto}
                onPress={handleOptionClick(i)}
                checked={option.checked}
                style={{ flexGrow: 1 }}
                key={i}
              />
            ))}
          </View>
        )}
        {/* <View style={{ flexShrink: 1, justifyContent: 'center' }}>
                  <Typography variant="header34">Olá! Como você se chama?</Typography>
                </View> */}

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginLeft: theme.measure(2),
          }}
        >
          {showArrow && (
            <Animated.View style={{ opacity: fadeAnim }}>
              <TouchableOpacity activeOpacity={0.9} onPress={handleArrowClick}>
                <ArrowIcon
                  color='#1BA488'
                  width={theme.measure(4)}
                  height={theme.measure(6)}
                />
              </TouchableOpacity>
            </Animated.View>
          )}
        </View>
      </View>
    </View>
  );
};
