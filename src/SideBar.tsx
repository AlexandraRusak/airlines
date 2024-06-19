import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {Drawer} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {useState} from "react";
import "./styles/SideBar.css"

/* eslint-disable  @typescript-eslint/no-explicit-any */

const useStyles: any = makeStyles({
    drawerPaper: {
        width: 240,
        paddingInline: 10,
    }
})

function SideBar() {

    const [sortValue, setSortValue] = useState<string>("")
    const [filterValue, setFilterValue] = useState<string>("")
    const [fromPrice, setFromPrice] = useState<string>("")
    const [belowPrice, setBelowPrice] = useState<string>("")


    console.log(filterValue)
    console.log(sortValue)
    console.log(fromPrice)
    console.log(belowPrice)

    const classes = useStyles()
    const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSortValue(event.target.value)
    }
    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilterValue(event.target.value)
    }

    const handleFromPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFromPrice(event.target.value)
    }

    const handleBelowPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBelowPrice(event.target.value)
    }


    return (
        <Drawer variant="permanent" anchor={"left"} sx={{width: 240, flexShrink: 0}}
                classes={{paper: classes.drawerPaper}}>
            <FormControl>
                <FormLabel id="sort" sx={{marginTop: 5, marginBottom: 1}}>Сортировать</FormLabel>
                <RadioGroup
                    aria-labelledby="sort"
                    defaultValue=""
                    name="sort-radio-buttons-group"
                    value={sortValue}
                    onChange={handleSortChange}
                >
                    <FormControlLabel value="priceAscending" control={<Radio/>} label="- по возрастанию цены"/>
                    <FormControlLabel value="priceDescending" control={<Radio/>} label="- по убыванию в цене"/>
                    <FormControlLabel value="time" control={<Radio/>} label="- по времени в пути"/>
                </RadioGroup>
            </FormControl>

            <FormControl>
                <FormLabel id="filter" sx={{marginTop: 5, marginBottom: 1}}>Фильтровать</FormLabel>
                <RadioGroup
                    aria-labelledby="filter"
                    defaultValue=""
                    name="filter-radio-buttons-group"
                    value={filterValue}
                    onChange={handleFilterChange}
                >
                    <FormControlLabel value="oneConnection" control={<Radio/>} label="- 1 пересадка"/>
                    <FormControlLabel value="Direct" control={<Radio/>} label="- без пересадок"/>
                </RadioGroup>
            </FormControl>

            <FormLabel sx={{marginTop: 5, marginBottom: 1}}>Цена</FormLabel>
            <div className="container">
                <div className="line">
                    <label htmlFor="fromPrice">от</label>
                    <input className="input" type="number" id="fromPrice" aria-describedby="priceFrom"
                           value={fromPrice}
                           onChange={handleFromPriceChange}/>
                </div>
                <div className="line">
                    <label htmlFor="belowPrice">до</label>
                    <input className="input" type="number" id="belowPrice" aria-describedby="belowPrice"
                           value={belowPrice}
                           onChange={handleBelowPriceChange}/>
                </div>
            </div>
        </Drawer>
    )
}

export {SideBar}