'use client'
import { ReactNode, useEffect, useState } from 'react';
import { useFlightOfferConfirm } from '../../hooks/useFlightOfferConfirm';
import { useGetAccesToken } from '../../hooks/useGetAccesToken';
import useGlobalStore from '../../utils/stores/useGlobalStore';
import Header from '../../components/header/Header';
import { useForm } from 'react-hook-form';
import Footer from '../../components/footer/Footer';

const BookFlight: React.FC = () => {

    const { data:accessTokenData } = useGetAccesToken();
    const { data:flightOfferData, error, status } = useFlightOfferConfirm();
    const [confirmedFlightOfferData, setConfirmedFlightOfferData] = useState<any>([]);
    const { updateAccessToken, travelersInput } = useGlobalStore((state) => ({
        updateAccessToken: state.updateAccessToken,
        travelersInput: state.travelersInput
    }));
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data: any) => console.log("ReactHookForm---------------------", data);
    console.log("ReactFormERRORS", errors);

    useEffect(() => {
        updateAccessToken(accessTokenData?.accessToken);
    }, [accessTokenData, updateAccessToken])

    useEffect(() => {
        setConfirmedFlightOfferData(flightOfferData?.data?.flightOffers)
    }, [accessTokenData, flightOfferData?.data])
    console.log("Status", status)
    console.log("Error", error)
    console.log("Warnings", flightOfferData?.warnings?.[0])
    console.log("TravelersNumber", travelersInput)

    const displayFormsByTravelersNumber = (travelersInput:string, register:any, errors:any):ReactNode => {
        let index = 1, forms = []; 
        for(let i = 0; i < parseInt(travelersInput); i++) {
            forms.push(<FormInputs passengerNumber={index} register={register} errors={errors}/>)
            index++;
        }
        return forms;
    }

    return (
        <main>
            <Header/>
            <div className='w-full h-full min-h-screen flex flex-col items-center pt-10 px-5 md:px-10 overflow-hidden relative'>
                <div className="w-full h-full mb-5">
                    <h1 className='text-2xl font-semibold'>Passengers</h1>
                    <p>Please enter data as they appear on passport or travel documentation</p>
                </div>
                <div className="w-full h-full flex flex-col justify-center items-center">
                    <form onSubmit={handleSubmit(onSubmit)} className='w-full h-full flex flex-col gap-5'>
                        { displayFormsByTravelersNumber(travelersInput, register, errors) }
                        <div className="flex justify-center mt-5 mb-10">
                            <input className='w-72 p-3 bg-primary text-white text-lg font-medium rounded-md cursor-pointer hover:shadow-2xl active:scale-x-[.98]' type="submit" value='Submit'/>
                        </div>
                    </form>
                </div>
            
            </div>
            <Footer/>
        </main>
    )
}

interface FormInputProps{
    passengerNumber: number,
    register: any;
    errors: any;
}
const FormInputs = ({ passengerNumber, register, errors }:FormInputProps) => {
    return (
        <section className='w-full h-full flex flex-col gap-5 p-7 rounded-sm shadow-2xl'>
            <h2 className='text-lg font-medium'>{`Passenger ${passengerNumber}`}</h2>
            <div className='flex flex-col lg:flex-row gap-7'>
                <div className='w-20 flex flex-col'>
                    <label htmlFor="Gender">Gender</label>
                    <select className='p-2 border-[1px] border-slate-500 rounded-md' {...register("Gender")}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div className='w-full flex flex-col'>
                    <label htmlFor="FirstName">First name</label>
                    <input className='p-2 border-[1px] border-slate-500 rounded-md' type="text" placeholder="John" {...register("FirstName", {required: true, maxLength: 20})} />
                </div>
                <div className='w-full flex flex-col'>
                    <label htmlFor="LastName">Last name</label>
                    <input className='p-2 border-[1px] border-slate-500 rounded-md' type="text" placeholder="Doe" {...register("LastName", {required: true, maxLength: 50})} />
                </div>
                <div className="w-full md:w-60 flex flex-col">
                    <label htmlFor="dateOfBirth">Date Of Birth</label>
                    <input className='p-2 border-[1px] border-slate-500 rounded-md' type="date" placeholder="Issuance Date" {...register("dateOfBirth", {required: true})} />
                </div>
            </div>
            <div className="w-full flex flex-col lg:flex-row gap-7">
                <div className="w-full flex flex-col">
                    <label htmlFor="PassportID">Passport or ID</label>
                    <input className='p-2 border-[1px] border-slate-500 rounded-md' type="text" placeholder="0000000" {...register("PassportID", {required: true, max: 11, maxLength: 11})} />
                </div>
                <div className="w-full md:w-60 flex flex-col">
                    <label htmlFor="IssuanceDate">Issuance Date</label>
                    <input className='p-2 border-[1px] border-slate-500 rounded-md' type="date" placeholder="Issuance Date" {...register("IssuanceDate", {required: true})} />
                </div>
                <div className="w-full md:w-60 flex flex-col">
                    <label htmlFor="ExpireDate">Expire Date</label>
                    <input className='p-2 border-[1px] border-slate-500 rounded-md' type="date" placeholder="Expire Date" {...register("ExpireDate", {required: true})} />
                </div>
                <div className="w-full flex flex-col">
                    <label htmlFor="Nationality">Nationality</label>
                    <input className='p-2 border-[1px] border-slate-500 rounded-md' type="text" placeholder="Nationality" {...register("Nationality", {})} />
                </div>
            </div>
            <div className='w-full flex flex-col lg:flex-row gap-7'>
                <div className="w-full flex flex-col">
                    <label htmlFor="Email">Email</label>
                    <input className='p-2 border-[1px] border-slate-500 rounded-md' type="email" placeholder="my@email.com" {...register("Email", {required: true})} />
                </div>
                <div className="w-full flex flex-col">
                    <label htmlFor="MobileNumber">Mobile number</label>
                    <input className='p-2 border-[1px] border-slate-500 rounded-md' type="tel" placeholder="Number" {...register("MobileNumber", {required: true})} />
                </div>
            </div>
        </section>
    )
}


export default BookFlight
