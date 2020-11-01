import React from 'react';
import PropType from 'prop-types';
import { View, StyleSheet } from 'react-native';

export const Grid = ({
  container,
  item,
  spacingX,
  spacingY,
  children,
  size,
  style,
  ...props
}) => {
  if (container) {
    return (
      <View style={[style, { marginVertical: -spacingY / 2, marginHorizontal: -spacingX / 2, flexWrap: "nowrap" }, styles.flexRow]} {...props}>
        {children && children.map((c, i) => React.cloneElement(c, { spacingX, spacingY, key: i }))}
      </View>
    );
  }

  return (
    <View style={[style, { paddingVertical: spacingY / 2, paddingHorizontal: spacingX / 2, flexBasis: `${100 * size / 12}%` }]} {...props}>
      {children}
    </View>
  );
}

Grid.defaultProps = {
  container: false,
  item: false,
  spacingX: 0,
  spacingY: 0,
  size: 12
}

Grid.propTypes = {
  container: PropType.bool,
  item: PropType.bool,
  spacingX: PropType.number,
  spacingY: PropType.number,
  size: PropType.number
}

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row'
  }
});