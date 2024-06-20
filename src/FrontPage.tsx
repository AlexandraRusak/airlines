import {SideBar} from "./SideBar.tsx";
import {List} from "./List.tsx";
import {useEffect, useMemo, useState} from "react";
import {IFlightWithToken} from "./interfaces/iFlightWithToken.tsx";
// import {Spinner} from "./Spinner.tsx";
import {Button, Container} from "@mui/material";
import {IBestFlight} from "./interfaces/iBestFlight.tsx";

function FrontPage() {

    const [allFlights, setAllFlights] = useState<IFlightWithToken[]>([])
    const [bestDirectFlights, setBestDirectFlights] = useState<IBestFlight[]>([])
    const [bestOneConnection, setBestOneConnection] = useState<IBestFlight[]>([])
    const [sortCriteria, setSortCriteria] = useState<string>("")
    const [fromPrice, setFromPrice] = useState<string>("")
    const [belowPrice, setBelowPrice] = useState<string>("")
    const [connections, setConnections] = useState<string[]>([])
    const [visibleElements, setVisibleElements] = useState<number>(2)
    const [airlineUids, setAirlineUids] = useState<string[]>([])

    const handleShowMore = () => {
        setVisibleElements(visibleElements + 1)
    }

    function filterConnections(
        flights: IFlightWithToken[],
        connectionsNumbers: string[]) {
        return flights.filter((
            flight) => {
            const result = connectionsNumbers.includes((flight.flight.legs[0].segments.length - 1).toString())
            return result && connectionsNumbers.includes((flight.flight.legs[1].segments.length - 1).toString())
        })
    }

    function filterAirlines(
        flights: IFlightWithToken[],
        airlineUids: string[]) {
        return flights.filter((
            flight) => {
            return airlineUids.includes((flight.flight.carrier.uid))
        })
    }

    function filterPrices(
        flights: IFlightWithToken[],
        minPrice: number,
        maxPrice: number) {
        return flights.filter((
            flight) => {
            const priceNumber = Number(flight.flight.price.total.amount)
            return ((priceNumber >= minPrice) && (priceNumber <= maxPrice))
        })
    }

    const defineFlightsToDisplay = (
        allFlights: IFlightWithToken[],
        sortCriteria: string,
        connections: string[],
        fromPrice: string,
        belowPrice: string,
        elements: number,
        airlineUids: string[]) => {
        let filteredFlights: IFlightWithToken[] = allFlights

        // Флаги не сделаны. Заделка на неактивные элементы в sidebar
        // const flags = {
        //     "connectedHasFlights" : [],
        //     "airlinesHasFlights" : [],
        // }

        // Фильтрация по пересадкам
        if (connections.length > 0) {
            filteredFlights = filterConnections(
                filteredFlights,
                connections)
        }

        // Фильтрация по стоимости
        let fromPriceNumber = 0
        let belowPriceNumber = 999999999
        if (fromPrice) {
            fromPriceNumber = Number(fromPrice)
        }
        if (belowPrice) {
            belowPriceNumber = Number(belowPrice)
        }
        if (fromPrice || belowPrice) {
            filteredFlights = filterPrices(
                filteredFlights,
                fromPriceNumber,
                belowPriceNumber)
        }

        // Фильтрация по авиакомпаниям
        if (airlineUids.length > 0) {
            filteredFlights = filterAirlines(
                filteredFlights,
                airlineUids)
        }

        // Сортировка
        if (sortCriteria) {
            if (sortCriteria == 'priceAscending') {
                filteredFlights = filteredFlights.sort(
                    (a, b) => {
                        return Number(a.flight.price.total.amount) - Number(b.flight.price.total.amount)
                    })
            }
            if (sortCriteria == 'priceDescending') {
                filteredFlights = filteredFlights.sort(
                    (a, b) => {
                        return Number(b.flight.price.total.amount) - Number(a.flight.price.total.amount)
                    })
            }
            if (sortCriteria == 'time') {
                filteredFlights = filteredFlights.sort(
                    (a, b) => {
                        // Так как время перелета есть туда и обратно, то будем брать минимальное из двух значений
                        // В принципе можно было взять сумму.
                        const a_min = Math.min(a.flight.legs[0].duration, a.flight.legs[1].duration)
                        const b_min = Math.min(b.flight.legs[0].duration, b.flight.legs[1].duration)
                        return a_min - b_min
                    })
            }
        }

        // const result = {
        //     "flights": filteredFlights.slice(0, elements),
        //     "flags": flags,
        // }
        // console.log(result)
        return filteredFlights.slice(0, elements)
    }

    // для списка айдишников авиакомпаний
    // const airlineUids: string[] = []
    // const uniqueAirlinesDirect = ()=>{
    //     bestDirectFlights
    // }
    // const uniqueAirlinesOneConnection =() => {
    //     bestOneConnection
    // }
    //
    // const combinedAirlines = () => {
    //
    // }


    const flightsToDisplay = useMemo(
        () => defineFlightsToDisplay(
            allFlights,
            sortCriteria,
            connections,
            fromPrice,
            belowPrice,
            visibleElements,
            airlineUids
        ),
        [allFlights, sortCriteria, connections, fromPrice, belowPrice, visibleElements, airlineUids]
    );

    const getData = () => {
        // setIsLoading(true);
        fetch('flights.json'
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(res => res.json())
            .then(data => {
                setBestDirectFlights(data.result.bestPrices.DIRECT.bestFlights)
                setBestOneConnection(data.result.bestPrices.ONE_CONNECTION.bestFlights)
                setAllFlights(data.result.flights)
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                     });

    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <Container>
            <div style={{display: "flex"}}>
                <SideBar
                    sortCriteria={sortCriteria}
                    setSortCriteria={setSortCriteria}
                    connections={connections}
                    setConnections={setConnections}
                    fromPrice={fromPrice}
                    setFromPrice={setFromPrice}
                    belowPrice={belowPrice}
                    setBelowPrice={setBelowPrice}
                    bestDirectFlights={bestDirectFlights}
                    airlineUids={airlineUids}
                    setAirlineUids={setAirlineUids}
                />
                <div style={{width: "100%"}}>
                    {flightsToDisplay && <List flightsToDisplay={flightsToDisplay} handleShowMore={handleShowMore}/>}
                </div>
            </div>
        </Container>
    )
}

export {FrontPage}