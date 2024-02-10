import { atom } from 'recoil';

export const HeaderRenderAtom = atom<number>({
  key: 'HeaderRenderAtom',
  default: 0,
});