// eslint-disable-next-line react/prop-types
import Spinner from "./Spinner";
import Message from "./Message"
import style from "./CityList.module.css"
import PropTypes from "prop-types";
import CityItem from "./CityItem";
import { useCities } from "../context/CitiesContext";

CityList.propTypes={
    cities : PropTypes.array,
    isLoading : PropTypes.bool,
}

 function CityList() {
    const {cities,isLoading}=useCities();
    if(isLoading) return <Spinner />;
    if(!cities.length) return <Message message="Add your first city by clicking the city in the map"/>;
    return (
        <ul className={style.cityList}>
            {cities.map(city => <CityItem city={city} key={city.cityName} />)}
        </ul>
    )
    }

    export default CityList;
