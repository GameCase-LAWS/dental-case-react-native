import React from 'react';
import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { Typography } from "./Typography";
import { meansure } from '../tools/resolution';

const defaultSource = require('../assets/icons/icon.png');

export const CaseCard = ({ title, image, onPress }) => {
  const [marginBottom, setMarginBottom] = React.useState(meansure(1));

  const handleLoad = () => {
    setMarginBottom(0);
  }

  return (
    <View style={styles.caseCard}>
      <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={{ flex: 1 }}>
        <Image onLoad={handleLoad} source={image} defaultSource={defaultSource} style={[styles.cardImage, { marginBottom }]} />
        <View style={styles.textContainer}>
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

const styles = StyleSheet.create({
  caseCard: {
    overflow: 'hidden',
    backgroundColor: '#77BEB3',
    borderRadius: meansure(1),
    height: meansure(15),
    width: meansure(15)
  },
  textContainer: {
    padding: meansure(1),
    height: meansure(6),
    backgroundColor: '#DDE0E3',
    justifyContent: "center",
    alignItems: "center"
  },
  cardImage: {
    flexGrow: 1,
    marginTop: meansure(1),
    resizeMode: 'contain'
  }
});