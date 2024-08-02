'use client'
import Link from "next/link";
import { MdPerson } from "react-icons/md";
import useGlobalStore from '../../../utils/stores/useGlobalStore';
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { parseISO, startOfDay } from 'date-fns';
import Autocomplete from "../../autocomplete/Autocomplete";

interface FormProps {
    isFlightSearchPage: boolean;
}

export default function Form({ isFlightSearchPage }: FormProps) {

    const { locationInputFrom, addLocationInputFrom, locationInputTo, addLocationInputTo, addDepartureDateInput, addReturnDateInput, addTravelersInput, travelersInput, departureDateInput, returnDateInput, updateIsReturnTravel, updateIsSearchBtnActive, updateIsSmallScreenInputClicked, isReturnTravel, updateIsInputDataFilled, updateIsSearchBtnClicked } = useGlobalStore((state:any) => ({
        locationInputFrom: state.locationInputFrom,
        addLocationInputFrom: state.addLocationInputFrom,
        locationInputTo: state.locationInputTo,
        addLocationInputTo: state.addLocationInputTo,
        locationResponseData: state.locationResponseData,
        addDepartureDateInput: state.addDepartureDateInput,
        addReturnDateInput: state.addReturnDateInput,
        addTravelersInput: state.addTravelersInput,
        travelersInput: state.travelersInput,
        departureDateInput: state.departureDateInput,
        returnDateInput: state.returnDateInput,
        updateIsReturnTravel: state.updateIsReturnTravel,
        updateIsSearchBtnActive: state.updateIsSearchBtnActive, 
        updateIsSmallScreenInputClicked: state.updateIsSmallScreenInputClicked, 
        isReturnTravel: state.isReturnTravel, 
        updateIsInputDataFilled: state.updateIsInputDataFilled,
        updateIsSearchBtnClicked: state.updateIsSearchBtnClicked
    }))
    const [isLocationInputFromOnFocus, setIsLocationInputFromOnFocus] = useState<boolean>(false);
    const [isLocationInputToOnFocus, setIsLocationInputToOnFocus] = useState<boolean>(false);

    const router = useRouter();

    /* check inputs */
    const [checkInputs, setCheckInputs] = useState<{ [key: string]: boolean }>({
        'one-way': isReturnTravel === false ? true : false,
        'round-trip': isReturnTravel === true ? true : false,
    });
    useEffect(() => {
        const inputsCheckbox = document.querySelectorAll("input[type='checkbox']") as NodeListOf<HTMLInputElement>;
        inputsCheckbox.forEach((input) => {
            input.checked = checkInputs[input.name];
        });
    
        const handleChange = (event: Event) => {
            const target = event.target as HTMLInputElement;
            setCheckInputs((prev) => {
                const newCheckInputs = { ...prev, [target.name]: target.checked };
                if (target.name === 'one-way' && target.checked) {
                    newCheckInputs['round-trip'] = false;
                } else if (target.name === 'round-trip' && target.checked) {
                    newCheckInputs['one-way'] = false;
                }
                return newCheckInputs;
            });
        };
        inputsCheckbox.forEach((input) => {
            input.addEventListener('change', handleChange);
        });
        
        updateIsReturnTravel(checkInputs['round-trip'])
        /* console.log("CheckInputs", checkInputs) */
        return () => {
            inputsCheckbox.forEach((input) => {
                input.removeEventListener('change', handleChange);
            });
        };
    }, [checkInputs, updateIsReturnTravel]);


    useEffect(() => {
        if(!isReturnTravel) {
            addReturnDateInput('');  
        }
    }, [addReturnDateInput, isReturnTravel]) 


    const handleSearchBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        updateIsSearchBtnClicked(true);
        if(locationInputFrom && locationInputTo && departureDateInput && travelersInput) {
            if(isReturnTravel && returnDateInput) {
                router.push('/search-flights')
                updateIsSearchBtnActive(true);
                updateIsInputDataFilled(true);
                if(window.innerWidth < 700) {
                    updateIsSmallScreenInputClicked(false);
                }
            }
            else if(isReturnTravel && !returnDateInput) {
                updateIsInputDataFilled(false);
            }
            else {
                router.push('/search-flights')
                updateIsSearchBtnActive(true);
                updateIsInputDataFilled(true);
                if(window.innerWidth < 700) {
                    updateIsSmallScreenInputClicked(false);
                }
            }
        }
        else {
            updateIsInputDataFilled(false);
            setTimeout(() => {
                updateIsSearchBtnClicked(false);
            }, 1000);
        }
    }

    const handleDateInput = function (value:string, num:number) {
        if(!value) return;
        const checkDate = function(value:string) {
            let inputDate = startOfDay(parseISO(value));
            const today = new Date();
            inputDate.setHours(today.getHours() + 1);
            const yearsDifference = inputDate.getFullYear() - today.getFullYear();
            const monthsDifference = inputDate.getMonth() - today.getMonth();
            const daysDifference = inputDate.getDate() - today.getDate();
            /* console.log("inputDate", inputDate)
            console.log("today", today)
            console.log("inputDate", inputDate.getDate())
            console.log("todayDate", today.getDate())
            console.log("DIFERENCESS", yearsDifference)
            console.log("DIFERENCESS", monthsDifference)
            console.log("DIFERENCESS", daysDifference) */
            if(yearsDifference < 0) {
                updateIsInputDataFilled(false);
                return
            }
            else if(yearsDifference > 0) {
                num === 1 ? addDepartureDateInput(value) : addReturnDateInput(value)
                return;
            }
            else {
                if(monthsDifference < 0) {
                    updateIsInputDataFilled(false);
                    return;
                }
                else if(monthsDifference > 0) {
                    num === 1 ? addDepartureDateInput(value) : addReturnDateInput(value)
                    return;
                }
                else {
                    if(daysDifference < 0) {
                        updateIsInputDataFilled(false);
                        return;
                    }
                    else if(daysDifference >= 0) {
                        num === 1 ? addDepartureDateInput(value) : addReturnDateInput(value)
                        return;
                    }
                }
            }
        }
        checkDate(value)
    }

    return (
        <form className="w-full h-full max-w-[1300px]">
                <div className="w-full flex justify-start items-start gap-5 mt-8">
                        <div className="w-20 h-5 flex justify-start items-center">
                            <input type="checkbox" name="one-way" id="one-way" className="w-4 h-4 accent-black"  />
                            <label htmlFor="one-way" className="text-xs ml-1 text-white">One-way</label>
                        </div>
                        <div className="w-40 h-5 flex justify-start items-center">
                            <input type="checkbox" name="round-trip" id="round-trip" className="w-4 h-4 accent-black" />
                            <label htmlFor="round-trip" className="text-xs ml-1 text-white">Round-trip</label>
                        </div>
                </div>
                <div className="w-full h-full flex flex-col gap-3 mt-3">
                    <div className="w-full h-[85%] sm:h-[90%] xl:h-full flex flex-col xl:flex-row items-start gap-3">
                        <div className="w-full h-full flex flex-wrap xl:flex-row justify-center xl:justify-start gap-3">
                            <div className={`relative w-full h-[3.2rem] ${isFlightSearchPage ? 'xl:w-[15.5rem]' : 'xl:w-[13rem]'} xl:h-[3.8rem] px-2 pt-1 lg:pt-2 bg-white flex flex-col  rounded-md `}>
                                <div className="w-full absolute -top-[2px] lg:top-[2px]">
                                    <label htmlFor="from" className="text-[0.65rem] lg:text-xs font-semibold text-slate-500">From</label>
                                    <input
                                    className="w-[97%] lg:w-[94%] absolute left-0 top-[1.5rem] py-1 outline-none text-sm"
                                    type="text"
                                    name="from"
                                    id="from"
                                    placeholder="London"
                                    required
                                    onChange={(e) => addLocationInputFrom(e.target.value)}
                                    onFocus={() => setIsLocationInputFromOnFocus(true)}
                                    onBlur={() => setTimeout(() => setIsLocationInputFromOnFocus(false), 100)}
                                    value={locationInputFrom}
                                    />
                                </div>  
                                <Autocomplete isLocationInputFromOnFocus={isLocationInputFromOnFocus} isLocationInputToOnFocus={isLocationInputToOnFocus}locationInputFrom={locationInputFrom}/>
                            </div>
                            <div className={`relative w-full h-[3.2rem] ${isFlightSearchPage ? 'xl:w-[15.5rem]' : 'xl:w-[13rem]'} xl:h-[3.8rem] px-2 pt-1 lg:pt-2 bg-white flex flex-col  rounded-md `}>
                                <div className="w-full absolute -top-[2px] lg:top-[2px]">
                                    <label htmlFor="to" className="text-[0.65rem] lg:text-xs font-semibold text-slate-500">To</label >
                                    <input
                                    className="w-[97%] lg:w-[94%] absolute left-0 top-[1.5rem] py-1 outline-none text-sm"
                                    type="text"
                                    name="to"
                                    id="to"
                                    placeholder="São Paulo"
                                    required
                                    onChange={(e) => addLocationInputTo(e.target.value)}
                                    onFocus={() => setIsLocationInputToOnFocus(true)}
                                    onBlur={() => setTimeout(() => setIsLocationInputToOnFocus(false), 100)}
                                    value={locationInputTo}
                                    />
                                </div>
                                <Autocomplete isLocationInputToOnFocus={isLocationInputToOnFocus} isLocationInputFromOnFocus={isLocationInputFromOnFocus} locationInputTo={locationInputTo}/>
                            </div>
                            {/* small screens */}
                            <div className="w-full h-[3.2rem] px-2 pt-1 lg:pt-2 bg-white flex justify-between items-center xl:hidden  rounded-md">
                                <div className="w-[8rem] h-full flex flex-col overflow-hidden">
                                    <label htmlFor="departure-arrive" className="text-[0.65rem] lg:text-xs font-semibold text-slate-500 bg-white">Departure</label >
                                    <input
                                    className="w-full py-1 outline-none text-sm"
                                    type="date"
                                    name="departure"
                                    id="departure"
                                    required
                                    onChange={(e) => handleDateInput(e.target.value, 1)}
                                    value={departureDateInput}
                                    />
                                </div>
                                <div className="w-[8rem] h-full flex flex-col overflow-hidden">
                                    <label htmlFor="departure-arrive" className="text-[0.65rem] lg:text-xs font-semibold text-slate-500 bg-white">Arrive</label >
                                    <input
                                    className="w-full py-1 outline-none text-sm"
                                    type="date"
                                    name="arrive"
                                    id="arrive"
                                    required={isReturnTravel}
                                    onChange={(e) => handleDateInput(e.target.value, 2)}
                                    value={returnDateInput}
                                    />
                                </div>
                        
                            </div>
                            {/* end */}
                            <div className="w-[9rem] h-[3.8rem] px-2 pt-1 lg:pt-2 bg-white hidden xl:flex flex-col  rounded-md">
                                <label htmlFor="departure" className="text-[0.65rem] lg:text-xs font-semibold text-slate-500 bg-white">Departure</label >
                                <input
                                className="w-full py-1 outline-none text-sm"
                                type="date"
                                name="departure"
                                id="departure"
                                required
                                onChange={(e) => handleDateInput(e.target.value, 1)}
                                value={departureDateInput}
                                />
                            </div>
                            <div className="w-[9rem] h-[3.8rem] px-2 pt-1 lg:pt-2 bg-white hidden xl:flex flex-col  rounded-md">
                                <label htmlFor="arrive" className="text-[0.65rem] lg:text-xs font-semibold text-slate-500 bg-white">Arrive</label >
                                <input
                                className="w-full py-1 outline-none text-sm"
                                type="date"
                                name="arrive"
                                id="arrive"
                                required={isReturnTravel}
                                onChange={(e) => handleDateInput(e.target.value, 2)}
                                value={returnDateInput}
                                />
                            </div>
                            <div className="w-full h-[3.2rem] xl:w-32 xl:h-[3.8rem] px-2 pt-1 lg:pt-2 bg-white flex flex-col  rounded-md relative">
                                <label htmlFor="travelers" className="text-[0.65rem] lg:text-xs font-semibold text-slate-500">Travelers</label >
                                <input
                                className="w-full py-1 outline-none text-sm"
                                type="number"
                                min={1}
                                max={20}
                                name="travelers"
                                id="travelers"
                                placeholder="2"
                                required
                                onChange={(e) => addTravelersInput(e.target.value)}
                                value={travelersInput}
                                />
                                <MdPerson className="text-xl text-black absolute top-[1.8rem] right-[.45rem]"/>
                            </div>
                        </div>
                        <button 
                        type="submit"
                        onClick={(e) => handleSearchBtn(e)}
                        className={`w-full xl:w-52 h-[4rem] lg:h-[3.8rem] px-2  ${isFlightSearchPage ? 'bg-transparent border-[2px] border-white' : 'bg-primary'} border-2 border-slate-300 text-white font-medium text-lg rounded-md flex flex-col justify-center items-center hover:shadow-2xl active:scale-[.98] ease-in-out`}
                        >
                            <Link 
                            href=''>
                                Search
                            </Link>
                        </button>
                    </div>
                
                </div>
        </form>
    )
}
