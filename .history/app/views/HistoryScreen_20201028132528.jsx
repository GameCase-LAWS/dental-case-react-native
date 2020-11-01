import React from "react";
import { Image, Text, View, TextInput, SafeAreaView } from "react-native";

import { appColors, styles } from "../../styles";
import { Button } from "../../components/Button";
import { Typography } from "../../components/Typography";

export const HistoryScreen = () => {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: "#fff",
          position: "relative",
          paddingHorizontal: 90,
          paddingVertical: 15,
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        style={{ position: "absolute", right: 15, top: 15 }}
      >
        <CloseIcon color={appColors.primary} height={30} width={30} />
      </TouchableOpacity>

      <Typography paragraph variant='header34' style={{ textAlign: "center" }}>
        Configurações
      </Typography>
      <View>
        {/* Sons */}
        <View style={{ flexDirection: "row" }}>
          <View style={{ width: 200 }}>
            <Typography variant='header24'>Sons</Typography>
          </View>
          <Grid container spacingX={15} style={{ flexGrow: 1 }}>
            <Grid item size={6}>
              <Button label='On' />
            </Grid>
            <Grid item size={6}>
              <Button label='On' />
            </Grid>
          </Grid>
        </View>
        {/* Vibração */}
        <View style={{ flexDirection: "row" }}>
          <View style={{ width: 200 }}>
            <Typography variant='header24'>Sons</Typography>
          </View>
          <Grid container spacingX={15} style={{ flexGrow: 1 }}>
            <Grid item size={6}>
              <Button label='On' />
            </Grid>
            <Grid item size={6}>
              <Button label='On' />
            </Grid>
          </Grid>
        </View>
        {/* Língua */}
        <View style={{ flexDirection: "row" }}>
          <View style={{ width: 200 }}>
            <Typography variant='header24'>Sons</Typography>
          </View>
          <View style={{ flexGrow: 1 }}>
            <Button label='Português' buttonStyle={{ flexGrow: 1 }} />
            <Button label='Espanhol' buttonStyle={{ flexGrow: 1 }} />
            <Button label='Inglês' buttonStyle={{ flexGrow: 1 }} />
            <Button label='Fale Conosco' buttonStyle={{ flexGrow: 1 }} />
          </View>
        </View>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {loadedCases &&
          loadedCases.slice(3 * paginationIndex, 3 * (1 + paginationIndex))}
        {/* .map((case) => <CaseCard title={case.titulo} />)} */}
      </View>
      {loadedCases && loadedCases.length > 3 && <View />}
    </View>
  );
};
