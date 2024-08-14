import { useTranslations } from "next-intl";
import Image from "next/image";
import {  FlightData, Itinerarie, Segment } from '../../utils/types/types';


  
  interface FlightDetailsProps {
    flight: FlightData,
  }
  
  const FlightDetails = ({ flight }: FlightDetailsProps) => {
    const t = useTranslations('Search-flights');
    return (
      <div className="w-full min-h-44 sm:min-h-52 h-full flex flex-col items-center justify-center  sm:pl-7  border-b-2 sm:border-b-0 sm:border-r-2 border-[#89829446] pb-10 sm:pb-0">
        {flight.itineraries.map((itinerary:Itinerarie, index:number) => ( 
          <div key={index} className='w-full h-full flex flex-col '>
            <p className={`text-center font-bold py-5 sm:ml-10 ${flight.itineraries.length > 1 ? 'visible' : 'hidden'}`}>{ index === 0 && t("departure") || index === 1 && t("return") }</p>
            <ItineraryDetails key={index} itinerary={itinerary} />
          </div>
        ))}
      </div>
    );
  };

  interface ItineraryDetailsProps {
    itinerary: Itinerarie;
  }
  
  const ItineraryDetails = ({ itinerary }: ItineraryDetailsProps) => {
    return (
      <>
        {itinerary.segments.map((segment:Segment, index:number) => ( 
          <SegmentDetails key={index} itinerary={itinerary} segment={segment}/>
        ))}
      </>
    );
  };
  
  const getAirlineLogo = (carrierCode:string):string => {
    return `https://assets.duffel.com/img/airlines/for-light-background/full-color-logo/${carrierCode}.svg`
  }
  
  function formatDuration(duration:String): string {
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
    itinerary: Itinerarie; 
    segment: Segment;
    key: number;
  }
  const SegmentDetails = ({ itinerary, segment }: SegmentDetailsProps) => {
  
    const t = useTranslations('Search-flights');
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
  
                          <p className={`text-[.81rem] text-green-800 font-medium absolute top-[.8rem] -left-[5.7rem] sm:-left-[7.3rem]  ${itinerary.segments.length >= 2 ? 'hidden' : 'visible'}`}>{itinerary.segments.length === 1 ? t("nonstop") : ''}</p>
  
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

  export default FlightDetails;