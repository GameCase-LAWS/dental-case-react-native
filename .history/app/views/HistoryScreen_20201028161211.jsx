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

import { appColors, styles } from "../styles";
import { Button } from "../components/Button";
import { CloseIcon, ArrowIcon } from "../assets/icons";
import { Cases } from "../services/firestore";
import { Grid } from "../components/Grid";
import { Typography } from "../components/Typography";
import { measure } from "../tools/resolution";
import { LoadCases } from "../components/LoadCases";

const icon = require("../assets/images/avatars/avatar_000.png");

export const HistoryScreen = () => {
  const [cases, setCases] = React.useState(0);
  const [paginationIndex, setPaginationIndex] = React.useState(0);

  React.useEffect(() => {
    async function loadCasesAsync() {
      await Cases.show()
        .then((docs) => {
          // setLoadedCases(docs);
          setCases(
            docs.map((c) => (
              <CaseHistory
                title={c.titulo}
                onPress={handleGameStart(c)}
                image={
                  findObjectInListByTag(
                    c.imagens,
                    "identificador",
                    "card-header",
                  ).arquivo
                }
              />
            )),
          );
          // setLoadedCases(require('../test/cases.json'));
        })
        .catch((e) => {
          Alert.alert("Não foi possível carregar os casos");
          console.error(e);
        });
    }
    loadCasesAsync();
  }, []);

  console.log(cases);

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
        Histórico dos atendimentos
      </Typography>

      <LoadCases cases={cases} />
    </View>
  );
};
