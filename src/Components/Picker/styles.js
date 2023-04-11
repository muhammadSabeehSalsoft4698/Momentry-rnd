import {vh, vw} from '../../utils/units';

import {StyleSheet} from 'react-native';

const colors = {
  themeBlue: '#27AAE1',
  black: '#000000',
  grey: '#F8F8F8',
  crossBackground: '#F4F6FA',
  greyOther: '#ACACAC',
};

const fontColors = {
  grey: '#999999',
  black: '#000000',
  altBlack: '#333333',
};

const appShadow = {
  shadowColor: '#000000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.15,
  shadowRadius: 3.84,

  elevation: 2,
};

export default StyleSheet.create({
  blurViewStyle: {
    height: 100 * vh,
    width: 100 * vw,
    backgroundColor: '#000000',
    position: 'absolute',
    opacity: 0.5,
  },

  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: vh * 2,
  },

  doneText: {
    fontSize: vh * 1.8,
    color: colors.themeBlue,
  },

  tick: {
    tintColor: colors.black + 'cc',
    resizeMode: 'contain',
    height: vh * 2,
    width: vh * 2,
  },

  crossIconContainer: {
    marginRight: vh * 2,
    alignItems: 'center',
    justifyContent: 'center',
    // height: vh * 3,
    // width: vh * 3,
    // borderRadius: vh * 1.5,
    // backgroundColor: colors.crossBackground,
    // ...appShadow,
  },
  crossIcon: {
    resizeMode: 'contain',
    height: vh * 1.2,
    width: vh * 1.2,
    tintColor: colors.themeBlue,
  },

  crossIconStyle: {
    resizeMode: 'contain',
    height: vh * 1.5,
    width: vh * 1.5,
  },

  label: {
    color: fontColors.altBlack,
    paddingLeft: vw * 3,
  },

  selectedContainer: {
    paddingHorizontal: vw * 4,
    paddingVertical: vw * 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  unselectedContainer: {
    paddingHorizontal: vw * 4,
    paddingVertical: vw * 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },

  crossIconContainerView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: vh * 3.25,
    width: vh * 3.25,
    borderRadius: vh * 6,
    backgroundColor: colors.crossBackground,
    marginBottom: vh * 4,
    ...appShadow,
  },

  alertMainView: {
    backgroundColor: '#ffffff',
    position: 'absolute',
    bottom: 0,
    width: 100 * vw,
    alignSelf: 'center',
    paddingVertical: 3 * vw,
    paddingTop: vh * 2,
    borderTopLeftRadius: vh * 2,
    borderTopRightRadius: vh * 2,
    height: 25 * vh,
    ...appShadow,
  },

  crossIconView: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  checkIconView: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkIconStyle: {
    resizeMode: 'contain',
    height: 12 * vh,
    width: 12 * vh,
    marginBottom: vh * 2,
  },

  confirmBtnRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: vw * 80,
    marginTop: 3 * vh,
  },

  customAlertHeadingTextStyle: {
    fontSize: 2.5 * vh,
    textAlign: 'center',
    color: fontColors.black,
    marginBottom: 1 * vh,
  },

  customAlertDescriptionTextStyle: {
    color: '#666666',
    fontSize: 2 * vh,
    color: fontColors.grey,
    textAlign: 'center',
  },

  submitButtonView: {
    width: 50 * vw,
    height: 7 * vh,
    marginTop: 3 * vh,
  },

  textStyle: {
    fontSize: 2.2 * vh,
  },
  divider: {
    height: 1,
    width: vw * 95,
    alignSelf: 'center',
    backgroundColor: colors.greyOther + '22',
    marginVertical: vh * 0.5,
  },
});
