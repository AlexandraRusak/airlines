import {ICarrier} from "./iCarrier.tsx";
import {IAmountCurrency} from "./iAmountCurrency.tsx";

export interface IBestFlight {
    carrier: ICarrier;
    price: IAmountCurrency;
}
