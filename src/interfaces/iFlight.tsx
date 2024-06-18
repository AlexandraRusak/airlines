import {ICarrier} from "./iCarrier.tsx";
import {IExchange} from "./iExchange.tsx";
import {ILeg} from "./iLeg.tsx";
import {IPrice} from "./iPrice.tsx";
import {IDescription} from "./iDescription.tsx";

export interface IFlight {
    carrier: ICarrier;
    exchange: IExchange;
    international: boolean;
    isTripartiteContractDiscountApplied: boolean;
    legs: ILeg[];
    price: IPrice;
    refund: {
        ADULT: {
            refundableAfterDeparture: boolean;
            refundableBeforeDeparture: boolean;
        }
    };
    seats: IDescription[];
    servicesStatuses: {
        baggage: IDescription;
        exchange: IDescription;
        refund: IDescription;
    };
}