import {vh, vw} from '../../utils/units';

import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  resizeBoxStyle: {
    position: 'absolute',
    zIndex: 1,
    right: -vh * 0.25,
    bottom: 0,
  },
  imageStyle: {
    height: vh * 4,
    width: vh * 4,
  },
  containerStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: vh * 1,
    paddingBottom: vh * 1,
  },
});
