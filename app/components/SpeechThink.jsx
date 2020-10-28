import React from 'react';
import { View } from 'react-native';

export const SpeechThink = ({ props }) => {
  return (
    <View style={[gameStyles.playerSpeechThinkBox, { zIndex: speechDone ? -1 : 1, backgroundColor: speechDone ? '#ACDCCE' : '#FFF', paddingLeft: meansure(speechDone ? 6 : 4) }]}>
      <View style={[styles.spacedRow, { flexGrow: 1 }]}>
        {!speechDone
          ? (
            <View style={{ flexShrink: 1, justifyContent: 'center' }}>
              <Typography variant="header34">{speechs[currentStep]}</Typography>
            </View>
          )
          : (
            currentStep !== 0
              ? (
                <View style={{ flexShrink: 1, justifyContent: 'space-between' }}>
                  {(currentStep === 3 || currentStep == 5)
                    ? (
                      getOptions().map((option, i) => (
                        <CheckBox
                          label={option.texto}
                          onPress={handleOptionPressAsRadio(i)}
                          checked={option.checked}
                          style={{ flexGrow: 1 }}
                          key={i}
                        />
                      ))
                    )
                    : (
                      getOptions().slice(2 * paginationIndex, 2 * (1 + paginationIndex)).map((option, i) => (
                        <CheckBox
                          label={option.texto}
                          onPress={handleOptionPress(2 * paginationIndex + i)}
                          checked={option.checked}
                          style={{ flexGrow: 1 }}
                          key={i}
                        />
                      ))
                    )
                  }
                </View>
              )
              : (
                <View style={{ flexShrink: 1, justifyContent: 'center' }}>
                  <Typography variant="header34">Olá! Como você se chama?</Typography>
                </View>
              )
          )
        }

        <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: meansure(2) }}>
          {(!speechDone || currentStep !== 3 || gameData.diagnostico.options.filter(d => d.checked).length !== 0) && (
            <TouchableOpacity activeOpacity={0.9} onPress={handlePaginationPress}>
              <ArrowIcon color='#1BA488' width={meansure(4)} height={meansure(6)} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}