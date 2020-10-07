import React from 'react';
import { View, Image, ImageBackground } from 'react-native';
import { styles, appColors } from '../styles';
import { Typography } from '../components/Typography';
import { Grid } from '../components/Grid';

const BlueBackgroundImage = require('../assets/images/blue-bg.jpg');
const CreditsImage = require('../assets/images/credits.png');

export const CreditsScreen = ({ navigation, ...props }) => {
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={BlueBackgroundImage} style={styles.container} resizeMode="stretch">
        <View style={{justifyContent: 'space-between', flex: 1}}>
          <Typography variant="header34" color="#fff" style={{ textAlign: 'center' }}>CRÉDITOS</Typography>
          <Grid container spacingX={40}>
            <Grid item size={6}>
              <Typography variant="header24" bold paragraph color="#fff">CONCEPÇÃO GERAL DOS JOGOS DE CASOS CLÍNICOS MEDICAL/DENTAL CASES</Typography>
              {[
                {
                  title: 'Concepção de projeto:',
                  text: 'Dra. Ana Emília O. Figueiredo (UNA-SUS/UFMA), Dra Ana Estela Haddad (FOUSP/USP), Dra. Carla G. Spinillo (LabDSI/UFPR); Dra. Geise Garrido (FOUSP/USP), Dra. Luciane Maria Oliveira Brito (UFMA); Dra. Maria Betânia da Costa Chein (UFMA)'
                },
                {
                  title: 'Concepção de Game Design:',
                  text: 'Dra. Daniela Munhoz, Dra. Luciane Fadel, Ba. Marcelo Satoshi Taguchi, Ba. Alan Palomero Machado (LabDSI/UFPR)'
                }, {
                  title: 'Concepção do design de interface:',
                  text: 'Dra. Carla G. Spinillo e Ba. Larissa U. Mazza (LabDSI/UFPR)'
                },
                {
                  title: 'Concepção de conteúdo do banco de dados:',
                  text: 'Dra. Luciane Fadel, Dra. Daniella Munhoz e Dra. Carla G. Spinillo (LabDSI/UFPR)'
                },
                {
                  title: 'Elaboração do GDD (Game Design Document):',
                  text: 'Dra. Daniella Munhoz, Dra. Luciane Fadel, Dra. Carla G. Spinillo e Ba. Larrisa U. Mazza (LabDSI/UFPR)'
                }
              ].map((e, i) => (
                <View style={{ marginBottom: 16 }} key={i}>
                  <Typography variant="header24" bold color="#fff">{e.title}</Typography>
                  <Typography variant="header24" color="#fff">{e.text}</Typography>
                </View>
              ))}
            </Grid>
            <Grid item size={6}>
              <Typography variant="header24" bold paragraph color="#fff">PRODUÇÃO DOS JOGOS DE CASOS CLÍNICOS MEDIAL/DENTAL CASE</Typography>
              {[
                {
                  title: 'Gerência de Projeto:',
                  text: 'Dr. Mário Meireles Teixeira (LAWS/UFMA); Me. Alana Oliveira (LAWS/UFMA)'
                },
                {
                  title: 'Game Case Admin:',
                  text: 'Me. Alana Oliveira'
                }, {
                  title: 'Abertura:',
                  text: 'Me. Camila Santos de Castro e Lima (UNA-SUS/UFMA) e Antonio Thadeu Coelho (UFMA)'
                },
                {
                  title: 'Programação:',
                  text: 'Ba. Alexandre Aragão (UFMA); Claudiny Priscilla Lopes; Antonio Thadeu Coelho; Leandro Masetti; Nikolas Oliveira'
                },
                {
                  title: 'Banco de imagens (personagens e cenários):',
                  text: 'Me. Camila Santos de Castro e Lima (UNA-SUS/UFMA) e Dra. Carla G. Spinillo (LabDSI/UFPR)'
                }
              ].map((e, i) => (
                <View style={{ marginBottom: 16 }} key={i}>
                  <Typography variant="header24" bold color="#fff">{e.title}</Typography>
                  <Typography variant="header24" color="#fff">{e.text}</Typography>
                </View>
              ))}
            </Grid>
          </Grid>
          <Image source={CreditsImage} resizeMode='contain' style={{ height: 56 }} />
        </View>
      </ImageBackground>
    </View>
  );
}