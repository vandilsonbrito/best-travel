'use client'
import { ReactNode, useEffect, useState } from 'react';
import { useGetAccesToken } from '../../hooks/useGetAccesToken';
import { useFlightOfferConfirm } from '../../hooks/useFlightOfferConfirm';
import useGlobalStore from '../../utils/stores/useGlobalStore';
import Header from '../../components/header/Header';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Footer from '../../components/footer/Footer';
import { useCountryInfo } from '../../hooks/useCountryInfo';

const PassengersInfo: React.FC = () => {
    const router = useRouter();
    const { data:accessTokenData } = useGetAccesToken();
    const { data:flightOfferData, error, status } = useFlightOfferConfirm();
    const { data:countryInfo } = useCountryInfo()

    const [confirmedFlightOfferData, setConfirmedFlightOfferData] = useState<any>([]);
    const { updateAccessToken, travelersInput, updatePassengerInfo, passengerInfo, choseFlight, updateCarrierCode, updatePassengerBirthPlace } = useGlobalStore((state) => ({
        updateAccessToken: state.updateAccessToken,
        travelersInput: state.travelersInput,
        updatePassengerInfo: state.updatePassengerInfo,
        passengerInfo: state.passengerInfo,
        choseFlight: state.choseFlight, 
        updateCarrierCode: state.updateCarrierCode,
        updatePassengerBirthPlace: state.updatePassengerBirthPlace
    }));
    
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    const onSubmit = (data: any) => {
        updatePassengerInfo(data);
        router.push('/book-flight');
        /* console.log("ReactHookForm---------------------", data); */
    };

    useEffect(() => {
        updatePassengerBirthPlace(countryInfo?.map((country:any) => country.nome?.['abreviado-EN']))
    }, [countryInfo, updatePassengerBirthPlace])

    useEffect(() => {
        updateAccessToken(accessTokenData?.accessToken);
    }, [accessTokenData, updateAccessToken]);

    useEffect(() => {
        setConfirmedFlightOfferData(flightOfferData?.data);
    }, [flightOfferData?.data]);

    useEffect(() => {
        if (passengerInfo) {
            Object.keys(passengerInfo).forEach(key => {
                setValue(key, passengerInfo[key]);
            });
        }
    }, [passengerInfo, setValue]);

    const displayFormsByTravelersNumber = (travelersInput: string, register: any, errors: any): ReactNode => {
        let index = 1, forms = [];
        for (let i = 0; i < parseInt(travelersInput); i++) {
            forms.push(<FormInputs key={index} passengerNumber={index} register={register} errors={errors} />);
            index++;
        }
        return forms;
    };

    useEffect(() => {
        if (choseFlight) { 
            const allCarrierCodes = choseFlight?.itineraries?.flatMap((itinerary: any) => 
                    itinerary.segments.map((segment: any) => segment.carrierCode)
            )
           
            updateCarrierCode(Array.from(new Set(allCarrierCodes)));
        }
    }, [accessTokenData, choseFlight, updateCarrierCode]);

    /* console.log("Status", status);
    console.log("errorBookingFlight", error);
    console.log("Warnings", flightOfferData?.warnings?.[0]);
    console.log("TravelersNumber", travelersInput); */

    return (
        <main>
            <Header />
            <div className='w-full h-full min-h-screen flex flex-col items-center pt-10 px-5 md:px-10 overflow-hidden relative'>
                <div className="w-full h-full mb-5">
                    <h1 className='text-2xl font-semibold'>Passengers</h1>
                    <p>Please enter data as they appear on passport or travel documentation</p>
                </div>
                <div className="w-full h-full flex flex-col justify-center items-center">
                    <form onSubmit={handleSubmit(onSubmit)} className='w-full h-full flex flex-col gap-5'>
                        { displayFormsByTravelersNumber(travelersInput, register, errors) }
                        <div className="flex justify-center mt-5 mb-10">
                            <input className='w-72 p-3 bg-primary text-white text-lg font-medium rounded-md cursor-pointer hover:shadow-2xl active:scale-x-[.98]' type="submit" value='Submit' />
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </main>
    );
};

const isOver18 = (birthdate:Date) => {
    const birthDate = new Date(birthdate);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
  
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1 >= 18;
    }
  
    return age >= 18;
  };

interface FormInputProps {
    passengerNumber: number;
    register: any;
    errors: any;
}
const FormInputs = ({ passengerNumber, register, errors }: FormInputProps) => {
    return (
        <section className='w-full h-full flex flex-col gap-5 p-7 rounded-sm shadow-2xl'>
            <h2 className='text-lg font-medium'>{`Passenger ${passengerNumber}`}</h2>
            <div className='flex flex-col lg:flex-row gap-7'>
                <div className='w-28 flex flex-col'>
                    <label htmlFor={`Gender${passengerNumber}`}>Gender</label>
                    <select className='p-2 border-[1px] border-slate-500 rounded-md' {...register(`Gender${passengerNumber}`)}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    {errors[`Gender${passengerNumber}`] && <span className='text-red-500 font-medium'>This field is required</span>}
                </div>
                <div className='w-full flex flex-col'>
                    <label htmlFor={`FirstName${passengerNumber}`}>First name</label>
                    <input className='p-2 border-[1px] border-slate-500 rounded-md' type="text" placeholder="John" 
                    {...register(`FirstName${passengerNumber}`, { required: true, pattern: {
                        value: /^[A-Za-zÀ-ÿ\s]{1,20}$/,
                        message: "Invalid Format"
                    } })} />
                    {errors[`FirstName${passengerNumber}`] && <span className='text-red-500 font-medium'>{
                        errors[`FirstName${passengerNumber}`].message || 'This field is required'
                    }</span>}
                </div>
                <div className='w-full flex flex-col'>
                    <label htmlFor={`LastName${passengerNumber}`}>Last name</label>
                    <input className='p-2 border-[1px] border-slate-500 rounded-md' type="text" placeholder="Doe" 
                    {...register(`LastName${passengerNumber}`, { required: true, pattern: {
                        value: /^[A-Za-zÀ-ÿ\s]{1,30}$/,
                        message: "Invalid Format"
                    } })} />
                    {errors[`LastName${passengerNumber}`] && <span className='text-red-500 font-medium'>{
                        errors[`LastName${passengerNumber}`].message || 'This field is required'    
                    }</span>}
                </div>
                <div className="w-full md:w-60 flex flex-col">
                    <label htmlFor={`DateOfBirth${passengerNumber}`}>Date Of Birth</label>
                    <input className='p-2 border-[1px] border-slate-500 rounded-md' type="date" placeholder="Issuance Date" 
                    {...register(`DateOfBirth${passengerNumber}`, { required: true, 
                        validate: {
                        isOver18: (value:Date) => isOver18(value) || 'You must be at least 18 years old',
                      },})} />
                    {errors[`DateOfBirth${passengerNumber}`] && <span className='text-red-500 font-medium'>{errors[`DateOfBirth${passengerNumber}`].message || 'This field is required'}</span>}
                </div>
            </div>
            <div className="w-full flex flex-col lg:flex-row gap-7">
                <div className="w-full flex flex-col">
                    <label htmlFor={`PassportID${passengerNumber}`}>Passport or ID</label>
                    <input className='p-2 border-[1px] border-slate-500 rounded-md' type="text" placeholder="XYZ000 | 0000000" {...register(`PassportID${passengerNumber}`, { required: true, pattern: {
                        value: /^[A-Z0-9]{5,11}$/,
                        message: "Invalid Document Number"
                    } })} />
                    {errors[`PassportID${passengerNumber}`] && <span className='text-red-500 font-medium'>{
                        errors[`PassportID${passengerNumber}`].message || 'This field is required'
                    }</span>}
                </div>
                <div className="w-full md:w-60 flex flex-col">
                    <label htmlFor={`IssuanceDate${passengerNumber}`}>Issuance Date</label>
                    <input className='p-2 border-[1px] border-slate-500 rounded-md' type="date" placeholder="Issuance Date" {...register(`IssuanceDate${passengerNumber}`, { required: true })} />
                    {errors[`IssuanceDate${passengerNumber}`] && <span className='text-red-500 font-medium'>This field is required</span>}
                </div>
                <div className="w-full md:w-60 flex flex-col">
                    <label htmlFor={`ExpireDate${passengerNumber}`}>Expire Date</label>
                    <input className='p-2 border-[1px] border-slate-500 rounded-md' type="date" placeholder="Expire Date" {...register(`ExpireDate${passengerNumber}`, { required: true })} />
                    {errors[`ExpireDate${passengerNumber}`] && <span className='text-red-500 font-medium'>This field is required</span>}
                </div>
                <div className="w-full flex flex-col">
                    <label htmlFor={`Nationality${passengerNumber}`}>Nationality</label>
                    <input className='p-2 border-[1px] border-slate-500 rounded-md' type="text" placeholder="BR" {...register(`Nationality${passengerNumber}`, { required: true, pattern: {
                        value: /^[A-Z]{2}$/,
                        message: 'Invalid Format'
                    } })} />
                    {errors[`Nationality${passengerNumber}`] && <span className='text-red-500 font-medium'>{
                        errors[`Nationality${passengerNumber}`].message || 'This field is required'
                    }</span>}
                </div>
            </div>
            <div className='w-full flex flex-col lg:flex-row gap-7'>
                <div className="w-full flex flex-col">
                    <label htmlFor={`Email${passengerNumber}`}>Email</label>
                    <input className='p-2 border-[1px] border-slate-500 rounded-md' type="email" placeholder="my@email.com" {...register(`Email${passengerNumber}`, { required: true, pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "Invalid Email Address"
                    } })} />
                    {errors[`Email${passengerNumber}`] && <span className='text-red-500 font-medium'>{
                        errors[`Email${passengerNumber}`].message || 'This field is required'
                    }</span>}
                </div>
                <div className="w-full flex flex-col">
                    <label htmlFor={`MobileNumber${passengerNumber}`}>Mobile number</label>
                    <input className='p-2 border-[1px] border-slate-500 rounded-md' type="tel" placeholder="Number" {...register(`MobileNumber${passengerNumber}`, { required: true, pattern: {
                        value: /^\d{10,15}$/,
                        message: "Invalid Format"
                    } })} />
                    {errors[`MobileNumber${passengerNumber}`] && <span className='text-red-500 font-medium'>{
                        errors[`MobileNumber${passengerNumber}`].message || 'This field is required'    
                    }</span>}
                </div>
            </div>
        </section>
    );
};

export default PassengersInfo;
