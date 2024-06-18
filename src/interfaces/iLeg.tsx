import {ISegment} from "./iSegment.tsx";

export interface ILeg {
    duration: number;
    segments: ISegment[];
}