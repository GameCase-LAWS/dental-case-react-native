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
import { CloseIcon, ArrowIcon } from "../assets/icons";
import { Typography } from "../components/Typography";
import { LoadHistoryCases } from "../components/LoadHistoryCases";
import { ThemeContext } from "../ThemeContext";
import { Container } from "../components/Container";
import { Attendance } from "../services/firestore";
import { UserContext } from "../UserContext";

export const HistoryScreen = ({ navigation, ...props }) => {
  const { theme } = React.useContext(ThemeContext);
  const { user } = React.useContext(UserContext);

  const [pageIndex, setPageIndex] = React.useState(0);
  const [casosSaves, setCasosSaves] = React.useState();

  React.useEffect(() => {
    Attendance.index(user?.id)
      .then(saves => setCasosSaves(saves))
      .catch(e => {
        console.warn(e);
      });
  }, []);

  const handlePagination = () => setPageIndex(old => old === Math.ceil(casosSaves.length / 2) - 1 ? 0 : ++old);

  return (
    <Container
      containerStyle={{ backgroundColor: "#D9DBD5" }}
      style={{ justifyContent: 'center', alignItems: 'center' }}
    >
      <View style={{ paddingHorizontal: theme.measure(4), paddingVertical: theme.measure(1), backgroundColor: '#fff', width: theme.measure(48), height: theme.measure(32) }}>
        <TouchableOpacity
          activeOpacity={0.9}
          style={{ position: "absolute", right: theme.measure(1), top: theme.measure(1) }}
          onPress={navigation.goBack}
        >
          <CloseIcon color={appColors.primary} height={theme.measure(2)} width={theme.measure(2)} />
        </TouchableOpacity>

        <Typography variant='header34'
          style={{ textAlign: "center", marginBottom: theme.measure(2) }}
          color={appColors.primary}
        >
          Histórico dos atendimentos
        </Typography>

        {casosSaves?.length > 2 && (
          <TouchableOpacity
            style={{
              position: "absolute",
              right: theme.measure(3),
              bottom: 0,
              top: 0,
              zIndex: 1,
              justifyContent: 'center'
            }}
            activeOpacity={0.9}
            onPress={handlePagination}
          >
            <ArrowIcon color='#D5D5D5' width={theme.measure(4)} height={theme.measure(6)} />
          </TouchableOpacity>
        )}

        {casosSaves?.slice(2 * pageIndex, 2 * (1 + pageIndex)).map((casoSave, key) => <LoadHistoryCases casoSave={casoSave} key={key} />)}
      </View>
    </Container>
  );
};
