
import Form from "./form/Form";
import { ToastContainer } from 'react-toastify';


interface styleProp {
    className: string
}

function HeaderBigScreens({ className }:styleProp ) {

    return (
        <header className={className}>
            <ToastContainer/>
            <Form isFlightSearchPage={true}/>
        </header>
    )
}

export default HeaderBigScreens
