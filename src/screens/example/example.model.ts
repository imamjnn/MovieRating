import {atom} from 'recoil';

export type ListParams = {
  date: string;
  text: string;
};

export const itemListState = atom({
  key: 'itemListState',
  default: [] as ListParams[]
});
