import { useQuery } from "@tanstack/react-query";
import useGlobalStore from '../utils/stores/useGlobalStore';
import { PassengerInfo } from '../utils/types/types';

export function useBookFlight() {
    const { accessToken, choseFlight, passengerInfo, travelersInput, passengerBirthPlace } = useGlobalStore((state) => ({
        accessToken: state.accessToken,
        choseFlight: state.choseFlight,
        passengerInfo: state.passengerInfo,
        travelersInput: state.travelersInput, 
        passengerBirthPlace: state.passengerBirthPlace
    }));


    /* console.log("ChoseFlight", choseFlight); 
    console.log("passengerInfo-------", passengerInfo.passengers); 
    console.log("passengerBirthPlace---", passengerBirthPlace);
    */

    let passengersInformation = [];
    const passengerInformationModel = (passengerInfo:PassengerInfo, travelersInput:string) => { 
        for(let passengerNumber = 0; passengerNumber < parseInt(travelersInput); passengerNumber++) {

            let fillInfo = {
                id: `${passengerNumber + 1}`,
                dateOfBirth: passengerInfo.passengers?.[passengerNumber].dateOfBirth,
                name: {
                  firstName: (passengerInfo.passengers?.[passengerNumber].firstName)?.toUpperCase(),
                  lastName: (passengerInfo.passengers?.[passengerNumber].lastName)?.toUpperCase()
                },
                gender: (passengerInfo.passengers?.[passengerNumber].gender)?.toUpperCase(),
                contact: {
                  emailAddress: passengerInfo.passengers?.[passengerNumber].email,
                  phones: [
                    {
                      deviceType: "MOBILE",
                      countryCallingCode: "34",
                      number: passengerInfo.passengers?.[passengerNumber].mobileNumber
                    }
                  ]
                },
                documents: [
                  {
                    documentType: "PASSPORT",
                    birthPlace: passengerBirthPlace[passengerNumber],
                    issuanceLocation: passengerBirthPlace[passengerNumber],
                    issuanceDate: passengerInfo.passengers?.[passengerNumber].issuanceDate,
                    number: passengerInfo.passengers?.[passengerNumber].passportOrId,
                    expiryDate: passengerInfo.passengers?.[passengerNumber].expireDate,
                    issuanceCountry: passengerInfo.passengers?.[passengerNumber].nationality,
                    validityCountry: passengerInfo.passengers?.[passengerNumber].nationality,
                    nationality: passengerInfo.passengers?.[passengerNumber].nationality,
                    holder: true
                  }
                ]
              }
              passengersInformation.push(fillInfo);
        }
        return passengersInformation;
    }

    
    const passengersInformationCompleted = passengerInformationModel(passengerInfo, travelersInput)
  
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