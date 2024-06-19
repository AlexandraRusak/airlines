import {IFlightWithToken} from "./interfaces/iFlightWithToken.tsx";

type Props = {
     item: IFlightWithToken;
}
function Flight (props: Props) {

    return (
        <>
            <p>{props.item.flight.carrier.caption}</p>

        </>
    )

}

export {Flight}