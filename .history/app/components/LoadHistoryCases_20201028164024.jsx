import React from "react";
import {
  Image,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import { appColors, styles } from "../styles";
import { Button } from "../components/Button";
import { CloseIcon, ArrowIcon } from "../assets/icons";
import { Grid } from "../components/Grid";
import { Typography } from "../components/Typography";
import { measure } from "../tools/resolution";

const icon = require("../assets/images/avatars/avatar_000.png");

export const LoadCases = ({ cases }) => {
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
      {cases &&
        cases.map((c, i) => (
          <View>
            <View style={{ flexDirection: "row" }}>
              <Image
                source={icon}
                style={{
                  height: measure(11),
                  width: measure(11),
                  marginRight: measure(2),
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
          </View>
        ))}
    </View>
  );
};
