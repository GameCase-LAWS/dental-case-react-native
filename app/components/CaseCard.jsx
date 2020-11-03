import React from 'react';
import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Typography } from "./Typography";
import { ThemeContext } from '../ThemeContext';

const defaultSource = require('../assets/icons/icon.png');

export const CaseCard = ({ title, image, onPress }) => {
  const { theme } = React.useContext(ThemeContext);
  const [marginBottom, setMarginBottom] = React.useState(theme.measure(1));

  const handleLoad = () => {
    setMarginBottom(0);
  }

  return (
    <View style={theme.styles.componentCaseCard_caseCard}>
      <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={{ flex: 1 }}>
        <Image onLoad={handleLoad} source={image} defaultSource={defaultSource} style={[theme.styles.componentCaseCard_cardImage, { marginBottom }]} />
        <View style={theme.styles.componentCaseCard_textContainer}>
          <Typography bold variant='subtitle16' style={{ textAlign: 'center' }}>{title}</Typography>
        </View>
      </TouchableOpacity>
    </View>
  );
}

CaseCard.propTypes = {
  title: PropTypes.string
};

CaseCard.defaultProps = {
  title: ''
};