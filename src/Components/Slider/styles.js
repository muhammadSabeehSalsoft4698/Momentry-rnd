import {vh, vw} from '../../utils/units';

import {StyleSheet} from 'react-native';

const themeShadow = {
  shadowColor: '#000000',
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowOpacity: 0.27,
  shadowRadius: 4.65,
  elevation: 1,
};

export default StyleSheet.create({
  listContainer: {flexDirection: 'row'},
  slider: {
    height: vh * 1.25,
    zIndex: -1,
    backgroundColor: '#000000' + '22',
    // ...themeShadow,
  },
  imageStyle: {
    height: '100%',
    width: '100%',
  },
  imageContainer: {
    borderWidth: 1,
    borderColor: '#000000' + '20',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
