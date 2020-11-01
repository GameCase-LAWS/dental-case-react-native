import { StyleSheet, Dimensions } from 'react-native';

// 16:9 Grid: 64x36m
// where 1m = 30px

export const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const widthScaler = windowWidth / 30;
const heightScaler = windowHeight / 30;

export const calcWidth = (blocks) => widthScaler * blocks;
export const calcHeight = (blocks) => heightScaler * blocks;

export const appColors = {
  primary: "#25A186",
  secondary: "#435D83",
  backgroundBlue: '#1F688C',
  cardBackground: '#77BEB3',
  cardGray: '#DDE0E3',
  activeStep: '#FF8040',
  highEmphasisBlackText: "#000000DE",
  mediumEmphasisBlackText: "#0000008A",
  disabledBlackText: "#FFFFFF61",
  highEmphasisWhiteText: "#FFFFFFDE",
  mediumEmphasisWhiteText: "#FFFFFF8A"
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 75,
    paddingVertical: 45
  },
  sideBarContainer: {
    top: 0,
    right: 0,
    bottom: 0,
    paddingVertical: 30,
    paddingHorizontal: 15,
  },
  spacedRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  screenContainer: {
    // flex: 1,
    // justifyContent: "space-between",
    // alignItems: 'stretch',
    // backgroundColor: '#fff',
    // padding: 32,
    // maxWidth: 400
  },
  banner: {
    width: 460,
    height: 280,
    maxWidth: windowWidth - 64,
    maxHeight: (windowWidth - 64) * 0.58,
    marginVertical: 32
  },
  textInput: {
    padding: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderRadius: 2,
    height: 48,
    backgroundColor: "#D7D7D7",
    borderColor: "#a1a1a1",
  },
  underscored: {
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
  },
  absoluteLeft: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }
});