import { Orientation } from "./Orientation";

export interface Options {
    min?: number;
    max?: number;
    step?: number;
    value?: number;
    values?: number[];
    orientation?: Orientation;
    showLabels?: boolean;
    range?: boolean;
}