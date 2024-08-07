'use client';
import { ChangeEvent, useEffect, useState } from 'react';
import Image from "next/image";
import FormInput from "../formInput/formInputBanner/FormInputBanner";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useGlobalStore from '../../utils/stores/useGlobalStore';
import { usePathname, useRouter  } from '../../navigation';
import {useTranslations} from 'next-intl';


function Banner() {
    const t = useTranslations('Home');

    const { isSearchBtnClicked, isInputDataFilled } = useGlobalStore((state) => ({
        isSearchBtnClicked: state.isSearchBtnClicked,
        isInputDataFilled: state.isInputDataFilled, 
    }));
    const pathname = usePathname();
    const router = useRouter();
    const [languageOption, setLanguageOption] = useState<string>('');

    useEffect(() => {
        function getCookie(name:string) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts?.pop()?.split(';')?.shift();
        }
        setLanguageOption(getCookie('NEXT_LOCALE') || 'pt');
    }, [setLanguageOption])

    const handleLanguageChange = (e:ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;

        setLanguageOption(value);
        router.push(pathname, { locale: value });
    }
   
    useEffect(() => {
        if(isSearchBtnClicked && (isInputDataFilled === false)) {
            toast.info(t("Banner.toast"));
        }
    }, [isSearchBtnClicked, isInputDataFilled, t])

    return (
        <section className='w-full h-full min-h-screen bg-heroMobile md:bg-hero bg-cover bg-no-repeat flex flex-col justify-center items-center px-4 md:px-32 lg:px-44 xl:px-14 relative '> 
            <ToastContainer/>
            <div className="absolute top-4 right-4 sm:top-6 sm:right-12">
                <form className='text-lg font-semibold '>
                    <label htmlFor="language" className='text-base pr-2'>{t("Banner.language")}</label>
                    <select id='language' className="cursor-pointer" onChange={(e) => handleLanguageChange(e)} value={languageOption}>
                        <option value="pt">PT</option>
                        <option value="en">EN</option>
                    </select>
                </form>
            </div>
            <div className="w-full h-full flex flex-col justify-center items-center gap-4 lg:gap-7 pt-6 lg:-mt-[7.5rem]">
                <Image
                    className="w-20 md:top-20 md:w-32 xl:w-40"
                    src="/logo-best-travel.png"
                    alt="logo"
                    width={400}
                    height={400}
                />
                <div className="w-full max-w-[1150px] h-full flex flex-col justify-center items-center relative ">
                
                    <div className="w-full h-[500px] xl:h-[200px] relative z-40">
                        <div className="w-full h-[500px] xl:h-[200px] opacity-100 rounded-xl bgBlur absolute top-0 z-0"></div>
                    </div>
                    <div className="absolute top-0 w-full h-full py-7 px-6 sm:px-8 flex flex-col justify-start items-center z-50">
                        <h1 className="text-white text-[1.1rem] md:text-2xl font-medium text-center">{t("Banner.title")}</h1>
                        <FormInput/>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Banner
