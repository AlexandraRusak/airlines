import {IFlightWithToken} from "./interfaces/iFlightWithToken.tsx";
import {Button, Container, Typography} from "@mui/material";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import "./styles/Flight.css"

type Props = {
    item: IFlightWithToken;
}

// @ts-ignore
function Flight(props: Props) {
    // console.log(props.item?.flight)
    const flight = props.item?.flight
    const getDateAndMonth = (string: string): string => {
        const date1 = new Date(string)
        let dateN = date1.getDate().toString()
        const months = ["янв.", "фев.", "мар.", "апр.", "май", "июн.", "июл.", "авг.", "сент.", "окт.", "нояб.", "дек."]
        const dateM = date1.getMonth()
        const days = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];
        const dayW = date1.getDay();
        if (Number(dateN) < 10) {
            dateN = 0 + dateN
        }
        return `${dateN} ${months[dateM]} ${days[dayW]}`
    }

    const getHoursAndMin = (string: string): string => {
        const date1 = new Date(string)
        let hours = date1.getHours().toString()
        let minutes = date1.getMinutes().toString()
        if (Number(hours) < 10) {
            hours = 0 + hours
        }
        if (Number(minutes) < 10) {
            minutes = 0 + minutes
        }
        return `${hours}:${minutes}`
    }


    return (
        <Container>
            <div className="blue">
                <Typography sx={{color: "white"}}>{flight?.carrier?.caption}</Typography>
                <div className="price">
                    <p><span>{flight?.price?.total?.amount}</span>
                        <span>{flight?.price?.total?.currency}</span></p>
                    <p>Стоимость для одного взрослого пассажира</p>
                </div>
            </div>
            <p>
                <span>{flight?.legs[0]?.segments[0]?.departureCity?.caption}, {flight?.legs[0]?.segments[0]?.departureAirport?.caption} ({flight?.legs[0]?.segments[0]?.departureAirport?.uid})</span>
                <span><ArrowRightAltIcon/></span>
                <span>{flight?.legs[0]?.segments.at(-1)?.arrivalCity?.caption}, {flight?.legs[0]?.segments.at(-1)?.arrivalAirport?.caption} ({flight?.legs[0]?.segments.at(-1)?.arrivalAirport?.uid})</span>
            </p>
            <div>
                <p>
                    <span>{getHoursAndMin(flight?.legs[0]?.segments[0]?.departureDate)} </span><span>{getDateAndMonth(flight?.legs[0]?.segments[0]?.departureDate)}</span>
                </p>
                <p>
                    <AccessTimeIcon/>
                    <span>{Math.floor(flight?.legs[0]?.duration / 60)}</span><span> ч </span><span>{(flight?.legs[0]?.duration - (Math.floor(flight?.legs[0]?.duration / 60)) * 60)}</span><span> мин </span>
                </p>
                <p>
                    <span>{getHoursAndMin(flight?.legs[0]?.segments.at(-1)?.arrivalDate)} </span><span>{getDateAndMonth(flight?.legs[0]?.segments.at(-1)?.arrivalDate)} </span>
                </p>
            </div>
            <p>{flight?.legs[0]?.segments.length / 2} пересадка</p>
            <p>рейс выполняет: {flight?.carrier?.caption}</p>
            <p>
                <span>{flight?.legs[1]?.segments[0]?.departureCity?.caption}, {flight?.legs[1]?.segments[0]?.departureAirport?.caption} ({flight?.legs[1]?.segments[0]?.departureAirport?.uid})</span>
                <span><ArrowRightAltIcon/></span>
                <span>{flight?.legs[1]?.segments.at(-1)?.arrivalCity?.caption}, {flight?.legs[1]?.segments.at(-1)?.arrivalAirport?.caption} ({flight?.legs[1]?.segments.at(-1)?.arrivalAirport?.uid})</span>
            </p>
            <div>
                <p>
                    <span>{getHoursAndMin(flight?.legs[1]?.segments[0]?.departureDate)} </span><span>{getDateAndMonth(flight?.legs[1]?.segments[0]?.departureDate)}</span>
                </p>
                <p>
                    <AccessTimeIcon/>
                    <span>{Math.floor(flight?.legs[1]?.duration / 60)}</span><span> ч </span><span>{(flight?.legs[1]?.duration - (Math.floor(flight?.legs[1]?.duration / 60)) * 60)}</span><span> мин </span>
                </p>
                <p>
                    <span>{getHoursAndMin(flight?.legs[1]?.segments.at(-1)?.arrivalDate)} </span><span>{getDateAndMonth(flight?.legs[1]?.segments.at(-1)?.arrivalDate)}</span>
                </p>
            </div>
            <p>{flight?.legs[1]?.segments.length / 2} пересадка</p>
            <p>рейс выполняет: {flight?.carrier?.caption}</p>
            <Button sx={{backgroundColor: "#FFB168", color: "white", width: "100%", borderRadius: "0"}}>выбрать</Button>
        </Container>
    )

}

export {Flight}