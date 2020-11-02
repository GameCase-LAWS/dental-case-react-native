import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { styles, appColors, windowWidth } from "../../styles";
import { Typography } from "../../components/Typography";
import { Grid } from "../../components/Grid";
import { ArrowIcon } from "../../assets/icons";
import { measure } from "../../tools/resolution";
import { Container } from "../../components/Container";
import { Shadow } from "../../components/Shadow";

const avatars = [
  require("../../assets/images/avatars/avatar_000.png"),
  require("../../assets/images/avatars/avatar_001.png"),
  require("../../assets/images/avatars/avatar_002.png"),
  require("../../assets/images/avatars/avatar_003.png"),
  require("../../assets/images/avatars/avatar_004.png"),
  require("../../assets/images/avatars/avatar_005.png"),
];

export const AvatarScreen = ({ route, navigation, ...props }) => {
  const [paginationIndex, setPaginationIndex] = React.useState(0);

  const handlePagination = () =>
    setPaginationIndex((old) =>
      old === Math.floor(avatars.length / 3) - 1 ? 0 : ++old,
    );

  const handleAvatarSelect = (avatar) => () => {
    navigation.navigate("Gameplay", { avatar, caso: route.params.caso });
  };

  return (
    <Container
      style={{ paddingHorizontal: measure(4), paddingVertical: measure(3) }}
      containerStyle={{ backgroundColor: appColors.backgroundBlue }}
    >
      <View style={styles.topLeftGrayContainer}>
        <Typography variant='header20'>Escolha seu avatar</Typography>
      </View>

      <View
        style={[
          styles.spacedRow,
          { alignItems: "stretch", marginTop: measure(7) },
        ]}
      >
        <Grid container spacingX={measure(2)}>
          {avatars
            .slice(3 * paginationIndex, 3 * (1 + paginationIndex))
            .map((c, i) => (
              <Grid item size={4} key={i}>
                <TouchableOpacity
                  onPress={handleAvatarSelect(c)}
                  activeOpacity={0.9}
                  style={[
                    styles.avatar,
                    {
                      shadowOffset: {
                        width: 0,
                        height: 0,
                      },
                      shadowOpacity: 0.5,
                      shadowRadius: 10,
                    },
                  ]}
                >
                  <Image
                    source={c}
                    style={styles.avatar}
                    resizeMode='contain'
                  />
                </TouchableOpacity>
                {/* <CaseCard title={c.titulo} onPress={handleGameStart(c)} /> */}
              </Grid>
            ))}
        </Grid>
        <View style={styles.center}>
          {avatars.length > 3 && (
            <TouchableOpacity activeOpacity={0.9} onPress={handlePagination}>
              <ArrowIcon color='#fff' height={measure(6)} width={measure(4)} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Container>
  );
};
