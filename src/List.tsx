import {IFlightWithToken} from "./interfaces/iFlightWithToken.tsx";
import {Flight} from "./Flight.tsx";


type Props = {
    flightsToDisplay: IFlightWithToken[];
}
function List(props: Props) {


    return (
        <>
            {props.flightsToDisplay && props.flightsToDisplay.map(flight => <Flight key={flight.flightToken} item={flight} />)}
        </>
    )
}

export {List}