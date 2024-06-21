import useGlobalStore from '../../../utils/stores/useGlobalStore';
import { EventHandler } from 'react';
import { ToastContainer } from 'react-toastify';


type styleProp = {
    className: string
}

function HeaderSmallDevices({ className }: styleProp) {

    const { locationInputFrom, updateIsSmallScreenInputClicked, locationInputTo } = useGlobalStore((state:any) => ({
        locationInputFrom: state.locationInputFrom,
        locationInputTo: state.locationInputTo,
        updateIsSmallScreenInputClicked: state.updateIsSmallScreenInputClicked
    }))

    const handleInputClick = () => {
        updateIsSmallScreenInputClicked(true);
    }

    return (
        <header className={className}>
            
            <div className={`w-full h-[3.2rem] px-2 pt-1 lg:pt-2 bg-white flex flex-col  rounded-md`}>
                <label htmlFor="from" className="text-[0.65rem] lg:text-xs font-semibold text-slate-500">From</label >
                <input
                className="w-full py-1 outline-none text-sm"
                type="text"
                name="from"
                id="from"
                placeholder="London"
                /* onChange={(e) => addLocationInputFrom(e.target.value)} */
                value={locationInputFrom}
                onClick={() => handleInputClick()}
                />
            </div>
            <div className={`w-full h-[3.2rem] px-2 pt-1 lg:pt-2 bg-white flex flex-col  rounded-md`}>
                <label htmlFor="to" className="text-[0.65rem] lg:text-xs font-semibold text-slate-500">To</label >
                <input
                className="w-full py-1 outline-none text-sm"
                type="text"
                name="to"
                id="to"
                placeholder="São Paulo"
                /* onChange={(e) => addLocationInputTo(e.target.value)} */
                value={locationInputTo}
                onClick={() => handleInputClick()}
                />
            </div>
        </header>
    )
}

export default HeaderSmallDevices
