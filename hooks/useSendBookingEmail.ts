import emailjs from 'emailjs-com';
import { useCallback } from 'react';
import useGlobalStore from '../utils/stores/useGlobalStore';

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string;


export function useSendBookingEmail(){

        const { passengerInfo } = useGlobalStore((state) => ({
            passengerInfo: state.passengerInfo,
        }));
    
        const sendBookingEmail = useCallback( 
            async (bookFlightData:any, airlineNames:any) => {
                interface Traveler {
                    gender: 'MALE' | 'FEMALE';
                    name: {
                      firstName: string;
                      lastName: string;
                    };
                }
                
                const bookingCode = bookFlightData?.data?.associatedRecords?.[0]?.reference as string;
                const createdAt = (bookFlightData?.data?.associatedRecords?.[0]?.creationDate)?.split('T')[0] as string;
                const passengers = (bookFlightData?.data?.travelers?.map((traveler:Traveler) => traveler?.name?.lastName))?.join(', ') as string;
                const totalPrice = `${bookFlightData?.data?.flightOffers?.[0]?.price.currency} ${(bookFlightData?.data?.flightOffers?.[0]?.price?.base)}` as string;
                const airlines = airlineNames?.data?.map((airline:any) => airline?.commonName) as string;
                const passengerEmail = passengerInfo?.['Email1'] as string;
                const passengerName = passengerInfo?.['LastName1'] as string;
                  
                console.log("--------At-----", createdAt);
                try {
                const response = await emailjs.send(
                    SERVICE_ID,
                    TEMPLATE_ID,
                    {
                    booking_code: bookingCode,
                    created_at: createdAt,
                    passengers: passengers,
                    total_price: totalPrice,
                    airline_name: airlines,
                    email: passengerEmail,
                    name: passengerName
                    },
                    PUBLIC_KEY
                );
    
                console.log('Email sent successfully!', response.status, response.text);
                } catch (error) {
                console.error('Failed to send email:', error);
                }
          },
          [passengerInfo]
    
        );

        return { sendBookingEmail };
    

  };