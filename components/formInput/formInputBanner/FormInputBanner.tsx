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
 
    return (
        <Form isFlightSearchPage={false}/>
    )
}

export default FormInput
