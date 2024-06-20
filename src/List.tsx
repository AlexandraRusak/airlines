import {IFlightWithToken} from "./interfaces/iFlightWithToken.tsx";
import {Flight} from "./Flight.tsx";


type Props = {
    flightsToDisplay: IFlightWithToken[];
    handleShowMore: ()=>void;
}
function List(props: Props) {


    return (
        <>
            {props.flightsToDisplay && props.flightsToDisplay.map(flight => <Flight key={flight.flightToken} item={flight} />)}
            <div style={{display: "flex", justifyContent: "center"}}>
                <button style={{paddingInline: "15px", paddingBlock: "5px", fontSize: "1rem", fontFamily: "roboto"}}
                        onClick={props.handleShowMore}>Показать еще
                </button>

            </div>
        </>
    )
}

export {List}