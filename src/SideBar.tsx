import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {Checkbox, Drawer, FormGroup} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {Dispatch, SetStateAction, useState} from "react";
import "./styles/SideBar.css"
import {IBestFlight} from "./interfaces/iBestFlight.tsx";

/* eslint-disable  @typescript-eslint/no-explicit-any */

const useStyles: any = makeStyles({
    drawerPaper: {
        width: 240,
        paddingInline: 10,
    }
})

type Props = {
    sortCriteria: string;
    setSortCriteria: Dispatch<SetStateAction<string>>;
    connections: string[];
    setConnections: Dispatch<SetStateAction<string[]>>;
    fromPrice: string;
    setFromPrice: Dispatch<SetStateAction<string>>;
    belowPrice: string;
    setBelowPrice: Dispatch<SetStateAction<string>>;
    bestDirectFlights: IBestFlight[];
    airlineUids: string[];
    setAirlineUids: Dispatch<SetStateAction<string[]>>;
}

function SideBar(props: Props) {

   const [showDirect, setShowDirect] = useState<boolean>(false)
   const [showOneConnection, setShowOneConnection] = useState<boolean>(false)
   const [showAll, setShowAll] = useState<boolean>(true)

    console.log(props.bestDirectFlights)
    const classes = useStyles()
    const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.setSortCriteria(event.target.value)
    }

    const handleConnectionsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const index = props.connections.indexOf(event.target.value)
        if (index === -1) {
            props.setConnections([...props.connections, event.target.value])
        } else {
            props.setConnections(props.connections.filter(c => c !== event.target.value))
        }
    }

    const handleAirlineChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const index = props.airlineUids.indexOf(event.target.value)
        if (index === -1) {
            props.setAirlineUids([...props.airlineUids, event.target.value])
        } else {
            props.setAirlineUids(props.airlineUids.filter(c => c !== event.target.value))
        }
    }

    const handleFromPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.setFromPrice(event.target.value)
    }
    const handleBelowPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.setBelowPrice(event.target.value)
    }

    // TODO: заменить FormLabel на Typography

    return (
        <Drawer variant="permanent" anchor={"left"} sx={{width: 240, flexShrink: 0}}
                classes={{paper: classes.drawerPaper}}>
            <FormControl>
                <FormLabel id="sort" sx={{marginTop: 5, marginBottom: 1}}>Сортировать</FormLabel>
                <RadioGroup
                    aria-labelledby="sort"
                    defaultValue=""
                    name="sort-radio-buttons-group"
                    value={props.sortCriteria}
                    onChange={handleSortChange}
                >
                    <FormControlLabel value="priceAscending" control={<Radio/>} label="- по возрастанию цены"/>
                    <FormControlLabel value="priceDescending" control={<Radio/>} label="- по убыванию в цене"/>
                    <FormControlLabel value="time" control={<Radio/>} label="- по времени в пути"/>
                </RadioGroup>
            </FormControl>

            <FormControl>
                <FormLabel id="filter" sx={{marginTop: 5, marginBottom: 1}}>Фильтровать</FormLabel>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox value="1" checked={props.connections.includes("1")}
                                           onChange={handleConnectionsChange}/>}
                        label="- 1 пересадка"/>
                    <FormControlLabel
                        control={<Checkbox value="0" checked={props.connections.includes("0")}
                                           onChange={handleConnectionsChange}/>}
                        label="- без пересадок"/>
                </FormGroup>
            </FormControl>

            <FormLabel sx={{marginTop: 5, marginBottom: 1}}>Цена</FormLabel>
            <div className="container">
                <div className="line">
                    <label htmlFor="fromPrice">от</label>
                    <input className="input" type="number" id="fromPrice" aria-describedby="priceFrom"
                           value={props.fromPrice}
                           onChange={handleFromPriceChange}/>
                </div>
                <div className="line">
                    <label htmlFor="belowPrice">до</label>
                    <input className="input" type="number" id="belowPrice" aria-describedby="belowPrice"
                           value={props.belowPrice}
                           onChange={handleBelowPriceChange}/>
                </div>
            </div>


            <FormControl>
                <FormLabel id="filter" sx={{marginTop: 5, marginBottom: 1}}>Авиакомпании</FormLabel>
                <FormGroup>

                    {
                        props.bestDirectFlights && props.bestDirectFlights.map(
                            (flight, index) => {return <FormControlLabel
                                key={index}
                                control={<Checkbox value={flight.carrier.uid}
                                                   checked={props.airlineUids.includes(`${flight.carrier.uid}`)}
                                                   onChange={handleAirlineChange}/>} label={flight.carrier.caption}/>})
                    }

                </FormGroup>
            </FormControl>

        </Drawer>
    )
}

export {SideBar}