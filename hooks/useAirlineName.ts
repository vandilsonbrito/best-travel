import { useQuery } from "@tanstack/react-query";
import useGlobalStore from '../utils/stores/useGlobalStore';

export function useAirlineName() {
    const { accessToken, choseFlight, carrierCode } = useGlobalStore((state) => ({
        accessToken: state.accessToken,
        choseFlight: state.choseFlight,
        carrierCode:state.carrierCode
    }));
    

    const IATACode = carrierCode.slice(0,(carrierCode.length)/2)
    console.log("IATACode---------", IATACode)
    console.log("IATACode---TYPE----", typeof IATACode)

    const fetchIataCode =  async () => {
        try {   
            const response = await fetch(`https://test.api.amadeus.com/v1/reference-data/airlines?airlineCodes=${carrierCode.join(',')}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                }
            })
            const data = await response.json();
            return data;
        }
        catch(error) {
            console.error("Error fetching Airline Name")
        }
    }
    const query = useQuery({
        queryFn: fetchIataCode,
        queryKey: ['airline-names-data'],
        enabled: !!accessToken,
    })
    return query;
}

