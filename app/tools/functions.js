import { Dimensions, Platform, PixelRatio } from 'react-native';
const gameplayScreenplay = require('../screenplay/gameplay.json');

// Fisher-Yates Shuffle algorithm
export function shuffle(array) {
  if (!array) {
    return null;
  }
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

export function map(options, etapa) {
  // console.log(`Mapping for etapa = ${etapa}`);
  if (etapa === 'anamnese') {
    const { perguntas_negativas, perguntas_positivas, perguntas_neutras } = options;
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
  } else if (etapa === 'exame_clinico' || etapa === 'exame_complementar') {
    const { exames_negativos, exames_positivos, exames_neutros } = options;
    const exames = [...exames_negativos, ...exames_neutros, ...exames_positivos].map(({ nome, resultado, resultado_prontuario, ...exm }) => ({
      ...exm,
      texto: nome,
      feedback: resultado,
      prontuario: resultado_prontuario
    }));

    return exames;
  } else if (etapa === 'diagnostico') {
    const { diagnosticos_negativos, diagnosticos_positivos, diagnosticos_neutros } = options;
    const adeq = diagnosticos_positivos[Math.floor(Math.random() * diagnosticos_positivos.length)];

    const others = shuffle([...diagnosticos_neutros, ...diagnosticos_negativos].filter(i => i));

    return [adeq, ...others].slice(0, 3);
  } else if (etapa === 'tratamento') {
    const { condutas_negativas, condutas_positivas, condutas_neutras } = options;
    const condutas = [...condutas_negativas, ...condutas_neutras, ...condutas_positivas].map(({ nome, ...per }) => ({
      ...per,
      texto: nome
    }));

    return condutas;
  } else if (etapa === 'comunicacao') {
    const t = options.map(c => [{
      texto: c.adequada,
      tipo: "+"
    }, {
      texto: c.inadequada,
      tipo: "-"
    }]);
    return t[Math.floor(Math.random() * t.length)];
  } else {
    // console.log('Comunicacao');
  }
}

function scoreFrom(option) {
  switch (option.tipo) {
    case "-": return -20000;
    case "0": return 2500;
    case "+": return 20000;
    default: return 5000;
  };
}

export function getScore(option, etapa) {
  if (etapa === 'anamnese') {
    return scoreFrom(option);
    // if (classificacao != 0) {
    //   atendimento.PontuacaoAnamnese += points;
    // } else {
    //   long pAux = 5000 + (classificacaoAlternativa == 0 ? 15000 : 0);
    //   atendimento.PontuacaoAnamnese += pAux;
    //   atendimento.PontuacaoComunicacao += pAux;
    //   Debug.Log("adding " + pAux + " to anamnsese.");
    // }
  } else if (etapa === 'exame_complementar' || etapa === 'tratamento') {
    switch (option.tipo) {
      case "0": return (option.custo_fincanceiro === 1 ? -10000 : -20000) + scoreFrom(option);
      case "-": return (option.custo_fincanceiro === 1 ? -30000 : -50000) + scoreFrom(option);
      default: return scoreFrom(option);
    }
  } else {
    return scoreFrom(option);
  }
}

export function getMaxScore(options, etapa, extra) {
  if (!options) {
    return 0;
  }
  return extra + options.map(o => getScore(o, etapa)).filter(s => s > 0).reduce((prev, curr) => prev + curr, 0);
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