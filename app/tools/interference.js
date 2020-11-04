const interferenceScreenplay = require('../screenplay/interference.json');

export const getRandomInterference = (caso) => {
  const isAnamneseInterference = Math.random() < 0.5;
  const interferences = interferenceScreenplay.interferences
    .filter(interf => interf.etapa === "BOTH" || (isAnamneseInterference ? interf.etapa === "ANAMNESE" : interf.etapa === "CLINICAL"))
    .map(interf => ({ ...interf, etapa: isAnamneseInterference ? 1 : 2 }));

  const maxRandInt = interferences.length;
  // const randInt = Math.floor(Math.random() * maxRandInt);
  const randInt = 4;

  const interference = interferences[randInt];
  return interference;
}