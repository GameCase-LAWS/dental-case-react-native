import React from 'react';
import { View, Image, ImageBackground } from 'react-native';
import { styles, appColors } from '../styles';
import { Typography } from '../components/Typography';
import { Grid } from '../components/Grid';
import { Container } from '../components/Container';
import { meansure } from '../tools/resolution';
import { CircleButton } from '../components/CircleButton';
import { BackIcon } from '../assets/icons';

const BlueBackgroundImage = require('../assets/images/blue-bg.jpg');
const CreditsImage = require('../assets/images/credits.png');

const creditsScreenplay = require('../screenplay/credits.json');

export const CreditsScreen = ({ navigation, ...props }) => {

  function handleBack() {
    navigation.goBack();
  }

  return (
    <ImageBackground source={BlueBackgroundImage} style={styles.flex} resizeMode="stretch">
      <Container containerStyle={{ marginLeft: 'auto', marginRight: 'auto' }} style={{ paddingVertical: meansure(1), justifyContent: 'space-between' }}>
        <Typography bold variant="header34" color="#fff" style={{ textAlign: 'center' }}>CRÉDITOS</Typography>

        <Grid container spacingX={40}>
          <Grid item size={6}>
            <Typography variant="header20" bold paragraph color="#fff">CONCEPÇÃO GERAL DOS JOGOS DE CASOS CLÍNICOS MEDICAL/DENTAL CASES</Typography>
            {creditsScreenplay.general_conception.map((e, i) => (
              <View style={{ marginBottom: 16 }} key={i}>
                <Typography variant="subtitle16" bold color="#fff">{e.title}</Typography>
                <Typography variant="subtitle16" color="#fff">{e.text}</Typography>
              </View>
            ))}
          </Grid>
          <Grid item size={6}>
            <Typography variant="header20" bold paragraph color="#fff">PRODUÇÃO DOS JOGOS DE CASOS CLÍNICOS MEDIAL/DENTAL CASE</Typography>
            {creditsScreenplay.production.map((e, i) => (
              <View style={{ marginBottom: 16 }} key={i}>
                <Typography variant="subtitle16" bold color="#fff">{e.title}</Typography>
                <Typography variant="subtitle16" color="#fff">{e.text}</Typography>
              </View>
            ))}
          </Grid>
        </Grid>

        <Image source={CreditsImage} resizeMode='contain' style={{ height: meansure(3.2) }} />

        <CircleButton size={meansure(3)} style={{ position: 'absolute', bottom: meansure(2), right: 0 }} onPress={handleBack}>
          <BackIcon color='#000' width={meansure(1.5)} height={meansure(1.5)} />
        </CircleButton>
      </Container>
    </ImageBackground>
  );
}