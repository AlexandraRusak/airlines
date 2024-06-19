import {useEffect, useState} from "react";
// import {IResult} from "./interfaces/iResult.tsx";
import {IFlightWithToken} from "./interfaces/iFlightWithToken.tsx";
import {Flight} from "./Flight.tsx";
import {Spinner} from "./Spinner.tsx";
import {Button} from "@mui/material";


function DataList() {

    const [data, setData] = useState<IFlightWithToken[]>()
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState<number>(1)
    const cards: number = 4;
    // const [cards, setCards] = useState<number>(4)
    const getData = () => {
        setIsLoading(true);
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
                // console.log(data)
                console.log(data.result)
                setData(data.result.flights.slice(0, page * cards))
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                setIsLoading(false);
            });

    }

    useEffect(() => {
        getData()
    }, [page])


    // console.log(data)
    // console.log(data?.flights)

    if (isLoading) {
        return (
            <Spinner/>
        )
    }

    return (<>
            {
                data && data.map((item: IFlightWithToken, index) => {
                    return <Flight key={index} item={item}/>;
                })
            }
            <Button onClick={()=>setPage(page+1)}>показать еще</Button>
        </>
    )
}

export {DataList}