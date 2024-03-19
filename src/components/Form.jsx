// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";


import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCities } from "../context/CitiesContext";
import { useNavigate } from "react-router-dom";

const baseUrl = "https://api.bigdatacloud.net/data/reverse-geocode-client";
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingGeo,setIsLoadingGeo]=useState(false);
  const [lat,lng]=useUrlPosition();
  const [emoji,setEmoji]=useState();
  const [geoError,setGeoError]=useState("")

  const {addCities,isLoading}=useCities();
  const navigate = useNavigate()

  useEffect(function(){
      async function fetchLoc(){

        try{
          setIsLoadingGeo(true)
          setGeoError("")
        const res =await fetch(`${baseUrl}?Latitude=${lat}&Longitude=${lng}`);
        const data =await res.json();

        if(!data.countryCode) throw new Error("This doesn't seem to be a city,Click somewhere else😉")
        setCityName(data.city || data.locality || " ");
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode))
        ;}

        catch(err){
          setGeoError(err.message)
        }
        
        finally{
          setIsLoadingGeo(false)
        }
      }
      fetchLoc();
  },[lat,lng])

  async function handleAdd(e){
    e.preventDefault();
    if(!cityName || !date) return;
    const newCity={
      cityName,
      country,
      emoji,
      date,
      notes,
      position :{lat,lng}    
    }
    await addCities(newCity);
    navigate("/app/cities")
  }
  
  if(isLoadingGeo) return <Spinner />
  if(!lat && !lng ) return <Message message="Click on the map to start adding your memory🌟"/>
  if(geoError) return <Message message={geoError} />;


  return (
    <form className={`${styles.form} ${isLoading ? styles.loading : ""}`} onSubmit={handleAdd}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row} >
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker selected={date} onChange={date => setDate(date)} dateFormat="dd/MM/yyyy" />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary"> Add</Button>
        <BackButton />
        </div>
    </form>
  );
}

export default Form;
