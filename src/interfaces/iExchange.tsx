export interface IExchange {
    Adult: {
        exchangeAfterDeparture: {amount: string; currency: string; currencyCode: string;};
        exchangeBeforeDeparture: {amount: string; currency: string; currencyCode: string;};
        exchangeableAfterDeparture: boolean;
        exchangeableBeforeDeparture: boolean;
    }
}