'use client'
import { useEffect, useMemo, useState } from "react";
import Fuse, { FuseResult } from 'fuse.js';
import airports from '../../airports-data/airports.json';
import './autocomplete.css';
import useGlobalStore from '../../utils/stores/useGlobalStore';


interface AutocompleteProps {
  isLocationInputFromOnFocus: boolean;
  isLocationInputToOnFocus: boolean;
}
type LocationInputFromProps = {
  locationInputFrom: string;
  locationInputTo?: string;
} & AutocompleteProps;

type LocationInputToProps = {
  locationInputTo: string;
  locationInputFrom?: string;
} & AutocompleteProps;
type AtLeastOneLocationInput = LocationInputFromProps | LocationInputToProps;


function Autocomplete({ isLocationInputFromOnFocus, isLocationInputToOnFocus, locationInputFrom, locationInputTo }: AtLeastOneLocationInput) {

  const { addLocationInputFrom, addLocationInputTo } = useGlobalStore((state:any) => ({
    addLocationInputFrom: state.addLocationInputFrom,
    addLocationInputTo: state.addLocationInputTo,
  }))
  

  interface AirportData {
    name: string;
    city: string;
    country: string;
    IATA: string;
    ICAO: string;
    lat: string;
    lon: string;
    timezone: string;

  }
  const [strMatched, setStrMatched] = useState<AirportData[]>([]);

  
  const fuse = useMemo(() => {
    const options = {
      shouldSort: true,
      threshold: 0.4,
      maxPatternLength: 32,
      keys: [
        { name: 'IATA', weight: 0.5 },
        { name: 'name', weight: 0.3 },
        { name: 'city', weight: 0.2 }
      ]
    }
    return new Fuse(airports, options);
  }, [])
  
  useEffect(() => {
    let result: FuseResult<AirportData>[] = [];

    if (locationInputFrom) {
      result = fuse.search(locationInputFrom).slice(0, 7);
    } 
    else if (locationInputTo) {
      result = fuse.search(locationInputTo).slice(0, 7);
    }

    if (result.length > 0) {
      const matchedAirports = result.map(({ item }) => item).filter((item) => item.IATA !== '\\N');
      setStrMatched(matchedAirports);
    } 
    else {
      setStrMatched([]);
    }
  }, [fuse, locationInputFrom, locationInputTo, setStrMatched])

  const handleSelectedAirport = (IATA: string) => {
    if(isLocationInputFromOnFocus && locationInputFrom) {
      addLocationInputFrom(IATA);
    }
    else {
      addLocationInputTo(IATA);
    }
  }

  return (
    <div className={`${((isLocationInputFromOnFocus && locationInputFrom && strMatched.length > 0) || (isLocationInputToOnFocus && locationInputTo && strMatched.length > 0)) ? 'visible' : 'hidden'} text-black bg-white w-[13rem] h-[13rem] overflow-y-scroll z-50 absolute top-[3.6rem] left-0  scrollable-container`}> 
        { strMatched.map(({ IATA, name, city, country }, index) => ( 
          (
            <div key={index} tabIndex={index} className="autocomplete-result hover:bg-slate-100" onClick={() => handleSelectedAirport(IATA)}>
                 <div>
                    <b>{IATA}</b> 
                    <span> - {name}</span>
                    </div>
                 <div className="autocomplete-location">{city}, {country}</div>
            </div>
          )
      )) }  
    </div>
  )
}

export default Autocomplete
