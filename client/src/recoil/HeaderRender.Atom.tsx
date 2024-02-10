import { atom } from 'recoil';

export const HeaderRenderAtom = atom<number>({
  key: 'HeaderRenderAtom',
  default: 0,
});

export const HeaderVisibleAtom = atom<number>({
  key: 'HeaderVisibleAtom',
  default: 0,
});