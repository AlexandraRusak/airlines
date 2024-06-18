import {IFlightWithToken} from "./interfaces/iFlightWithToken.tsx";

type Props = {
     item: IFlightWithToken;
}
function Flight (props: Props) {

    return (
        <>
            {props.item}
        </>
    )

}

export {Flight}