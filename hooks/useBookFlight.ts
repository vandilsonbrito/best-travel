import { useQuery } from "@tanstack/react-query";
import useGlobalStore from '../utils/stores/useGlobalStore';

export function useBookFlight() {
    const { accessToken, choseFlight, passengerInfo, travelersInput } = useGlobalStore((state) => ({
        accessToken: state.accessToken,
        choseFlight: state.choseFlight,
        passengerInfo: state.passengerInfo,
        travelersInput: state.travelersInput
    }));

    console.log("Token", accessToken)
    console.log("ChoseFlight", choseFlight);
    console.log("passengerInfo-------", passengerInfo);

    let passengersInformation = [];
    const passengerInformationModel = (passengerInfo:any, travelersInput:string) => {
        let index = 1;
        for(let i = 1; i <= parseInt(travelersInput); i++) {
            let fillInfo = {
                id: `${index}`,
                dateOfBirth: passengerInfo[`DateOfBirth${index}`],
                name: {
                  firstName: (passengerInfo[`FirstName${index}`]).toUpperCase(),
                  lastName: (passengerInfo[`LastName${index}`]).toUpperCase()
                },
                gender: (passengerInfo[`Gender${index}`]).toUpperCase(),
                contact: {
                  emailAddress: passengerInfo[`Email${index}`],
                  phones: [
                    {
                      deviceType: "MOBILE",
                      countryCallingCode: "34",
                      number: passengerInfo[`MobileNumber${index}`]
                    }
                  ]
                },
                documents: [
                  {
                    documentType: "PASSPORT",
                    birthPlace: "Madrid",
                    issuanceLocation: "Madrid",
                    issuanceDate: passengerInfo[`IssuanceDate${index}`],
                    number: passengerInfo[`PassportID${index}`],
                    expiryDate: passengerInfo[`ExpireDate${index}`],
                    issuanceCountry: "ES",
                    validityCountry: "ES",
                    nationality: "ES",
                    holder: true
                  }
                ]
              }
              console.log("----------FillingInfo", fillInfo)
              passengersInformation.push(fillInfo);
              index++;
        }
        return passengersInformation;
    }

    
    const passengersInformationCompleted = passengerInformationModel(passengerInfo, travelersInput)
    console.log("----------ARRAY", passengersInformationCompleted)
    const fetchOfferConfirm = async () => {
        try {
            const response = await fetch('https://test.api.amadeus.com/v1/booking/flight-orders', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data: {
                        type: "flight-order",
                        flightOffers: [choseFlight],
                        travelers: passengersInformationCompleted
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
        queryKey: ['book-flight-data'],
        enabled: !!accessToken,
        refetchOnWindowFocus: false,
        
    });
    
    return query;
}