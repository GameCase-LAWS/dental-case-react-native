import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { appColors, windowWidth } from "../../styles";
import { Typography } from "../../components/Typography";
import { Grid } from "../../components/Grid";
import { ArrowIcon } from "../../assets/icons";
import { Container } from "../../components/Container";
import { ThemeContext } from "../../ThemeContext";

const avatars = [
  require("../../assets/images/avatars/avatar_000.png"),
  require("../../assets/images/avatars/avatar_001.png"),
  require("../../assets/images/avatars/avatar_002.png"),
  require("../../assets/images/avatars/avatar_003.png"),
  require("../../assets/images/avatars/avatar_004.png"),
  require("../../assets/images/avatars/avatar_005.png"),
];

export const AvatarScreen = ({ route, navigation, ...props }) => {
  const { theme } = React.useContext(ThemeContext);

  const [paginationIndex, setPaginationIndex] = React.useState(0);

  const handlePagination = () =>
    setPaginationIndex((old) =>
      old === Math.ceil(avatars.length / 3) - 1 ? 0 : ++old,
    );

  const handleAvatarSelect = (avatar) => () => {
    navigation.navigate("Gameplay", { avatar, caso: route.params.caso });
  };

  return (
    <Container
      style={{
        paddingHorizontal: theme.measure(4),
        paddingVertical: theme.measure(3),
      }}
      containerStyle={{ backgroundColor: appColors.backgroundBlue }}
    >
      <View style={theme.styles.topLeftGrayContainer}>
        <Typography variant='header20'>Escolha seu avatar</Typography>
      </View>

      <View style={{ justifyContent: "center", flexGrow: 1 }}>
        <View style={[theme.styles.spacedRow, { alignItems: "stretch" }]}>
          <Grid container spacingX={theme.measure(2)}>
            {avatars
              .slice(3 * paginationIndex, 3 * (1 + paginationIndex))
              .map((c, i) => (
                <Grid item size={4} key={i}>
                  <TouchableOpacity
                    onPress={handleAvatarSelect(c)}
                    activeOpacity={0.9}
                    style={[theme.styles.dropShadow, { borderRadius:theme.measure(1) }]}
                  >
                    <Image
                      source={c}
                      style={theme.styles.avatar}
                      resizeMode='contain'
                    />
                  </TouchableOpacity>
                  {/* <CaseCard title={c.titulo} onPress={handleGameStart(c)} /> */}
                </Grid>
              ))}
          </Grid>
          <View style={theme.styles.center}>
            {avatars.length > 3 && (
              <TouchableOpacity activeOpacity={0.9} onPress={handlePagination}>
                <ArrowIcon
                  color='#fff'
                  height={theme.measure(6)}
                  width={theme.measure(4)}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Container>
  );
};
