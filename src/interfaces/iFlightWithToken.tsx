import {IFlight} from "./iFlight.tsx";

export interface IFlightWithToken {
    flight: IFlight;
    flightToken: string;
    hasExtendedFare: boolean;
}
