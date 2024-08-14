'use client'
import { useEffect, useState } from 'react';
import { Link, usePathname, useRouter } from '../../../navigation';
import Image from 'next/image';
import useGlobalStore from '../../../utils/stores/useGlobalStore';
import { useGetAccesToken } from '../../../hooks/useGetAccesToken';
import { useSearchFlights } from '../../../hooks/useSearchFlights';
import CardSkeleton from '../../../components/cardSkeleton/CardSkeleton';
import HeaderSmallDevices from '../../../components/formInput/headerSmallDevices/HeaderSmallDevices';
import CardSkeletonSmallScreen from '../../../components/cardSkeleton/CardSkeletonSmallScreen/CardSkeletonSmallScreen';
import HeaderBigScreens from '../../../components/formInput/HeaderBigScreens';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../../../components/footer/Footer';
import { useTranslations } from 'next-intl';
import useMedia from 'use-media';
import FlightDetails from '../../../components/flightDetails/FlightDetails';
import { accessToken, DataResponse, DataItem, FlightData, Itinerarie, Segment, queryReturns, BookFlightData  } from '../../../utils/types/types';


const SearchFlight: React.FC = () => {

    const t = useTranslations('Search-flights');
    const router = useRouter();
    const isMobile = useMedia({ maxWidth: '1024px' });
    const { updateAccessToken, flightData, addFlightData,  isSearchBtnActive, updateIsSearchBtnActive, isSmallScreenInputClicked, updateIsDataResponseSuccess, isInputDataFilled, isSearchBtnClicked, updateChoseFlight } = useGlobalStore((state) => ({
        updateAccessToken: state.updateAccessToken,
        flightData: state.flightData,
        addFlightData: state.addFlightData,
        isSearchBtnActive: state.isSearchBtnActive,
        updateIsSearchBtnActive: state.updateIsSearchBtnActive,
        isSmallScreenInputClicked: state.isSmallScreenInputClicked,
        updateIsSmallScreenInputClicked: state.updateIsSmallScreenInputClicked, 
        updateIsDataResponseSuccess: state.updateIsDataResponseSuccess,
        isInputDataFilled: state.isInputDataFilled,
        isSearchBtnClicked: state.isSearchBtnClicked, 
        updateChoseFlight: state.updateChoseFlight,
        
    }));
    const [limitFlightOffers, setLimitFlightOffers] = useState<number>(8);

    

    type DataResponseWithqueryReturns = DataResponse & queryReturns;

    const {  data:searchFlightsData, error:errorSearchFlight, isFetching, isSuccess, refetch } = useSearchFlights(limitFlightOffers) as DataResponseWithqueryReturns;
    const { data:accessTokenData } = useGetAccesToken() as accessToken;
    
    useEffect(() => {
        if(!isInputDataFilled) {
          toast.info("Preencha todos os campos!");
        }
    }, [isInputDataFilled, isSearchBtnActive])

    useEffect(() => {
      updateAccessToken(accessTokenData?.accessToken);
    }, [accessTokenData, updateAccessToken])
    
    useEffect(() => {
      addFlightData(searchFlightsData?.data);
      updateIsDataResponseSuccess(isSuccess)
    }, [addFlightData, isSuccess, searchFlightsData, updateIsDataResponseSuccess])
    /* 
    console.log("flightData", flightData)
    flightData?.map((flight: any, index: number) => console.log("flight", flight))
    console.log('Flights', flightData)
    console.log("ERROR", errorSearchFlight)
    console.log("---isFetching", isFetching) */ 
    /* console.log(searchFlightsData?.data)
    console.log("---STATUSSSSS", status)  */
    
    
    

    useEffect(() => {
        if(isSearchBtnActive) {
            refetch();
            updateIsSearchBtnActive(false);
        }
    }, [isSearchBtnActive, refetch, updateIsSearchBtnActive])

    useEffect(() => {
      if(isSearchBtnClicked && (isInputDataFilled === false)) {
        toast.info(t("toast"));
      }
    }, [isInputDataFilled, isSearchBtnClicked, t])


    useEffect(() => {
        const formInput = document.querySelector('.form-input');
        const headerSmall = document.querySelector('.header-small-devices');
        
        if(isMobile) {
            if(isSmallScreenInputClicked && formInput?.classList.contains('hidden')) {
              formInput?.classList.remove('hidden');
              formInput?.classList.add('visible');
              headerSmall?.classList.remove('visible');
              headerSmall?.classList.add('hidden');
            }
            else if(!isSmallScreenInputClicked && formInput?.classList.contains('visible')) {
              formInput?.classList.remove('visible');
              formInput?.classList.add('hidden');
              headerSmall?.classList.remove('hidden');
              headerSmall?.classList.add('visible');
            }
        }
    }, [isSmallScreenInputClicked, isMobile])
   
    const handleBookClick = (index:number) => {
      updateChoseFlight(flightData[index])
      router.push("/passengers-info");
    }
    
    const handleMoreResultsClick = () => {
      setLimitFlightOffers(limitFlightOffers + 10);
      setTimeout(()=> refetch(), 100)
    }

    return (
        <main className='w-full h-full '>
            <ToastContainer/>
            <HeaderSmallDevices className={`header-small-devices  w-full h-full flex flex-col gap-1 sticky top-0 z-50 bg-secundary p-7  lg:hidden`}/>
    
            <HeaderBigScreens className={`form-input w-full h-full justify-center bg-secundary p-8 pt-5 sm:px-10 shadow-xl z-50 sticky top-0  hidden lg:flex`}/>


                <div className='w-full h-full min-h-screen bg-white text-black px-5 pt-8 pb-5 lg:px-40 flex flex-col items-center gap-5'>
                { isFetching ? (
                  
                    <>
                      <div className='hidden sm:flex flex-col gap-3'>
                        <CardSkeleton/>
                        <CardSkeleton/>
                        <CardSkeleton/>
                        <CardSkeleton/>
                        <CardSkeleton/>
                      </div>
                      <div className="flex flex-col gap-3 sm:hidden">
                        <CardSkeletonSmallScreen/>
                        <CardSkeletonSmallScreen/>
                        <CardSkeletonSmallScreen/>
                        <CardSkeletonSmallScreen/>
                        <CardSkeletonSmallScreen/>
                      </div>
                    </>

                  ) : (

                    <>
                      { errorSearchFlight ? 
                        (
                            <>  
                              <p className="md:text-xl pt-5 md:pt-20">{t("error-message")}</p>
                            </>
                          
                      ) : ( 
                        <>
                          { flightData?.length > 0 ? (
                            <>
                                <ul className="list-none p-0">
                                    {flightData.map((flight: any, index: number) => ( 
                                      <li
                                        key={index}
                                        className="w-full max-w-[900px] flex flex-col sm:flex-row justify-center items-center h-full border-2 border-[#89829446] rounded-xl shadow-xl xl:gap-8 py-6 px-2 lg:pl-2 lg:pr-6 mb-4" 
                                      >
                                        <FlightDetails flight={flight} />
                                        <div
                                          className={`w-72 xl:w-[20rem] h-full ${
                                            flight.itineraries.length > 1 && flight.itineraries[0].segments.length > 1
                                              ? 'min-h-[11rem] sm:min-h-[24rem]'
                                              : 'min-h-40 sm:min-h-52'
                                          } flex flex-col justify-center items-center gap-2`}
                                        >
                                            <p className="text-lg font-semibold">
                                              {flight.price.currency} {flight.price.base}
                                            </p>
                                            <button
                                              className="px-7 py-4 xl:px-[4rem] bg-blue-800 text-white font-semibold rounded-xl hover:shadow-xl active:scale-[.98]"
                                              onClick={() => handleBookClick(index)}
                                            >
                                              <Link href=''>{t("button")}</Link>
                                            </button>
                                        </div>
                                      </li>
                                    ))}
                                </ul>
                                <div className="w-full flex justify-center items-center py-5">
                                  <button 
                                    className="w-52 h-[4rem] lg:h-[3.8rem] px-2 bg-primary border-2 border-slate-300 text-white font-medium text-lg rounded-md text-center hover:shadow-2xl active:scale-[.98] ease-in-out"
                                    onClick={() => handleMoreResultsClick()}
                                    >{t("btn-more")}</button>
                                </div>
                            </>
                          ) : (
                            <p className="md:text-xl pt-5 md:pt-20">{t("error-message")}</p>
                          )}
                      </>
                      
                          ) 
                      }
                    </>
                  )}
              </div>
              
          <Footer/>
        </main>
    )
}



export default SearchFlight;
