import React from "react";
import {
  Image,
  View,
} from "react-native";

import { Typography } from "./Typography";
import { ThemeContext } from "../ThemeContext";
import { findObjectInListByTag } from "../tools/functions";

const Row = ({ label, value, ...props }) => {
  return (
    <View style={{ flexDirection: "row" }} {...props}>
      <Typography variant='header24' bold>{`${label} `}</Typography>
      <Typography variant='header24'>{value}</Typography>
    </View>
  );
}

export const LoadHistoryCases = ({ casoSave, ...props }) => {
  const { theme } = React.useContext(ThemeContext);

  return (
    <View style={{ flexDirection: "row", marginBottom: theme.measure(1) }} {...props}>
      <Image
        source={{ uri: casoSave.caso_image }}
        style={{
          height: theme.measure(11),
          width: theme.measure(11),
          marginRight: theme.measure(2),
        }}
        resizeMode='contain'
      />
      <View style={{ flexGrow: 1, flexShrink: 1 }}>
        {/* <Typography paragraph variant="header24" bold>{casoSave.caso_nome}</Typography> */}
        <Row label={'Data:'} value={casoSave.data?.toDate().toLocaleString()} />
        <Row label={'Paciente:'} value={casoSave.paciente_nome} />
        <Row label={'Diagnóstico:'} value={casoSave.selections?.diagnostico?.texto} />
        <Row label={'Pontuação:'} value={Object.values(casoSave.pontuacao).reduce((prev, curr) => prev + curr, 0).toLocaleString('pt-br')} />
      </View>
    </View>
  );
};
