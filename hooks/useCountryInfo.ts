import { useQuery } from "@tanstack/react-query";
import useGlobalStore from '../utils/stores/useGlobalStore';

export function useCountryInfo() {
    const { passengerInfo, travelersInput } = useGlobalStore((state) => state);
    let arr:string[] = [], index = 0, countryCode: string;
    for(let i = 0; i < parseInt(travelersInput); i++) {
        arr.push(passengerInfo?.[`Nationality${index}`]);
        index++;
    }
    countryCode = arr.join('|')
    const getCountryInfo = async () => {
        try {
            const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/paises/${countryCode}`)
            const data = await response.json();
            return data;
        }
        catch(error) {
            console.error("Error fetching country info", error)
        }
      }

    const query = useQuery({
        queryFn: getCountryInfo,
        queryKey: ['country-name'],
        enabled: !!passengerInfo.Nationality1
    })
    return query;
}