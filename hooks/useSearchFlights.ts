import { useQuery, keepPreviousData } from "@tanstack/react-query";
import useGlobalStore from '../utils/stores/useGlobalStore';


export function useSearchFlights(limitOffers:number) {

    const { accessToken, locationInputFrom, locationInputTo, departureDateInput, returnDateInput, travelersInput, isReturnTravel, isInputDataFilled } = useGlobalStore((state) => ({
        accessToken: state.accessToken,
        locationInputFrom: state.locationInputFrom,
        locationInputTo: state.locationInputTo,
        departureDateInput: state.departureDateInput,
        returnDateInput: state.returnDateInput,
        travelersInput: state.travelersInput,
        isReturnTravel: state.isReturnTravel,
        isInputDataFilled: state.isInputDataFilled
    }))

    const travelStyle = {
      'false': [
          {
            id: "1",
            originLocationCode: locationInputFrom || null,
            destinationLocationCode: locationInputTo || null,
            departureDateTimeRange: {
              date: departureDateInput || null
              
            }
          }
      ],
      'true': [
          {
            id: "1",
            originLocationCode: locationInputFrom || null,
            destinationLocationCode: locationInputTo || null,
            departureDateTimeRange: {
              date: departureDateInput || null
              
            }
          },
          {
            id: "2",
            originLocationCode: locationInputTo || null,
            destinationLocationCode: locationInputFrom || null,
            departureDateTimeRange: {
              date: returnDateInput || null,
              
            }
          }
      ]
    }
    const selectedTravelStyle = travelStyle[isReturnTravel.toString() as "true" | "false"];

    type Traveler = {
      id: string,
      travelerType: string
    }
    const travelersHelper = () => {
      let travelers = [];
      let aux = { id: '', travelerType: "ADULT"};
      for(let index = 1; index <= Number(travelersInput); index++) {
          travelers.push(aux);
      }
      return travelers.map((item: Traveler, index:number) => ({
          ...item,
          id: `${index + 1}`
      }));
  }

    const fetchFlights = async () => {
        const response = await fetch('https://test.api.amadeus.com/v2/shopping/flight-offers', {
            method: 'POST',
            headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                currencyCode: "BRL",
                originDestinations: selectedTravelStyle,
                travelers: travelersHelper(),
                sources: ["GDS"],
                searchCriteria: {
                    maxFlightOffers: limitOffers,
                    flightFilters: {
                        cabinRestrictions: [
                        {
                            cabin: "ECONOMY",
                            coverage: "MOST_SEGMENTS",
                            originDestinationIds: ["1"]
                        }
                        ],
                        connectionRestriction: {
                        maxNumberOfConnections: 1
                        }
                    }
                }
              })
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    };
    const query = useQuery({
        queryFn: fetchFlights,
        queryKey: ['flights-data'],
        enabled: !!accessToken && isInputDataFilled,
        placeholderData: keepPreviousData,
    }); 
    return query;
}
