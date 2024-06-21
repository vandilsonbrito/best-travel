import { FaXTwitter, FaInstagram } from "react-icons/fa6";
import { FiYoutube } from "react-icons/fi";


function Footer() {
  return (
    <footer className="w-full h-full lg:h-[350px] bg-[#19464bf8] text-white flex flex-col justify-center py-10 px-5 md:p-20">
        <div className="w-full h-full flex flex-col md:flex-row justify-between lg:justify-evenly gap-5">
            <div className="flex flex-col gap-3 border-b-[1px] lg:border-none pb-5 lg:pb-0">
                <h3 className="text-[.8rem] lg:text-lg font-medium mb-2">Company</h3>
                <a href="#" className="underline text-[.7rem] lg:text-sm">About</a>
                <a href="#" className="underline text-[.7rem] lg:text-sm">Blog</a>
                <a href="#" className="underline text-[.7rem] lg:text-sm">Company data</a>
                <a href="#" className="underline text-[.7rem] lg:text-sm">Service terms</a>
            </div>
            <div className="flex flex-col gap-3 border-b-[1px] lg:border-none pb-5 lg:pb-0">
                <h3 className="text-[.8rem] lg:text-lg font-medium mb-2">Help/FAQ</h3>
                <a href="#" className="underline text-[.7rem] lg:text-sm">Partners</a>
                <a href="#" className="underline text-[.7rem] lg:text-sm">Advertise with us</a>
            </div>
            <div className="flex flex-col gap-3 border-b-[1px] lg:border-none pb-5 lg:pb-0">
                <h3 className="text-[.8rem] lg:text-lg font-medium mb-2">More</h3>
                <a href="#" className="underline text-[.7rem] lg:text-sm">Airline rates</a>
                <a href="#" className="underline text-[.7rem] lg:text-sm">Tips for better price</a>
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
