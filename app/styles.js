import { StyleSheet, Dimensions } from 'react-native';
import { meansure } from './tools/resolution';

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
  flex: {
    flex: 1,
    backgroundColor: 'purple'
  },
  container: {
    flex: 1,
    paddingHorizontal: 75,
    paddingVertical: 45
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
  topLeftGrayContainer: {
    backgroundColor: appColors.cardGray,
    padding: meansure(1),
    borderRadius: meansure(1),
    justifyContent: 'center',
    width: meansure(23),
    height: meansure(5)
  },
  button: {
    height: meansure(4)
  },
  scoreBar: {
    position: 'absolute',
    right: meansure(2),
    top: meansure(2),
    borderRadius: meansure(1),
    backgroundColor: appColors.cardGray,
    overflow: 'hidden',
    flexDirection: 'column-reverse',
    width: meansure(2),
    height: meansure(16)
  },
  feedbackBox: {
    position: 'absolute',
    right: meansure(7),
    bottom: meansure(19),
    width: meansure(20),
    paddingHorizontal: meansure(2),
    paddingVertical: meansure(1),
    minHeight: meansure(6),
    // alignItems: 'center',
    justifyContent: 'center',
    borderRadius: meansure(2)
  },
  avatar: {
    width: meansure(15),
    height: meansure(15),
    borderRadius: meansure(1)
  },
  circlePadding: {
    paddingRight: meansure(0.5)
  }
});