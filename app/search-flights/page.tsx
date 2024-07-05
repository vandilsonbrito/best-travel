// components/SearchFlight?.tsx
'use client'
import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useGlobalStore from '../../utils/stores/useGlobalStore';
import { useGetAccesToken } from '../../hooks/useGetAccesToken';
import { useSearchFlights } from '../../hooks/useSearchFlights';
import CardSkeleton from '../../components/cardSkeleton/CardSkeleton';
import HeaderSmallDevices from '../../components/formInput/headerSmallDevices/HeaderSmallDevices';
import CardSkeletonSmallScreen from '../../components/cardSkeleton/CardSkeletonSmallScreen/CardSkeletonSmallScreen';
import HeaderBigScreens from '../../components/formInput/HeaderBigScreens';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SearchFlight: React.FC = () => {

    const { updateAccessToken, flightData, addFlightData,  isSearchBtnActive, updateIsSearchBtnActive, isSmallScreenInputClicked, updateIsDataResponseSuccess, isInputDataFilled, isSearchBtnClicked } = useGlobalStore((state) => ({
        updateAccessToken: state.updateAccessToken,
        flightData: state.flightData,
        addFlightData: state.addFlightData,
        isSearchBtnActive: state.isSearchBtnActive,
        updateIsSearchBtnActive: state.updateIsSearchBtnActive,
        isSmallScreenInputClicked: state.isSmallScreenInputClicked,
        updateIsSmallScreenInputClicked: state.updateIsSmallScreenInputClicked, 
        updateIsDataResponseSuccess: state.updateIsDataResponseSuccess,
        isInputDataFilled: state.isInputDataFilled,
        isSearchBtnClicked: state.isSearchBtnClicked
    }));;


    interface queryResult {
      data: any,
      error: any,
      isPending: boolean,
      refetch: any,
      isLoading: boolean,
      isFetching: boolean,
      isSuccess: boolean
    }
    const { data:accessTokenData } = useGetAccesToken() as queryResult;
    const {  data:searchFlightsData, error:errorSearchFlight, isPending, isLoading, isFetching, isSuccess,
    refetch } = useSearchFlights() as queryResult;
    
    useEffect(() => {
        console.log("Clicou Button to search")
        if(!isInputDataFilled) {
          toast.info("Preencha todos os campos!");
        }
    }, [isSearchBtnActive])

    useEffect(() => {
      updateAccessToken(accessTokenData?.accessToken);
    }, [accessTokenData, updateAccessToken])
    
    useEffect(() => {
      addFlightData(searchFlightsData?.data);
      updateIsDataResponseSuccess(isSuccess)
    }, [addFlightData, searchFlightsData?.data])
    
    console.log(searchFlightsData?.data)
    console.log('Flights', flightData)
    console.log("ERROR", errorSearchFlight)

    useEffect(() => {
        if(isSearchBtnActive) {
            refetch();
            updateIsSearchBtnActive(false);
        }
    }, [isSearchBtnActive])

    useEffect(() => {
      if(isSearchBtnClicked && (isInputDataFilled === false)) {
          toast.info("Preencha todos os campos!");
      }
  }, [isSearchBtnClicked])


    /* console.log(departureTime.map((item) => { return item }))
    console.log(arrivalTime.map((item) => { return item }))
    console.log(carriersCode)
    console.log(departureiataCode)
    console.log(arrivalIataCode) */
    console.log("isSmallScreenInputClicked", isSmallScreenInputClicked)

    useEffect(() => {
        console.log("TTTTTTTTTTTTTTT", isSmallScreenInputClicked)
        const formInput = document.querySelector('.form-input');
        const headerSmall = document.querySelector('.header-small-devices');
        
        if(window.innerWidth < 700) {
            if(isSmallScreenInputClicked && formInput?.classList.contains('hidden')) {
              console.log("Primeiro IF")
              formInput?.classList.remove('hidden');
              formInput?.classList.add('visible');
              headerSmall?.classList.remove('visible');
              headerSmall?.classList.add('hidden');
            }
            else if(!isSmallScreenInputClicked && formInput?.classList.contains('visible')) {
              console.log("Segundo IF")
              formInput?.classList.remove('visible');
              formInput?.classList.add('hidden');
              headerSmall?.classList.remove('hidden');
              headerSmall?.classList.add('visible');
            }
            else if(isSmallScreenInputClicked && formInput?.classList.contains('visible')) {
              console.log("Input está TRUE e FormInput está VISIBLE")
              /* window.addEventListener( 'click', (e) => {
                e.preventDefault();
                if(e.target !== formInput) {
                  console.log(formInput)
                  formInput?.classList.remove('visible');
                  formInput?.classList.add('hidden');
                  headerSmall?.classList.remove('hidden');
                  headerSmall?.classList.add('visible');
                }
              }) */
            }
            console.log("FormInput está VISIBLE", formInput?.classList.contains('visible'))
        }
    }, [isSmallScreenInputClicked])
   

    return (
        <main className='w-full h-full'>
            <ToastContainer/>
            <HeaderSmallDevices className={`header-small-devices  w-full h-full flex flex-col gap-1 sticky top-0 z-50 bg-secundary p-7  sm:hidden`}/>
    
            <HeaderBigScreens className={`form-input w-full h-full justify-center bg-secundary p-8 pt-5 sm:px-10 shadow-xl z-50 sticky top-0  hidden sm:flex`}/>

            { searchFlightsData ?
              (
                <div className='w-full h-full min-h-screen bg-white text-black px-5 pt-8 pb-5 lg:px-40 flex flex-col items-center gap-5'>
                { isPending || isFetching || isLoading ? (
                  
                    <>
                      <div className='hidden sm:flex flex-col gap-3'>
                        <CardSkeleton/>
                        <CardSkeleton/>
                        <CardSkeleton/>
                      </div>
                      <div className="flex flex-col gap-3 sm:hidden">
                        <CardSkeletonSmallScreen/>
                        <CardSkeletonSmallScreen/>
                        <CardSkeletonSmallScreen/>
                      </div>
                    </>

                  ) : (

                    <>
                      { isSuccess ? 
                        (
                          <>
                            { flightData?.length > 0 ? (
                            flightData?.map((flight: any, index: number) => (
                              <li
                                key={index}
                                className="w-full max-w-[800px] flex flex-col sm:flex-row  justify-center items-center h-full border-2 border-[#89829446] rounded-xl shadow-xl py-6 px-2"
                              >
                                <FlightDetails flight={flight} />
                                <div className={`w-72 h-full ${(flight.itineraries.length > 1 && flight.itineraries[0].segments.length > 1) ? 'min-h-[18rem] sm:min-h-[24rem]' : 'min-h-40 sm:min-h-52'} flex flex-col justify-center items-center gap-2`}>
                                  <p className="text-lg font-semibold">
                                    {flight.price.currency} {flight.price.base}
                                  </p>
                                  <Link
                                    href="#"
                                    className="px-16 py-4 bg-blue-800 text-white font-semibold rounded-xl hover:shadow-xl active:scale-[.98]"
                                  >
                                    Book
                                  </Link>
                                </div>
                              </li>
                            ))
                          ) : (
                            <p className="md:text-xl pt-5 md:pt-20">No flights found</p>
                          )}
                          </> 
                      ) : ( 
                            <>
                              <div className="w-full h-full min-h-screen flex flex-col justify-center items-center"><span className="loader"></span></div>
                            </> ) 
                      }
                    </>
              )}
                </div>
              )
              :
              (
                <div className="w-full h-full min-h-screen flex flex-col justify-center items-center">
                  <span className="loader"></span>
                </div>
              )
            }
        </main>
    )
}

interface FlightDetailsProps {
  flight: any;
}

const FlightDetails = ({ flight }: FlightDetailsProps) => {
  return (
    <div className="w-full min-h-44 sm:min-h-52 h-full flex flex-col items-center justify-center  sm:pl-7  border-b-2 sm:border-b-0 sm:border-r-2 border-[#89829446] pb-10 sm:pb-0">
      {flight.itineraries.map((itinerary:any, index:number) => (
        <div key={index} className='w-full h-full flex flex-col '>
          <p className={`text-center font-bold py-5 sm:ml-10 ${flight.itineraries.length > 1 ? 'visible' : 'hidden'}`}>{ index === 0 && 'Departure' || index === 1 && 'Return' }</p>
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

export default SearchFlight;
