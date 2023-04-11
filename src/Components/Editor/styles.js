import {vh, vw} from '../../utils/units';

import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  editorStyle: {height: vh * 44},
  dragContainer: {zIndex: 1},
  imageStyle: {
    height: '100%',
    width: '100%',
  },
});
