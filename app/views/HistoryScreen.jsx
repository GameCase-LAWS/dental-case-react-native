import React from "react";
import {
  Image,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";

import { appColors, windowHeight, windowWidth } from "../styles";
import { Button } from "../components/Button";
import { CloseIcon, ArrowIcon } from "../assets/icons";
import { Cases } from "../services/firestore";
import { Grid } from "../components/Grid";
import { Typography } from "../components/Typography";
import { LoadHistoryCases } from "../components/LoadHistoryCases";
import { ThemeContext } from "../ThemeContext";

const icon = require("../assets/images/avatars/avatar_000.png");

export const HistoryScreen = ({ navigation, ...props }) => {
  const { theme } = React.useContext(ThemeContext);

  const [pageIndex, setPageIndex] = React.useState(0);
  const [cases, setCases] = React.useState([
    {
      data: "25/09/2019",
      paciente: "Nathyane",
      diagnostico: "cancer",
      pontuacao: "120",
    },
    {
      data: "25/09/2018",
      paciente: "Alexandre",
      diagnostico: "diabetes",
      pontuacao: "120",
    },
    {
      data: "25/09/2020",
      paciente: "Aline",
      diagnostico: "cancer",
      pontuacao: "120",
    },
    {
      data: "25/09/2018",
      paciente: "Alexandre",
      diagnostico: "diabetes",
      pontuacao: "120",
    },
    {
      data: "25/09/2018",
      paciente: "Alexandre",
      diagnostico: "diabetes",
      pontuacao: "120",
    },
  ]);

  const handlePagination = () => setPageIndex(old => old === Math.ceil(cases.length / 2) - 1 ? 0 : ++old);

  React.useEffect(() => {

  }, []);

  console.log(cases);

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
      <TouchableOpacity
        activeOpacity={0.9}
        style={{ position: "absolute", right: 15, top: 15 }}
        onPress={navigation.goBack}
      >
        <CloseIcon color={appColors.primary} height={30} width={30} />
      </TouchableOpacity>

      <Typography paragraph variant='header34' style={{ textAlign: "center" }}>
        Histórico dos atendimentos
      </Typography>

      <TouchableOpacity
        style={{
          width: theme.measure(4),
          height: theme.measure(6),
          position: "absolute",
          right: theme.measure(3),
          top: windowHeight / 2,
          zIndex: 1,
        }}
        onPress={handlePagination}
      >
        <ArrowIcon color='#D5D5D5' />
      </TouchableOpacity>

      <LoadHistoryCases cases={cases} pageIndex={pageIndex} />
    </View>
  );
};
