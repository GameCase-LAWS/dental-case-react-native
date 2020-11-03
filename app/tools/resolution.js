import { Dimensions, Platform, PixelRatio } from 'react-native';

// Grid: 64m x 36m

// Arquivos relacionados ao ajuste em múltiplas telas.
const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

export function calcResolutionUtils(isLandscape) {
  const refHeight = isLandscape ? SCREEN_WIDTH : SCREEN_HEIGHT;
  const refWidth = isLandscape ? SCREEN_HEIGHT : SCREEN_WIDTH;

  const resolution = refWidth / refHeight;

  let height, width, measure;

  if (resolution < 16 / 9) { // HEIGHT acima do adequado, ajustar em HEIGHT
    height = 9 / 16 * SCREEN_WIDTH;
    width = SCREEN_WIDTH;
    measure = SCREEN_WIDTH / 64;
  } else { // WIDTH acima do adequado, ajustar em WIDTH
    width = 16 / 9 * SCREEN_HEIGHT;
    height = SCREEN_HEIGHT;
    measure = SCREEN_HEIGHT / 36;
  }

  return { height, width, measure };
}

export function normalize(size) {
  const newSize = size;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else if (Platform.OS === 'web') {
    return size;
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}