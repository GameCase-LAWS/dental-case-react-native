import { Dimensions, Platform, PixelRatio } from 'react-native';

// Fisher-Yates Shuffle algorithm
export function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;
  let rep = 0;

  while (0 !== currentIndex) {
    if (rep > 50) {
      break;
    }
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
    ++rep;
  }

  return array;
}

export function mapForAnamense(anamnese) {
  const { perguntas_negativas, perguntas_positivas, perguntas_neutras } = anamnese;
  const perguntas = [...perguntas_negativas, ...perguntas_neutras, ...perguntas_positivas].map(({ resposta, resposta_prontuario, ...per }) => ({
    ...per,
    feedback: resposta,
    prontuario: resposta_prontuario
  }));

  const perguntas_rudes = perguntas_positivas.map(({ rude, resposta, resposta_prontuario, ...per }) => ({
    ...per,
    texto: rude,
    feedback: resposta,
    prontuario: resposta_prontuario,
    tipo: "+-"
  }));

  return [...perguntas, ...perguntas_rudes];
}

export function mapForExame(exame) {
  const { exames_negativos, exames_positivos, exames_neutros } = exame;
  const exames = [...exames_negativos, ...exames_neutros, ...exames_positivos].map(({ nome, resultado, resultado_prontuario, ...exm }) => ({
    ...exm,
    texto: nome,
    feedback: resultado,
    prontuario: resultado_prontuario
  }));

  return exames;
}

export function mapForConduta(conduta) {
  const { condutas_negativas, condutas_positivas, condutas_neutras } = conduta;
  const condutas = [...condutas_negativas, ...condutas_neutras, ...condutas_positivas].map(({ nome, ...per }) => ({
    ...per,
    texto: nome
  }));

  return condutas;
}

export function mapForDiagnostico(conduta) {
  const { diagnosticos_negativos, diagnosticos_positivos, diagnosticos_neutros } = conduta;
  return [
    diagnosticos_negativos[Math.floor(Math.random() * diagnosticos_negativos.length)],
    diagnosticos_positivos[Math.floor(Math.random() * diagnosticos_positivos.length)],
    diagnosticos_neutros[Math.floor(Math.random() * diagnosticos_neutros.length)],
  ];
}

export function mapForComunicacoes(comunicacoes) {
  const t = comunicacoes.map(c => ({ adequada: c.adequada, inadequada: c.inadequada }));
  return t[Math.floor(Math.random() * t.length)];
}

export function getScore(option) {
  switch (option.tipo) {
    case "-": return -20000;
    case "0": return 2500;
    case "+": return 20000;
    default: return 5000;
  };
}

export function getMaxScore(options) {
  return options.filter(o => ['+', '0'].includes(o.tipo)).map(o => getScore(o)).reduce((prev, curr) => prev + curr, 0);
}

// Arquivos relacionados ao ajuste em múltiplas telas.
const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

export const findObjectInListByTag = (object_list, tag, value) => {
  const obj = object_list.filter(o => o[tag] === value)[0];
  return obj || {};
}

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

export function normalize(size) {
  // console.log(scale);
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else if (Platform.OS === 'web') {
    return newSize / 4;
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

export function generateGameData(case_) {

}