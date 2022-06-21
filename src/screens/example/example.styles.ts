import {colors} from '@root/src/themes';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 12
  },
  container2: {
    flex: 1,
    padding: 12
  },
  listItem: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: colors.grey200,
    flexDirection: 'row'
  },
  itemGrid1: {
    width: '80%'
  },
  itemGrid2: {
    width: '20%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  img: {
    width: 100,
    height: 100
  }
});
