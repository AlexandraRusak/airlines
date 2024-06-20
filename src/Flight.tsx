import {IFlightWithToken} from "./interfaces/iFlightWithToken.tsx";
import {Box, Button, Divider, Stack, Typography} from "@mui/material";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import "./styles/Flight.css"

type Props = {
    item: IFlightWithToken;
}

function Flight(props: Props) {
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
        <Stack fullwidth sx={{marginBottom: "10px"}}>
            <Box className="blue">
                <Typography sx={{color: "white"}}>{flight?.carrier?.caption}</Typography>
                <div className="price">
                    <Typography variant="h6" sx={{
                        fontWeight: "400",
                        color: "white",
                        paddingTop: "10px",
                        marginBlockStart: "0px",
                        marginBlockEnd: "0px",
                        lineHeight: "1rem"
                    }}>{flight?.price?.total?.amount} {flight?.price?.total?.currency}</Typography>
                    <Typography variant="caption" sx={{color: "white", paddingTop: "0px", marginTop: "0px"}}>Стоимость
                        для одного взрослого пассажира</Typography>
                </div>
            </Box>
            <Box className="destination">
                <div>
                    <Typography>{flight?.legs[0]?.segments[0]?.departureCity?.caption}, {flight?.legs[0]?.segments[0]?.departureAirport?.caption}
                        <span style={{color: "#0087C9"}}> ({flight?.legs[0]?.segments[0]?.departureAirport?.uid})</span></Typography>
                </div>
                <ArrowRightAltIcon sx={{color: "#0087C9"}}/>
                <div>
                    <Typography>
                        {flight?.legs[0]?.segments.at(-1)?.arrivalCity?.caption}, {flight?.legs[0]?.segments.at(-1)?.arrivalAirport?.caption}
                        <span
                            style={{color: "#0087C9"}}> ({flight?.legs[0]?.segments.at(-1)?.arrivalAirport?.uid})</span>
                    </Typography>
                </div>
            </Box>
            <Divider></Divider>
            <Box className="time">
                <div className="hours-min">
                    <Typography
                        sx={{fontSize: "1.25rem"}}>{getHoursAndMin(flight?.legs[0]?.segments[0]?.departureDate)}</Typography>
                    <Typography
                        sx={{color: "#0087C9"}}> {getDateAndMonth(flight?.legs[0]?.segments[0]?.departureDate)}</Typography>
                </div>

                <div style={{display: "flex"}}>
                    <AccessTimeIcon/>
                    <Typography>{Math.floor(flight?.legs[0]?.duration / 60)} ч {(flight?.legs[0]?.duration - (Math.floor(flight?.legs[0]?.duration / 60)) * 60)} мин</Typography>
                </div>
                <div className="hours-min">
                    <Typography
                        sx={{color: "#0087C9"}}>{getDateAndMonth(flight?.legs[0]?.segments.at(-1)?.arrivalDate)}</Typography>
                    <Typography
                        sx={{fontSize: "1.25rem"}}>{getHoursAndMin(flight?.legs[0]?.segments.at(-1)?.arrivalDate)}</Typography>
                </div>
            </Box>
            <Box className="connection">
                {flight?.legs[0]?.segments.length > 1 ?
                    <Divider sx={{
                        "&::before, &::after": {
                            borderColor: "rgba(0, 0, 0, 0.87)",
                        },
                    }}><Typography sx={{color: "#FFB168"}}>{flight?.legs[0]?.segments.length - 1} пересадка</Typography></Divider> : ""}
            </Box>
            <Typography sx={{paddingLeft: "15px"}}>Рейс выполняет: {flight?.carrier?.caption}</Typography>
            <Divider sx={{bgcolor: "#0087C9", height: "1px"}}></Divider>


            <Box className="destination">
                <div>
                    <Typography>{flight?.legs[1]?.segments[0]?.departureCity?.caption}, {flight?.legs[1]?.segments[0]?.departureAirport?.caption}
                        <span style={{color: "#0087C9"}}> ({flight?.legs[1]?.segments[0]?.departureAirport?.uid})</span></Typography>
                </div>
                <ArrowRightAltIcon sx={{color: "#0087C9"}}/>
                <div>
                    <Typography>
                        {flight?.legs[1]?.segments.at(-1)?.arrivalCity?.caption}, {flight?.legs[1]?.segments.at(-1)?.arrivalAirport?.caption}
                        <span
                            style={{color: "#0087C9"}}> ({flight?.legs[1]?.segments.at(-1)?.arrivalAirport?.uid})</span>
                    </Typography>
                </div>
            </Box>
            <Divider></Divider>
            <Box className="time">

                <div className="hours-min">
                    <Typography
                        sx={{fontSize: "1.25rem"}}>{getHoursAndMin(flight?.legs[1]?.segments[0]?.departureDate)}</Typography>
                    <Typography
                        sx={{color: "#0087C9"}}>{getDateAndMonth(flight?.legs[1]?.segments[0]?.departureDate)}</Typography>
                </div>
                <div style={{display: "flex"}}>
                    <AccessTimeIcon/>
                    <Typography>{Math.floor(flight?.legs[1]?.duration / 60)} ч {(flight?.legs[1]?.duration - (Math.floor(flight?.legs[1]?.duration / 60)) * 60)} мин</Typography>
                </div>

                <div className="hours-min">
                    <Typography
                        sx={{color: "#0087C9"}}>{getDateAndMonth(flight?.legs[1]?.segments.at(-1)?.arrivalDate)}</Typography>
                    <Typography
                        sx={{fontSize: "1.25rem"}}>{getHoursAndMin(flight?.legs[1]?.segments.at(-1)?.arrivalDate)}</Typography>
                </div>
            </Box>
            <Box className="connection">
                {flight?.legs[1]?.segments.length > 1 ?
                    <Divider sx={{
                        "&::before, &::after": {
                            borderColor: "rgba(0, 0, 0, 0.87)",
                        },
                    }}><Typography sx={{color: "#FFB168"}}>{flight?.legs[1]?.segments.length - 1} пересадка</Typography></Divider> : ""}
            </Box>
            <Typography sx={{paddingLeft: "15px"}}>Рейс выполняет: {flight?.carrier?.caption}</Typography>
            <Button fullWidth={true} disableRipple={true} disableElevation={true} disableFocusRipple={true} sx={{
                backgroundColor: "#FFB168",
                color: "white",
                borderRadius: "0",
                margin: "0",
                "&:hover": {bgcolor: "#0087C9"},
            }}>выбрать</Button>
        </Stack>
    )

}

export {Flight}