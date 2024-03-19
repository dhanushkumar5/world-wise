// eslint-disable-next-line react/prop-types
import Spinner from "./Spinner";
import Message from "./Message"
import style from "./CountryList.module.css"
import PropTypes from "prop-types";
import CountryItem from "./CountryItem";
import { useCities } from "../context/CitiesContext";

CountryList.propTypes={
    cities : PropTypes.array,
    isLoading : PropTypes.bool,
}

 function CountryList() {
    const {cities,isLoading}=useCities();
    if(isLoading) return <Spinner />;
    if(!cities.length) return <Message message="Add your first city by clicking the city in the map"/>;

    const countries=cities.reduce((arr,city)=>{
        if(!arr.map(e => e.country).includes(city.country))
        return [...arr,{country: city.country,emoji: city.emoji}]
        else
        return arr;
    },[]);
    return (
        <ul className={style.countryList}>
            {countries.map(country => <CountryItem country={country} key={country.country}/>)}
        </ul>
    )
    }

    export default CountryList;
