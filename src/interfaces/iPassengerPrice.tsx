import {IAmountCurrency} from "./iAmountCurrency.tsx";
import {IDescription} from "./iDescription.tsx";

export interface IPassengerPrice {
    feeAndTaxes: IAmountCurrency;
    passengerCount: number;
    passengerType: IDescription;
    singlePassengerTotal: IAmountCurrency;
    tariff: IAmountCurrency;
    total: IAmountCurrency;
}