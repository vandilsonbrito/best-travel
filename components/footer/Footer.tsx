import { useTranslations } from "next-intl";
import { FaXTwitter, FaInstagram } from "react-icons/fa6";
import { FiYoutube } from "react-icons/fi";


function Footer() {

    const t = useTranslations('Home');

    return (
        <footer className="w-full h-full lg:h-[350px] bg-secundary text-white flex flex-col justify-center py-10 px-5 md:p-20">
            <div className="w-full h-full flex flex-col md:flex-row justify-between lg:justify-evenly gap-5">
                <div className="flex flex-col gap-3 border-b-[1px] lg:border-none pb-5 lg:pb-0">
                    <h3 className="text-[.8rem] lg:text-lg font-medium mb-2">{t("Footer.title1")}</h3>
                    <a href="#" className="underline text-[.7rem] lg:text-sm">{t("Footer.links1.link1")}</a>
                    <a href="#" className="underline text-[.7rem] lg:text-sm">{t("Footer.links1.link2")}</a>
                    <a href="#" className="underline text-[.7rem] lg:text-sm">{t("Footer.links1.link3")}</a>
                    <a href="#" className="underline text-[.7rem] lg:text-sm">{t("Footer.links1.link4")}</a>
                </div>
                <div className="flex flex-col gap-3 border-b-[1px] lg:border-none pb-5 lg:pb-0">
                    <h3 className="text-[.8rem] lg:text-lg font-medium mb-2">{t("Footer.title2")}</h3>
                    <a href="#" className="underline text-[.7rem] lg:text-sm">{t("Footer.links2.link1")}</a>
                    <a href="#" className="underline text-[.7rem] lg:text-sm">{t("Footer.links2.link2")}</a>
                </div>
                <div className="flex flex-col gap-3 border-b-[1px] lg:border-none pb-5 lg:pb-0">
                    <h3 className="text-[.8rem] lg:text-lg font-medium mb-2">{t("Footer.title3")}</h3>
                    <a href="#" className="underline text-[.7rem] lg:text-sm">{t("Footer.links3.link1")}</a>
                    <a href="#" className="underline text-[.7rem] lg:text-sm">{t("Footer.links3.link2")}</a>
                </div>
            </div> 
            <div className="text-white flex justify-center items-center mt-16 gap-5">
                <a href="#" className="text-lg">
                    <FaXTwitter />
                </a>
                <a href="#" className="text-xl">
                    <FaInstagram />
                </a>
                <a href="#" className="text-xl">
                    <FiYoutube />
                </a>
            </div> 
        </footer>
    )
}

export default Footer
