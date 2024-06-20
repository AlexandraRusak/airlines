import {SideBar} from "./SideBar.tsx";
import {List} from "./List.tsx";
import {useEffect, useMemo, useState} from "react";
import {IFlightWithToken} from "./interfaces/iFlightWithToken.tsx";
import {Container} from "@mui/material";
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

        if (connections.length > 0) {
            filteredFlights = filterConnections(
                filteredFlights,
                connections)
        }

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

        if (airlineUids.length > 0) {
            filteredFlights = filterAirlines(
                filteredFlights,
                airlineUids)
        }

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
                        const a_min = Math.min(a.flight.legs[0].duration, a.flight.legs[1].duration)
                        const b_min = Math.min(b.flight.legs[0].duration, b.flight.legs[1].duration)
                        return a_min - b_min
                    })
            }
        }
        return filteredFlights.slice(0, elements)
    }

    const onlyUnique = (bestFlights: IBestFlight[]) => {
        const uniqueAirlines: IBestFlight[] = [];
        const airlineIds: Set<string> = new Set();

        bestFlights.forEach((flight) => {
            if (!airlineIds.has(flight.carrier.uid)) {
                airlineIds.add(flight.carrier.uid);
                uniqueAirlines.push(flight);
            } else {
                const existingFlight = uniqueAirlines.find(
                    (uniqueFlight) => uniqueFlight.carrier.uid === flight.carrier.uid
                );
                if (existingFlight && Number(flight.price.amount) < Number(existingFlight.price.amount)) {
                    existingFlight.price = flight.price;
                }
            }
        });
        return uniqueAirlines;
    };

    let bestFligts: IBestFlight[] = []

    if (connections.length > 0) {
        if (connections.includes('1')) {
            bestFligts = bestFligts.concat(bestOneConnection)
        }
        if (connections.includes('0')) {
            bestFligts = bestFligts.concat(bestDirectFlights)
        }
    } else {
        bestFligts = bestDirectFlights.concat(bestOneConnection)
    }

    const uniqueBestFligts = onlyUnique(bestFligts)


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
                    airlineUids={airlineUids}
                    setAirlineUids={setAirlineUids}
                    uniqueBestFligts={uniqueBestFligts}
                />
                <div style={{width: "100%"}}>
                    {flightsToDisplay && <List flightsToDisplay={flightsToDisplay} handleShowMore={handleShowMore}/>}
                </div>
            </div>
        </Container>
    )
}

export {FrontPage}