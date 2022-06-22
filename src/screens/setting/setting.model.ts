import {atom, AtomEffect, DefaultValue} from 'recoil';
import {load, remove, save} from '@root/src/utils/storage';
import {light} from '@root/src/themes/colors';

type ThemeParams = {
  isDark: boolean;
  text: string;
  background: string;
  background2: string;
  foreground: string;
  placeholder: string;
};

const persistAtom: AtomEffect<any> = ({node, setSelf, onSet}) => {
  setSelf(
    load(node.key).then(savedValue => (savedValue != null ? savedValue : new DefaultValue()))
  );

  onSet(newValue => {
    if (newValue instanceof DefaultValue) {
      remove(node.key);
    } else {
      save(node.key, newValue);
    }
  });
};

export const themeState = atom<ThemeParams>({
  key: 'themeState',
  default: light,
  effects_UNSTABLE: [persistAtom]
});
