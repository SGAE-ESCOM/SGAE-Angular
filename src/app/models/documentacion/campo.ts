import { TipoDato } from './tipo-dato';

export interface Campo extends TipoDato{
    min?: number;
    max?: number;
}
