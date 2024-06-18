import {IAmountCurrency} from "./iAmountCurrency.tsx";
import {IPassengerPrice} from "./iPassengerPrice.tsx";

export interface IPrice {
    passengerPrices: IPassengerPrice[];
    rates: {
        totalEur: {
            amount: string;
            currencyCode: string;
        }
        totalUsd: {
            amount: string;
            currencyCode: string;
        }
    };
    total: IAmountCurrency;
    totalFeeAndTaxes: IAmountCurrency;
}