import React from 'react';
import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { Typography } from "./Typography";

export const CaseCard = ({ title, onPress }) => {
  return (
    <View style={styles.caseCard}>
      <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
        <View>
          <Image source={{ uri: 'https://www.justica.gov.br/imagens/coracao.png/@@images/image.png' }} style={{
            minHeight: 200,
            resizeMode: 'contain'
          }} />
        </View>
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
    borderRadius: 30
  },
  textContainer: {
    padding: 15,
    height: 72,
    backgroundColor: '#DDE0E3',
    justifyContent: "center",
    alignItems: "center"
  }
});