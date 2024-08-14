'use client'
import { ReactNode, useEffect, useState } from 'react';
import { useGetAccesToken } from '../../../hooks/useGetAccesToken';
import { useFlightOfferConfirm } from '../../../hooks/useFlightOfferConfirm';
import useGlobalStore from '../../../utils/stores/useGlobalStore';
import Header from '../../../components/header/Header';
import { SubmitHandler, useForm, FieldErrors, UseFormRegister, ValidateResult } from 'react-hook-form';
import Footer from '../../../components/footer/Footer';
import { useCountryInfo } from '../../../hooks/useCountryInfo';
import { useTranslations } from 'next-intl';
import { useRouter } from '../../../navigation';
import { Itinerarie, Segment, PassengerInfo, CountryInfoData } from '../../../utils/types/types';
import { PassThrough } from 'stream';



const PassengersInfo: React.FC = () => {
    const t = useTranslations('Passengers-info');
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
        updatePassengerBirthPlace: state.updatePassengerBirthPlace,
    }));
    
    interface PassengerInfo {
        passengers: {
            dateOfBirth: string,
            email: string,
            expireDate: string,
            firstName: string,
            lastName: string,
            gender: string,
            issuanceDate: string,
            mobileNumber: string,
            nationality: string,
            passportOrId: string
        }[];
    }
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<PassengerInfo>();


    const onSubmit: SubmitHandler<PassengerInfo> = (data: PassengerInfo) => {
        updatePassengerInfo(data);
        router.push('/book-flight');
        /* console.log("ReactHookForm---------------------", data); */
    };

    useEffect(() => {
        /* console.log("-------countryInfo--------", countryInfo); */

        updatePassengerBirthPlace(countryInfo?.map((country: CountryInfoData) => country.nome?.['abreviado-EN']))
    }, [countryInfo, updatePassengerBirthPlace])

    useEffect(() => {
        updateAccessToken(accessTokenData?.accessToken);
    }, [accessTokenData, updateAccessToken]);

    useEffect(() => {
        setConfirmedFlightOfferData(flightOfferData?.data);
    }, [flightOfferData?.data]);

    //show data on input
    useEffect(() => {
        if (passengerInfo) {
            Object.keys(passengerInfo).forEach(key => {
                setValue(key as keyof PassengerInfo, passengerInfo[key as keyof PassengerInfo]);
            });
        }
    }, [passengerInfo, setValue]);


    const displayFormsByTravelersNumber = (travelersInput: string, register: UseFormRegister<PassengerInfo>, errors: FieldErrors<PassengerInfo>): ReactNode => {
        let forms = [];
        for (let i = 0; i < parseInt(travelersInput); i++) {
            forms.push(<FormInputs key={i} passengerNumber={i} register={register} errors={errors} />);
        }
        return forms;
    };

    useEffect(() => {
        if (choseFlight) { 
            const allCarrierCodes = choseFlight?.itineraries?.flatMap((itinerary: Itinerarie) => 
                    itinerary.segments.map((segment: Segment) => segment.carrierCode)
            )
           
            updateCarrierCode(Array.from(new Set(allCarrierCodes)));
        }
    }, [accessTokenData, choseFlight, updateCarrierCode]);

    /* console.log("Status", status);
    console.log("errorBookingFlight", error);
    console.log("Warnings", flightOfferData?.warnings?.[0]);
    console.log("TravelersNumber", travelersInput); 
    console.log("Renderizou...")
    */

    return (
        <main>
            <Header />
            <div className='w-full h-full min-h-screen flex flex-col items-center pt-10 px-5 md:px-10 overflow-hidden relative'>
                <div className="w-full h-full mb-5">
                    <h1 className='text-2xl font-semibold'>{t("title")}</h1>
                    <p>{t("subtitle")}</p>
                </div>
                <div className="w-full h-full flex flex-col justify-center items-center">
                    <form onSubmit={handleSubmit(onSubmit)} className='w-full h-full flex flex-col gap-5'>
                        { displayFormsByTravelersNumber(travelersInput, register, errors) }
                        <div className="flex justify-center mt-5 mb-10">
                            <input className='w-72 p-3 bg-primary text-white text-lg font-medium rounded-md cursor-pointer hover:shadow-2xl active:scale-x-[.98]' type="submit" value={t("form.button")} />
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </main>
    );
};

const isOver18 = (birthdate:string): ValidateResult | Promise<ValidateResult> => {
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
    register: UseFormRegister<PassengerInfo>;
    errors: FieldErrors<PassengerInfo>; 
}
const FormInputs = ({ passengerNumber, register, errors }: FormInputProps) => {
    const t = useTranslations('Passengers-info');
    return (
        <section className='w-full h-full flex flex-col gap-5 p-7 rounded-sm shadow-2xl'>
            <h2 className='text-lg font-medium'>{`Passenger ${passengerNumber}`}</h2>
            <div className='flex flex-col lg:flex-row gap-7'>
                <div className='w-32 flex flex-col'>
                    <label htmlFor={`passengers.${passengerNumber}.gender`}>{t("form.label-gender")}</label>
                    <select className='p-2 border-[1px] border-slate-500 rounded-md' {...register(`passengers.${passengerNumber}.gender`)}>
                        <option value="Male">{t("form.input-gender.gender1")}</option>
                        <option value="Female">{t("form.input-gender.gender2")}</option>
                    </select>
                    {errors.passengers?.[passengerNumber]?.gender && <span className='text-red-500 font-medium'>{t("form.error-is-required")}</span>}
                </div>
                <div className='w-full flex flex-col'>
                    <label htmlFor={`passengers.${passengerNumber}.firstName`}>{t("form.label-first-name")}</label>
                    <input className='p-2 border-[1px] border-slate-500 rounded-md' type="text" placeholder="John" 
                    {...register(`passengers.${passengerNumber}.firstName`, { required: true, pattern: {
                        value: /^[A-Za-zÀ-ÿ\s]{1,20}$/,
                        message: t("form.error-invalid-format")
                    } })} />
                    {errors.passengers?.[passengerNumber]?.firstName && <span className='text-red-500 font-medium'>{
                        errors.passengers?.[passengerNumber]?.firstName?.message || t("form.error-is-required")
                    }</span>}
                </div>
                <div className='w-full flex flex-col'>
                    <label htmlFor={`passengers.${passengerNumber}.lastName`}>{t("form.label-last-name")}</label>
                    <input className='p-2 border-[1px] border-slate-500 rounded-md' type="text" placeholder="Doe" 
                    {...register(`passengers.${passengerNumber}.lastName`, { required: true, pattern: {
                        value: /^[A-Za-zÀ-ÿ\s]{1,30}$/,
                        message: t("form.error-invalid-format")
                    } })} />
                    {errors.passengers?.[passengerNumber]?.lastName && <span className='text-red-500 font-medium'>{
                        errors.passengers?.[passengerNumber]?.lastName?.message || t("form.error-is-required")    
                    }</span>}
                </div>
                <div className="w-full md:w-[20rem] flex flex-col">
                    <label className='whitespace-nowrap' htmlFor={`DateOfBirth${passengerNumber}`}>{t("form.label-birth")}</label>
                    <input className='p-2 border-[1px] border-slate-500 rounded-md' type="date" placeholder="Issuance Date" 
                    {...register(`passengers.${passengerNumber}.dateOfBirth`, { required: true, 
                        validate: {
                        isOver18: (value:string) => isOver18(value) || t("form.error-age"),
                      },})} />
                    {errors.passengers?.[passengerNumber]?.dateOfBirth && <span className='text-red-500 font-medium'>{errors.passengers?.[passengerNumber]?.dateOfBirth?.message || t("form.error-is-required")}</span>}
                </div>
            </div>
            <div className="w-full flex flex-col lg:flex-row gap-7">
                <div className="w-full flex flex-col">
                    <label htmlFor={`passengers.${passengerNumber}.passportOrId`}>{t("form.label-document")}</label>
                    <input className='p-2 border-[1px] border-slate-500 rounded-md' type="text" placeholder="XYZ000 | 0000000" {...register(`passengers.${passengerNumber}.passportOrId`, { required: true, pattern: {
                        value: /^[A-Z0-9]{5,11}$/,
                        message: t("form.error-document")
                    } })} />
                    {errors.passengers?.[passengerNumber]?.passportOrId && <span className='text-red-500 font-medium'>{
                        errors.passengers?.[passengerNumber]?.passportOrId?.message || t("form.error-is-required")
                    }</span>}
                </div>
                <div className="w-full md:w-[17rem] flex flex-col">
                    <label className='whitespace-nowrap' htmlFor={`passengers.${passengerNumber}.issuanceDate`}>{t("form.label-issuance")}</label>
                    <input className='p-2 border-[1px] border-slate-500 rounded-md' type="date" placeholder="Issuance Date" {...register(`passengers.${passengerNumber}.issuanceDate`, { required: true })} />
                    {errors.passengers?.[passengerNumber]?.issuanceDate && <span className='text-red-500 font-medium'>{t("form.error-is-required")}</span>}
                </div>
                <div className="w-full md:w-[17rem] flex flex-col">
                    <label className='whitespace-nowrap' htmlFor={`passengers.${passengerNumber}.expireDate`}>{t("form.label-expire")}</label>
                    <input className='p-2 border-[1px] border-slate-500 rounded-md' type="date" placeholder="Expire Date" {...register(`passengers.${passengerNumber}.expireDate`, { required: true })} />
                    {errors.passengers?.[passengerNumber]?.expireDate && <span className='text-red-500 font-medium'>{t("form.error-is-required")}</span>}
                </div>
                <div className="w-full flex flex-col">
                    <label htmlFor={`passengers.${passengerNumber}.nationality`}>{t("form.label-nationality")}</label>
                    <input className='p-2 border-[1px] border-slate-500 rounded-md' type="text" placeholder="BR" {...register(`passengers.${passengerNumber}.nationality`, { required: true, pattern: {
                        value: /^[A-Z]{2}$/,
                        message: t("form.error-invalid-format")
                    } })} />
                    {errors.passengers?.[passengerNumber]?.nationality && <span className='text-red-500 font-medium'>{
                        errors.passengers?.[passengerNumber]?.nationality?.message || t("form.error-is-required")
                    }</span>}
                </div>
            </div>
            <div className='w-full flex flex-col lg:flex-row gap-7'>
                <div className="w-full flex flex-col">
                    <label htmlFor={`passengers.${passengerNumber}.email`}>{t("form.label-email")}</label>
                    <input className='p-2 border-[1px] border-slate-500 rounded-md' type="email" placeholder="my@email.com" {...register(`passengers.${passengerNumber}.email`, { required: true, pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: t("form.error-email")
                    } })} />
                    {errors.passengers?.[passengerNumber]?.email && <span className='text-red-500 font-medium'>{
                        errors.passengers?.[passengerNumber]?.dateOfBirth?.message || t("form.error-is-required")
                    }</span>}
                </div>
                <div className="w-full flex flex-col">
                    <label htmlFor={`passengers.${passengerNumber}.mobileNumber`}>{t("form.label-cellphone")}</label>
                    <input className='p-2 border-[1px] border-slate-500 rounded-md' type="tel" placeholder="Number" {...register(`passengers.${passengerNumber}.mobileNumber`, { required: true, pattern: {
                        value: /^\d{10,15}$/,
                        message: t("form.error-invalid-format")
                    } })} />
                    {errors.passengers?.[passengerNumber]?.mobileNumber && <span className='text-red-500 font-medium'>{
                        errors.passengers?.[passengerNumber]?.mobileNumber?.message || t("form.error-is-required")    
                    }</span>}
                </div>
            </div>
        </section>
    );
};

export default PassengersInfo;
