import {atom, AtomEffect, DefaultValue} from 'recoil';
import {load, remove, save} from './storage';
import {DeviceLocalizeParams} from './types';

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

export const deviceLocalize = atom({
  key: 'deviceLocalize',
  default: {} as DeviceLocalizeParams,
  effects_UNSTABLE: [persistAtom]
});
