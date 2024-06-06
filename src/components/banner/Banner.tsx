'use client'
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

function Banner() {

    const [tripMode, setTripMode] = useState<boolean>(false);

    const [checkInputs, setCheckInputs] = useState<{ [key: string]: boolean }>({
        'one-way': false,
        'round-trip': true,
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

        console.log(checkInputs)
        return () => {
            inputsCheckbox.forEach((input) => {
                input.removeEventListener('change', handleChange);
            });
        };
    }, [checkInputs]);
    


    return (
        <section className='w-full h-full min-h-screen bg-hero bg-cover bg-no-repeat flex flex-col justify-center items-center px-4 md:px-32 lg:px-44 xl:px-20 relative'> 

            <Image
                className="absolute top-5 w-20 md:w-32 xl:w-44"
                src="/logo-best-travel.png"
                alt="logo"
                width={400}
                height={400}
            />
            <div className="w-full max-w-[1150px] h-full flex flex-col justify-center items-center relative mt-20">
                <div className="w-full h-[500px] xl:h-[200px] opacity-80 rounded-xl bgBlur "></div>

                <div className="absolute top-0 w-full h-full py-7 px-8 flex flex-col justify-start items-center ">
                    <h1 className="text-white text-[1.1rem] md:text-2xl font-medium text-center">The best travel for the best price.</h1>

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
                    <form action="" className="w-full h-full flex flex-col gap-3 mt-3">
                        <div className="w-full h-full flex flex-col xl:flex-row items-start gap-3">

                            <div className="w-full h-full flex flex-wrap xl:flex-row justify-center xl:justify-start gap-3">
                                <div className="w-full h-[3.2rem] xl:w-[13rem] xl:h-[3.8rem] px-2 pt-1 lg:pt-2 bg-white flex flex-col  rounded-md">
                                    <span className="text-[0.65rem] lg:text-xs font-semibold text-slate-500">From</span>
                                    <input
                                    className="w-full py-1 outline-none text-sm"
                                    type="text"
                                    name="from"
                                    id="from"
                                    placeholder="London"
                                    />
                                </div>
                                <div className="w-full h-[3.2rem] xl:w-[13rem] xl:h-[3.8rem] px-2 pt-1 lg:pt-2 bg-white flex flex-col  rounded-md">
                                    <span className="text-[0.65rem] lg:text-xs font-semibold text-slate-500">To</span>
                                    <input
                                    className="w-full py-1 outline-none text-sm"
                                    type="text"
                                    name="to"
                                    id="to"
                                    placeholder="São Paulo"
                                    />
                                </div>
                                {/* small screens */}
                                <div className="w-full h-[3.2rem] px-2 pt-1 lg:pt-2 bg-white flex flex-col xl:hidden  rounded-md">
                                    <span className="text-[0.65rem] lg:text-xs font-semibold text-slate-500">Departure - Arrive</span>
                                    <input
                                    className="w-full py-1 outline-none text-sm"
                                    type="date"
                                    name="Departure-Arrive"
                                    id="Departure-Arrive"
                                    />
                                </div>
                                {/* end */}
                                <div className="w-[9rem] h-[3.8rem] px-2 pt-1 lg:pt-2 bg-white hidden xl:flex flex-col  rounded-md">
                                    <span className="text-[0.65rem] lg:text-xs font-semibold text-slate-500">Departure</span>
                                    <input
                                    className="w-full py-1 outline-none text-sm"
                                    type="date"
                                    name=""
                                    id=""
                                    />
                                </div>
                                <div className="w-[9rem] h-[3.8rem] px-2 pt-1 lg:pt-2 bg-white hidden xl:flex flex-col  rounded-md">
                                    <span className="text-[0.65rem] lg:text-xs font-semibold text-slate-500">Arrive</span>
                                    <input
                                    className="w-full py-1 outline-none text-sm"
                                    type="date"
                                    name=""
                                    id=""
                                    />
                                </div>
                                <div className="w-full h-[3.2rem] xl:w-36 xl:h-[3.8rem] px-2 pt-1 lg:pt-2 bg-white flex flex-col  rounded-md">
                                    <span className="text-[0.65rem] lg:text-xs font-semibold text-slate-500">Travelers</span>
                                    <input
                                    className="w-full py-1 outline-none text-sm"
                                    type="number"
                                    min={1}
                                    max={20}
                                    name="travelers"
                                    id="travelers"
                                    placeholder="2"
                                    />
                                </div>
                            </div>
                            <Link href='#' className="w-full xl:w-52 h-[4rem] lg:h-[3.8rem] px-2 bg-primary text-white font-medium text-lg rounded-md flex flex-col justify-center items-center hover:shadow-2xl active:scale-[.98] ease-in-out">
                                Search
                            </Link>
                        </div>
                    
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Banner
