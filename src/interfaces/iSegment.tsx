import {ICarrier} from "./iCarrier.tsx";
import {IDescription} from "./iDescription.tsx";

/* eslint-disable  @typescript-eslint/no-explicit-any */
export interface ISegment {
    aircraft: IDescription;
    airline: ICarrier;
    arrivalAirport: IDescription;
    arrivalCity: IDescription;
    arrivalDate: string;
    classOfService: IDescription;
    classOfServiceCode: string;
    departureAirport: IDescription;
    departureCity: IDescription;
    departureDate: string;
    flightNumber: string;
    servicesDetails: {
        fareBasis: {
            ADULT: string;
        };
        freeCabinLuggage: any;
        freeLuggage: {
            ADULT: { pieces: number; nil: boolean; unit: string; }
        };
        paidCabinLuggage: any;
        paidLuggage: any;
        tariffName: string;
    };
    starting: boolean;
    stops: number;
    techStopInfos: any;
    travelDuration: number;
}