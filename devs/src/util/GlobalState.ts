import { atom } from 'jotai';
import { ServiceResponse } from './Models';

export const GlobalSelectedDate = atom(new Date());
export const GlobalServiceData = atom<ServiceResponse | null>(null);
export const GlobalDisplayBoolean = atom<boolean>(false);
export const GlobalIsFocused = atom<boolean>(false);
export const GlobalIsFocusedTo = atom<boolean>(false);
export const GlobalAlertDoubleBoolean = atom<[boolean, boolean]>([false, false]);