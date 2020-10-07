import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { styles, appColors, windowWidth } from '../../styles';
import { Typography } from '../../components/Typography';
import { Grid } from '../../components/Grid';
import { ArrowIcon } from '../../assets/icons';

const avatars = [
  require('../../assets/images/avatars/avatar_000.png'),
  require('../../assets/images/avatars/avatar_001.png'),
  require('../../assets/images/avatars/avatar_002.png'),
  require('../../assets/images/avatars/avatar_003.png'),
  require('../../assets/images/avatars/avatar_004.png'),
  require('../../assets/images/avatars/avatar_005.png')
];

export const AvatarScreen = ({ navigation, ...props }) => {
  const [paginationIndex, setPaginationIndex] = React.useState(0);

  const handlePagination = () => setPaginationIndex(old => old === Math.floor(avatars.length / 3) - 1 ? 0 : ++old);

  const handleAvatarSelect = (avatar) => () => {
    navigation.navigate("Gameplay", { avatar });
  }

  return (
    <View style={[styles.container, { backgroundColor: appColors.backgroundBlue }]}>
      <View style={{
        backgroundColor: appColors.cardGray,
        padding: 30,
        borderRadius: 15,
        width: 345,
        height: 75
      }}>
        <Typography bold>Escolha seu avatar</Typography>
      </View>
      <View style={[styles.spacedRow, { alignItems: 'stretch', marginTop: 90 }]}>
        <Grid container spacingX={20} style={{ width: windowWidth - 240 }}>
          {avatars.slice(3 * paginationIndex, 3 * (1 + paginationIndex))
            .map((c, i) =>
              <Grid item size={4} key={i}>
                <TouchableOpacity onPress={handleAvatarSelect(c)} activeOpacity={0.9}>
                  <Image source={c} style={{ width: 300, height: 300, borderRadius: 16 }} resizeMode="contain" />
                </TouchableOpacity>
                {/* <CaseCard title={c.titulo} onPress={handleGameStart(c)} /> */}
              </Grid>
            )
          }
        </Grid>
        <View style={styles.center}>
          {avatars.length > 3 && (
            <TouchableOpacity activeOpacity={0.9} onPress={handlePagination}>
              <ArrowIcon color='#fff' height={90} width={60} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}