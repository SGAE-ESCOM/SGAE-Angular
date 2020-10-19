import { TipoDato } from './tipo-dato';

export interface Campo extends TipoDato{
    tipo: string;
    subtipo: string;
    min?: number;
    max?: number;
}
