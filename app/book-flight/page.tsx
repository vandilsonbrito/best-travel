'use client'
import React, { useEffect, useState } from 'react';
import { useBookFlight } from '../../hooks/useBookFlight';
import { useGetAccesToken } from '../../hooks/useGetAccesToken';
import { useFlightOfferConfirm } from '../../hooks/useFlightOfferConfirm';
import useGlobalStore from '../../utils/stores/useGlobalStore';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { useAirlineName } from '../../hooks/useAirlineName';

const BookFlight: React.FC = () => {

    const { data:accessTokenData } = useGetAccesToken();
    const { data:flightOfferData, error, status } = useFlightOfferConfirm();
    const { data:bookFlightData, error:errorBookingFlight, status:statusBookingFlight, isFetching } = useBookFlight();
    const { data:airlineNames } = useAirlineName();
    console.log("airlineNames---", airlineNames)

    const { updateAccessToken, updateFlightBooked, flightBooked, departureDateInput, returnDateInput } = useGlobalStore((state) => ({
        updateAccessToken: state.updateAccessToken,
        updateFlightBooked: state.updateFlightBooked,
        flightBooked: state.flightBooked,
        departureDateInput: state.departureDateInput,
        returnDateInput: state.returnDateInput
    }));

    useEffect(() => {
        updateAccessToken(accessTokenData?.accessToken);
    }, [accessTokenData, updateAccessToken])

    useEffect(() => {
        updateFlightBooked(bookFlightData?.data)
    }, [accessTokenData, bookFlightData?.data])

    console.log("Status", statusBookingFlight)
    console.log("errorBookingFlight", errorBookingFlight)
    console.log("bookData", bookFlightData)
    console.log("FLIGHTOfferDATA", flightOfferData)

    interface Traveler {
        gender: 'MALE' | 'FEMALE';
        name: {
          firstName: string;
          lastName: string;
        };
    }
    
    console.log("statusBookingFlight", statusBookingFlight)

    return (
        <>
            <Header/>
            <main className='w-full h-full min-h-screen flex flex-col justify-center items-center'> 
                {   
                    isFetching ? 
                    (
                        <>
                            <p className='text-lg mb-3'>Loading Data...</p>
                            <span className="loader"></span>
                        </>
                    )
                    :
                    (
                        errorBookingFlight ? 
                        (
                            <>
                                <p className='text-xl'>Error</p>
                                <p>Try to book again.</p>
                            </>
                        )
                        :
                        (
                             
                            bookFlightData?.errors?.length > 0 ?
                            (
                                <>
                                    <p className='text-xl'>Error</p>
                                    <p>Try to book again.</p>
                                </>
                            ) :
                            (
                                <div className="w-full h-full min-h-[400px] p-5 md:p-12 flex flex-col items-center">
                                    <div className="w-full xl:w-[70%] flex flex-col items-center p-10 border-2 border-borderColor rounded-md">
                                        <div className="w-full flex flex-col items-start text-lg font-medium pb-7 border-b-2 border-borderColor">
                                            <p>Booking Status: 
                                                <span className={`${bookFlightData?.data?.ticketingAgreement?.option === 'CONFIRM' ? 'text-green-500' : 'text-red-500'}`}>{' ' + (bookFlightData?.data?.ticketingAgreement?.option || ' Error')}</span>
                                            </p>
                                            <p>Booking Code: 
                                                <span className='font-semibold'>{' ' + (bookFlightData?.data?.associatedRecords?.[0]?.reference || '----')}</span>
                                            </p>
                                            <p>Created At: {(bookFlightData?.data?.associatedRecords?.[0]?.creationDate)?.split('T')[0] || '----'}</p>
                                            <p>Passenger(s): 
                                                <span className=''>{' ' + (bookFlightData?.data?.travelers?.map((traveler:Traveler) => `${traveler?.gender === 'MALE' ? 'Mr.' : 'Mrs.'} ${traveler?.name?.lastName}`).join(', ') || '----')}</span>
                                            </p>
                                            <p>Total Price: 
                                                <span className=''> {bookFlightData?.data?.flightOffers?.[0]?.price.currency} {' ' + ((bookFlightData?.data?.flightOffers?.[0]?.price?.base) || '----')}</span>
                                            </p>
                                        </div>
                                        <div className="w-full flex items-center justify-center">
                                            {
                                                flightBooked?.flightOffers?.map((flight: any, index: number) => (
                                                    <>
                                                        <li
                                                        key={index}
                                                        className="w-full max-w-[510px] flex flex-col sm:flex-row  justify-center items-center h-full rounded-xl py-6 px-2"
                                                        >
                                                        <FlightDetails flight={flight} departureDateInput={departureDateInput} returnDateInput={returnDateInput}/>
                                                
                                                        </li>
                                                    </>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                            
                        )
                    )
                }
            </main>
            <Footer/>
        </>
    )
}


interface FlightDetailsProps {
    flight: any,
    departureDateInput: string,
    returnDateInput: string
  }
  
  const FlightDetails = ({ flight, departureDateInput, returnDateInput }: FlightDetailsProps) => {
    return (
      <div className="w-full min-h-44 sm:min-h-52 h-full flex flex-col items-center justify-center  sm:pl-7  pb-10 sm:pb-0">
        {flight.itineraries.map((itinerary:any, index:number) => (
          <div key={index} className='w-full h-full flex flex-col '>
            <p className={`text-center font-bold py-5 sm:ml-10 ${flight.itineraries.length > 0 ? 'visible' : 'hidden'}`}>{ index === 0 && `Departure at ${departureDateInput}` || index === 1 && `Return at ${returnDateInput}` }</p>
            <ItineraryDetails key={index} itinerary={itinerary} />
          </div>
        ))}
      </div>
    );
  };
  
  interface ItineraryDetailsProps {
    itinerary: any;
    key: number;
  }
  
  const ItineraryDetails = ({ itinerary }: ItineraryDetailsProps) => {
    return (
      <>
        {itinerary.segments.map((segment:any, index:number) => (
          <SegmentDetails key={index} itinerary={itinerary} segment={segment} />
        ))}
      </>
    );
  };
  
  const getAirlineLogo = (carrierCode:string):string => {
    return `https://assets.duffel.com/img/airlines/for-light-background/full-color-logo/${carrierCode}.svg`
  }
  
  function formatDuration(duration:String) {
    const regex = /PT(?:(\d+)H)?(?:(\d+)M)?/;
    const matches = duration?.match(regex);
    if (!matches) {
      return 'Invalid duration format';
    }
    const hours = matches[1] ? parseInt(matches[1], 10) : 0;
    const minutes = matches[2] ? parseInt(matches[2], 10) : 0;
    return `${hours}h ${minutes}`;
  }
  
  interface SegmentDetailsProps {
    itinerary: any;
    segment: any;
    key: number;
  }
  const SegmentDetails = ({ itinerary, segment }: SegmentDetailsProps) => {
  
    return (
      <div className='w-full h-[5.2rem] flex flex-col sm:flex-row  justify-between items-center'>
  
              <Image
              src={getAirlineLogo(segment.carrierCode)}
              alt="Airline Logo"
              width={50}
              height={50}
              className='pb-5 sm:py-0 w-8 sm:w-[50px]'
              />
              
              {/* Flight Info */}
              <div className="w-full h-fit flex items-center justify-center">
                  <div className="w-fit flex items-center gap-5 px-5">
                      <div className="">
                        <p className='text-sm sm:text-2xl'>{new Date(segment.departure.at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) }</p>
                        <p className='text-end'>{segment.departure.iataCode}</p>
                      </div>
                  <div className="w-fit flex justify-center items-center gap-2">
                      <div className='w-28 sm:w-40 h-[2px] bg-[#898294ce]'></div>
                      <div className="w-4 h-4 relative">
                          <p className='text-[.9rem] absolute -top-5 -left-[5rem] sm:-left-[6.7rem]'>{formatDuration(segment.duration)}</p>
                          <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" viewBox="0 0 12 12" className=""><path fill="#898294ce" d="M3.922 12h.499a.52.52 0 0 0 .444-.247L7.949 6.8l3.233-.019A.8.8 0 0 0 12 6a.8.8 0 0 0-.818-.781L7.949 5.2 4.866.246A.525.525 0 0 0 4.421 0h-.499a.523.523 0 0 0-.489.71L5.149 5.2H2.296l-.664-1.33a.523.523 0 0 0-.436-.288L0 3.509 1.097 6 0 8.491l1.196-.073a.523.523 0 0 0 .436-.288l.664-1.33h2.853l-1.716 4.49a.523.523 0 0 0 .489.71"></path></svg>
  
                          <p className={`text-[.81rem] text-green-800 font-medium absolute top-[.8rem] -left-[5.7rem] sm:-left-[7.3rem]  ${segment.length >= 2 ? 'hidden' : 'visible'}`}>{itinerary.segments.length === 1 ? 'Nonstop' : ''}</p>
  
                      </div>
                      <div className="w-fit">
                          <p className='text-sm sm:text-2xl'>{ new Date(segment.arrival.at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) }</p>
                          <p className='text-end'>{segment.arrival.iataCode}</p>
                      </div>
                  </div>
                  </div>
              </div>    
          </div>
  
    );
  };

export default BookFlight;
