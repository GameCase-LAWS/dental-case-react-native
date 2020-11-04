import React from "react";
import { View, Image, ImageBackground } from "react-native";
import { appColors } from "../styles";
import { Typography } from "../components/Typography";
import { Grid } from "../components/Grid";
import { Container } from "../components/Container";
import { CircleButton } from "../components/CircleButton";
import { BackIcon } from "../assets/icons";
import { ThemeContext } from "../ThemeContext";

const BlueBackgroundImage = require("../assets/images/blue-bg.jpg");
const CreditsImage = require("../assets/images/credits.png");

const creditsScreenplay = require("../screenplay/credits.json");

export const CreditsScreen = ({ navigation, ...props }) => {
  const { theme } = React.useContext(ThemeContext);

  function handleBack() {
    navigation.goBack();
  }

  return (
    <ImageBackground
      source={BlueBackgroundImage}
      style={theme.styles.flex}
      resizeMode='stretch'
    >
      <Container
        containerStyle={{ marginLeft: "auto", marginRight: "auto" }}
        style={{
          paddingVertical: theme.measure(1),
          justifyContent: "space-between",
        }}
      >
        <Typography
          bold
          variant='header34'
          color='#fff'
          style={{ textAlign: "center" }}
        >
          CRÉDITOS
        </Typography>

        <Grid container spacingX={40}>
          <Grid item size={6}>
            <Typography variant='header20' bold paragraph color='#fff'>
              CONCEPÇÃO GERAL DOS JOGOS DE CASOS CLÍNICOS MEDICAL/DENTAL CASES
            </Typography>
            {creditsScreenplay.general_conception.map((e, i) => (
              <View style={{ marginBottom: 16 }} key={i}>
                <Typography variant='subtitle16' bold color='#fff'>
                  {e.title}
                </Typography>
                <Typography variant='subtitle16' color='#fff'>
                  {e.text}
                </Typography>
              </View>
            ))}
          </Grid>
          <Grid item size={6}>
            <Typography variant='header20' bold paragraph color='#fff'>
              PRODUÇÃO DOS JOGOS DE CASOS CLÍNICOS MEDIAL/DENTAL CASE
            </Typography>
            {creditsScreenplay.production.map((e, i) => (
              <View style={{ marginBottom: 16 }} key={i}>
                <Typography variant='subtitle16' bold color='#fff'>
                  {e.title}
                </Typography>
                <Typography variant='subtitle16' color='#fff'>
                  {e.text}
                </Typography>
              </View>
            ))}
          </Grid>
        </Grid>

        <Image
          source={CreditsImage}
          resizeMode='contain'
          style={{ height: theme.measure(3.2) }}
        />

        <CircleButton
          size={theme.measure(3)}
          style={[
            { position: "absolute", bottom: theme.measure(2), right: 0},
            theme.styles.dropShadowCircle,
          ]}
          onPress={handleBack}
        >
          <BackIcon
            color='#000'
            width={theme.measure(1.5)}
            height={theme.measure(1.5)}
          />
        </CircleButton>
      </Container>
    </ImageBackground>
  );
};
