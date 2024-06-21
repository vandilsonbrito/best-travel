'use client'
import {  useEffect, useState } from "react";
import Link from "next/link";
import { MdPerson } from "react-icons/md";
import { useAirportLocation } from '../../../hooks/useAirportLocation';
import useGlobalStore from '../../../utils/stores/useGlobalStore';
import Form from "../form/Form";


function FormInput() {

    const { locationInputFrom, addLocationInputFrom, locationInputTo, addLocationInputTo, addLocationResponseData, locationResponseData, addDepartureDateInput, addArrivalDateInput, addTravelersInput, departureDateInput, arrivalDateInput } = useGlobalStore((state:any) => ({
        locationInputFrom: state.locationInputFrom,
        addLocationInputFrom: state.addLocationInputFrom,
        locationInputTo: state.locationInputTo,
        addLocationInputTo: state.addLocationInputTo,
        addLocationResponseData: state.addLocationResponseData,
        locationResponseData: state.locationResponseData,
        addDepartureDateInput: state.addDepartureDateInput,
        addArrivalDateInput: state.addArrivalDateInput,
        addTravelersInput: state.addTravelersInput,
        departureDateInput: state.departureDateInput,
        arrivalDateInput: state.arrivalDateInput
    }))
    /* const { data } = useAirportLocation();

    useEffect(() => {
        if(!data) return addLocationResponseData('');
        data.map((location:any) => {
            addLocationResponseData(`${location.code}, ${location.city_name}, ${location.country_name}`)
        })
    }, [data])
    console.log(data)
    console.log("LocationResponseData", locationResponseData) */

    const [checkInputs, setCheckInputs] = useState<{ [key: string]: boolean }>({
        'one-way': false,
        'round-trip': true,
    });
    
    useEffect(() => {
        const inputsCheckbox = document.querySelectorAll("input[type='checkbox']") as NodeListOf<HTMLInputElement>;
        inputsCheckbox.forEach((input) => {
            input.checked = checkInputs[input.name];
        });
    
        const handleChange = (event: Event) => {
            const target = event.target as HTMLInputElement;
            setCheckInputs((prev) => {
                const newCheckInputs = { ...prev, [target.name]: target.checked };
                if (target.name === 'one-way' && target.checked) {
                    newCheckInputs['round-trip'] = false;
                } else if (target.name === 'round-trip' && target.checked) {
                    newCheckInputs['one-way'] = false;
                }
                return newCheckInputs;
            });
        };
        
        inputsCheckbox.forEach((input) => {
            input.addEventListener('change', handleChange);
        });
    
        console.log(checkInputs)
        return () => {
            inputsCheckbox.forEach((input) => {
                input.removeEventListener('change', handleChange);
            });
        };
    }, [checkInputs]);


    /* console.log("From", locationInputFrom)
    console.log("To", locationInputTo)
    console.log("Departure-Date", departureDateInput)
    console.log("Arrival-Date", arrivalDateInput) */

    return (
        <Form isFlightSearchPage={false}/>
    )
}

export default FormInput
