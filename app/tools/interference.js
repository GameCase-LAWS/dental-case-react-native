import { findObjectInListByTag } from './functions';

const interferenceScreenplay = require('../screenplay/interference.json');

export const getRandomInterference = (caso) => {
  const isAnamneseInterference = Math.random() < 0.5;
  const interferences = interferenceScreenplay.interferences
    .filter(interf => isValidForCaso(interf, caso))
    .filter(interf => interf.etapa === "BOTH" || (isAnamneseInterference ? interf.etapa === "ANAMNESE" : interf.etapa === "CLINICAL"))
    .map(interf => ({ ...interf, etapa: isAnamneseInterference ? 1 : 2 }));

  const maxRandInt = interferences.length;
  const randInt = Math.floor(Math.random() * maxRandInt);
  
  const interference = interferences[randInt];
  return interference;
}

function isValidForCaso(interference, caso) {
  // Se igual a 1, o paciente não possui acompanhante
  if (interference.need_acompanhante && caso.paciente.paciente_acompanhando === 1) {
    return false;
  }
  const charInterfImg = findObjectInListByTag(caso.imagens, 'identificador', 'character-interference').arquivo;
  if (interference.key === "PACIENTE_DESCONTROLE_EMOCIAL" && !charInterfImg) {
    return false;
  }
  return true;
}