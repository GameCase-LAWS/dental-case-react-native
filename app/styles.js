import { StyleSheet, Dimensions } from 'react-native';
// import { measure } from './tools/resolution';

// 16:9 Grid: 64x36m
// where 1m = 30px

export const { width: windowWidth, height: windowHeight } = Dimensions.get('window');
export const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');


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
  mediumEmphasisWhiteText: "#FFFFFF8A",
  stokeBlue: "#007ACD"
};

export const makeStyles = (measure) => StyleSheet.create({
  flex: {
    flex: 1,
    // backgroundColor: 'purple'
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
  dropShadowCircle: {
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    borderRadius:measure(2)
  },
  dropShadow: {
    
    // shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  banner: {
    width: 460,
    height: 280,
    maxWidth: windowWidth - 64,
    maxHeight: (windowWidth - 64) * 0.58,
    marginVertical: 32
  },
  textInput: {
    paddingHorizontal: 8,
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
    padding: measure(1),
    borderRadius: measure(1),
    justifyContent: 'center',
    width: measure(23),
    height: measure(5)
  },
  button: {
    height: measure(4)
  },
  scoreBar: {
    position: 'absolute',
    right: measure(2),
    top: measure(2),
    borderRadius: measure(1),
    backgroundColor: appColors.cardGray,
    overflow: 'hidden',
    flexDirection: 'column-reverse',
    width: measure(2),
    height: measure(16)
  },
  feedbackBox: {
    position: 'absolute',
    right: measure(7),
    bottom: measure(19),
    width: measure(20),
    paddingHorizontal: measure(2),
    paddingVertical: measure(1),
    minHeight: measure(6),
    // alignItems: 'center',
    justifyContent: 'center',
    borderRadius: measure(2)
  },
  avatar: {
    width: measure(15),
    height: measure(15),
    borderRadius: measure(1)
  },
  circlePadding: {
    paddingRight: measure(0.5)
  },

  GameScreenAvatar: {
    width: measure(13),
    height: measure(13),
    borderRadius: measure(1),
    elevation: 3
  },
  GameScreenAvatarContainer: {
    borderRadius: measure(1),
    position: 'absolute',
    left: measure(2),
    bottom: measure(7)
  },
  GameScreenPlayerSpeechThinkBox: {
    position: 'absolute',
    right: measure(2),
    left: measure(10),
    bottom: measure(7),
    height: measure(9),
    paddingRight: measure(3),
    paddingVertical: measure(1),
    borderRadius: measure(4),
    elevation: 3,
    // shadowOffset: {
    //   width: 0,
    //   height: 2
    // },
    // shadowOpacity: 0.8
  },
  GameScreenThinkCircles: {
    width: measure(4),
    height: measure(4),
    resizeMode: 'contain',
    position: 'absolute',
    right: 0,
    top: 0
  },

  componentButtonStyle: {
    borderRadius: measure(0.5),
    overflow: 'hidden'
  },
  componentButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    flex: 1,
    backgroundColor: appColors.primary,
    color: appColors.highEmphasisWhiteText
  },
  componentButtonDisabled: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: '#84D0C3',
    color: appColors.highEmphasisWhiteText
  },
  componentButtonWithIcon: {
    flexDirection: 'row',
    paddingRight: 32,
    paddingLeft: 16,
    paddingVertical: 16,
    alignItems:'center'
  },

  componentStepButtonContainer: {
    alignItems: 'stretch',
    flexGrow: 1
  },
  componentStepButtonAbsoluteContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: measure(1),
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  componentStepButtonTop: {
    height: 0,
    borderTopLeftRadius:measure(8),
    borderBottomWidth: measure(1),
    borderLeftWidth: measure(1),
    borderRightWidth: measure(1),
    borderStyle: 'solid',

    borderRightColor: 'transparent',
    borderLeftColor: 'transparent',
    backgroundColor: 'transparent'
  },

  componentCaseCard_caseCard: {
    overflow: 'hidden',
    backgroundColor: '#77BEB3',
    borderRadius: measure(1),
    height: measure(15),
    width: measure(15)
  },
  componentCaseCard_textContainer: {
    padding: measure(1),
    height: measure(6),
    backgroundColor: '#DDE0E3',
    justifyContent: "center",
    alignItems: "center"
  },
  componentCaseCard_cardImage: {
    flexGrow: 1,
    marginTop: measure(1),
    resizeMode: 'contain'
  },

  ConfigurationScreen_container: {
    backgroundColor: '#fff',
    position: 'relative',
    paddingHorizontal: measure(8),
    paddingVertical: measure(1),
    width: measure(48),
    height: measure(32)
  },
  ConfigurationScreen_closeBtn: {
    position: 'absolute',
    right: measure(1),
    top: measure(1)
  },
  ConfigurationScreen_labelColumn: {
    width: measure(10)
  },
  ConfigurationScreen_labelBtnRow: {
    flexDirection: 'row',
    marginBottom: measure(1)
  },
  ConfigurationScreen_buttonStyle: {
    flexGrow: 1,
    marginBottom: measure(0.5)
  },

  AlertScreen_modalView: {
    width: measure(52),
    height: measure(26),
    borderRadius: measure(3),
    paddingVertical: measure(6),
    paddingHorizontal: measure(10),
    justifyContent: 'space-between',

    position: 'relative',
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  AlertScreen_closeBtn: {
    position: 'absolute',
    right: measure(2),
    top: measure(2)
  },
  AlertScreen_btn: {
    width: measure(11)
  },
  AlertScreen_btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: measure(2),
    marginHorizontal: measure(2)
  },

  CheckBox_checkIcon: {
    height: measure(1),
    width: measure(1)
  },
  CheckBox_checkbox: {
    width: measure(3),
    height: measure(2),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: measure(1) * 2 / 3,
    marginRight: measure(1)
  },

  MedicalRecordScreen_container: {
    padding: measure(2),
    flexDirection: 'row',
    alignItems: 'stretch'
  },
  MedicalRecordScreen_panel: {
    backgroundColor: '#A9E1DE',
    padding: measure(2),
    borderRadius: measure(2),
    width: measure(43)
  },
  MedicalRecordScreen_closeBtn: {
    position: 'absolute',
    top: measure(2),
    right: measure(2)
  },
  MedicalRecordScreen_rightColumn: {
    flexGrow: 1,
    flexShrink: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: measure(2)
  },
  dropShadow: {
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  }
});