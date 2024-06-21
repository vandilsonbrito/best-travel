'use client'
import Image from "next/image";
import FormInput from "../formInput/formInputBanner/FormInputBanner";

function Banner() {

    /* const [tripMode, setTripMode] = useState<boolean>(false); */

    return (
        <section className='w-full h-full min-h-screen bg-hero bg-cover bg-no-repeat flex flex-col justify-center items-center px-4 md:px-32 lg:px-44 xl:px-14 relative'> 

            <Image
                className="absolute top-5 w-20 md:w-32 xl:w-44"
                src="/logo-best-travel.png"
                alt="logo"
                width={400}
                height={400}
            />
            <div className="w-full max-w-[1150px] h-full flex flex-col justify-center items-center relative mt-20">
                
                <div className="w-full h-[500px] xl:h-[200px] relative z-40">
                    <div className="w-full h-[500px] xl:h-[200px] opacity-100 rounded-xl bgBlur absolute top-0 z-0"></div>
                </div>

                <div className="absolute top-0 w-full h-full py-7 px-6 sm:px-8 flex flex-col justify-start items-center z-50">
                    <h1 className="text-white text-[1.1rem] md:text-2xl font-medium text-center">The best travel for the best price.</h1>

                    <FormInput/>
                </div>
            </div>
        </section>
    )
}

export default Banner
