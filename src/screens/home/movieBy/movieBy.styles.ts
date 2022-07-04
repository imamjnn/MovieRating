import {colors} from '@root/src/themes';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  list: {
    flexGrow: 1,
    padding: 10
  },
  item: {
    height: 180,
    marginBottom: 10,
    marginRight: 10
  },
  wrapVote: {
    borderRadius: 4,
    backgroundColor: colors.blackDim,
    height: 20,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4
  }
});
