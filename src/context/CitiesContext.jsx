import { createContext,useEffect, useContext, useReducer } from "react";
import PropTypes from "prop-types";

const CitiesContext = createContext();

CitiesProvider.propTypes={
    children : PropTypes.element,
}

const initialState={
  cities:[],
  isLoading : false,
  currentCity : {},
  error: ""
}

function reducer(state,action){
  switch(action.type){
    case "loading":
      return {...state,isLoading:true};

    case "cities/loaded":
      return {...state,isLoading:false,cities:action.payload};

    case "city/loaded":
      return {...state,isLoading:false,currentCity:action.payload};

    case "city/create":
      return {...state,isLoading:false,cities:[...state.cities,action.payload],currentCity:action.payload};

    case "city/delete":
      return {...state,isLoading:false,cities:(state.cities.filter(city => city.id !== action.payload))};

    case "rejected":
      return {...state,isLoading:false,error : action.payload};

    default:
      throw new Error("unknown reducer type error")
  }
}
function CitiesProvider({children}){
  const [{cities,isLoading,currentCity,error},dispatch]=useReducer(reducer,initialState)
  const baseApi = "http://localhost:8000";

  useEffect(function(){
    async function fetchCities(){
      dispatch({type:"loading"});

      try{
      const res = await fetch(`${baseApi}/cities`);
      const data = await res.json();
      dispatch({type:"cities/loaded",payload:data})
      }
      catch{
        dispatch({type : "rejected",payload:"json server not responding"})
      }    
    }
    fetchCities();
  },[])

 async function getCities(id){
  dispatch({type:"loading"});

  try{
    const res = await fetch(`${baseApi}/cities/${id}`);
    const data = await res.json();
    dispatch({type:"city/loaded",payload:data})
  }
    catch{
      dispatch({type : "rejected",payload:"error in the cities fetch"})
    }
  }
  
  async function addCities(newCity){
    dispatch({type:"loading"});
    
    try{
      const res = await fetch(`${baseApi}/cities`,{
        method: "POST",
        body : JSON.stringify(newCity),
        headers :{
          "Content-Type": "application/json"
        }
      });
      const data = await res.json();
      dispatch({type:"city/create",payload:data})
    }
    catch{
      dispatch({type : "rejected",payload:"error in adding new city"})
    }
    
  }
  
  async function deleteCities(id){
    if(Number(id) === currentCity.id ) return
    dispatch({type:"loading"});  
    try{
      await fetch(`${baseApi}/cities/${id}`,{
        method: "DELETE"
      });
      dispatch({type:"city/delete",payload:id})
    }
    catch{
      dispatch({type : "rejected",payload:"error in deleting city"})
    }

}
// console.log(currentCity)
  return(
    <CitiesContext.Provider value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCities,
        addCities,
        deleteCities
    }}>
        {children}
    </CitiesContext.Provider>
  )
}

function useCities(){
    const context = useContext(CitiesContext)
    if(context === undefined) throw new Error("the cities context used outside the scope")
    return context
}


export {CitiesProvider, useCities} ;
