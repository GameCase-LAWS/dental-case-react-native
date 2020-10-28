import { Dimensions, Platform, PixelRatio } from 'react-native';

// Grid: 64m x 36m

// Arquivos relacionados ao ajuste em múltiplas telas.
const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

const resolution = SCREEN_WIDTH / SCREEN_HEIGHT;
// console.log(resolution);

let height, width, _meansure;

if (resolution < 16 / 9) { // HEIGHT acima do adequado, ajustar em HEIGHT
  height = 9 / 16 * SCREEN_WIDTH;
  width = SCREEN_WIDTH;
  _meansure = SCREEN_WIDTH / 64;
} else { // WIDTH acima do adequado, ajustar em WIDTH
  width = 16 / 9 * SCREEN_HEIGHT;
  height = SCREEN_HEIGHT;
  _meansure = SCREEN_HEIGHT / 36;
}

export const screenContainer = { width, height, marginRight: 'auto', marginLeft: 'auto' };
export const meansure = (meansures) => _meansure * meansures;

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