import { useQuery } from "@tanstack/react-query";
import useGlobalStore from '../utils/stores/useGlobalStore';

export function useFlightOfferConfirm() {
    const { accessToken, choseFlight } = useGlobalStore((state) => ({
        accessToken: state.accessToken,
        choseFlight: state.choseFlight
    }));

    console.log("Token", accessToken)
    console.log("ChoseFlight", choseFlight);

    const fetchOfferConfirm = async () => {
        try {
            const response = await fetch('https://test.api.amadeus.com/v1/shopping/flight-offers/pricing', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data: {
                        type: "flight-offers-pricing",
                        flightOffers: [choseFlight]
                    }
                })
            });
            const data = await response.json();
            if (!response.ok) {
                const errorDetail = data;
                console.error('Error details:', errorDetail);
            }

            return data;
        } catch (error) {
            console.error('Error fetching offer confirm:', error);
            throw error;
        }
    };

    const query = useQuery({
        queryFn: fetchOfferConfirm,
        queryKey: ['flight-offer-data'],
        enabled: !!accessToken,
    });
    
    return query;
}
