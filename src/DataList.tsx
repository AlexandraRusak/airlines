import {useEffect, useState} from "react";
import {IResult} from "./interfaces/iResult.tsx";
import {IFlightWithToken} from "./interfaces/iFlightWithToken.tsx";
import {Flight} from "./Flight.tsx";


function DataList () {

const [data, setData] = useState<IResult>()

    const getData=()=>{
        fetch('flights.json'
            ,{
                headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(function(response){
                console.log(response)
                return response.json();
            })
            .then(function(myJson) {
                console.log(myJson);
                setData(myJson)
            });
    }

    useEffect(()=>{
        getData()
    },[])


    console.log(data)

    return (<>
            {
                data?.flights.map((item: IFlightWithToken, index) => <Flight key={index} item={item}/>)
            }
    </>
    )
}

export {DataList}