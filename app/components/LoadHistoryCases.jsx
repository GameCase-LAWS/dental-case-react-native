import React from "react";
import {
  Image,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import { appColors } from "../styles";
import { Button } from "./Button";
import { CloseIcon, ArrowIcon } from "../assets/icons";
import { Grid } from "./Grid";
import { Typography } from "./Typography";
import { ThemeContext } from "../ThemeContext";

const icon = require("../assets/images/avatars/avatar_000.png");

export const LoadHistoryCases = ({ cases, pageIndex }) => {
  const { theme } = React.useContext(ThemeContext);

  return (
    <View
      style={[
        theme.styles.container,
        {
          backgroundColor: "#fff",
          position: "relative",
          paddingHorizontal: 90,
          paddingVertical: 15,
        },
      ]}
    >
      {cases &&
        cases
          .slice(2 * pageIndex, 2 * (1 + pageIndex))
          .map((c, i) => (
            <View style={{ flexDirection: "row", marginBottom: theme.measure(1) }}>
              <Image
                source={icon}
                style={{
                  height: theme.measure(11),
                  width: theme.measure(11),
                  marginRight: theme.measure(2),
                }}
                resizeMode='contain'
              />
              <View>
                <View style={{ flexDirection: "row" }} key={i}>
                  <Typography variant='header24' bold>
                    Data:
                </Typography>
                  <Typography variant='header24'> {c.data}</Typography>
                </View>
                <View style={{ flexDirection: "row" }} key={i}>
                  <Typography variant='header24' bold>
                    Paciente:
                </Typography>
                  <Typography variant='header24'> {c.paciente}</Typography>
                </View>
                <View style={{ flexDirection: "row" }} key={i}>
                  <Typography variant='header24' bold>
                    Diagnóstico
                </Typography>
                  <Typography variant='header24'> {c.diagnostico}</Typography>
                </View>
                <View style={{ flexDirection: "row" }} key={i}>
                  <Typography variant='header24' bold>
                    Pontuação:
                </Typography>
                  <Typography variant='header24'> {c.pontuacao}</Typography>
                </View>
              </View>
            </View>
          ))}
    </View>
  );
};
