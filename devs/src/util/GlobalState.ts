import { atom } from 'jotai';
import { ServiceResponse } from './Models';

export const GlobalSelectedDate = atom(new Date());
export const GlobalServiceData = atom<ServiceResponse | null>(null);