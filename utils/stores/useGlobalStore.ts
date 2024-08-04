import { create } from "zustand";

type State = {
    accessToken: string,
    flightData: any[],
    departureTime: string[],
    arrivalTime: string[],
    departureiataCode: string[],
    arrivalIataCode: string[],
    flightItineraries: string[],
    flightDuration: string[],
    flightPrice: string[],
    flightPriceCurrency: string[],
    airlinesLogo: string[],
    carriersCode: string[],
    locationInputFrom: string,
    locationInputTo: string,
    locationResponseData: string[],
    departureDateInput: string,
    returnDateInput: string,
    travelersInput: string,
    isReturnTravel: boolean,
    isSearchBtnActive: boolean,
    isSearchBtnClicked: boolean,
    isSmallScreenInputClicked: boolean, 
    isDataResponseSuccess: boolean,
    isInputDataFilled: boolean,
    choseFlight: any,
    passengerInfo: any,
    flightBooked: any,
    carrierCode: string[],
    passengerBirthPlace: string[], 
    shouldLocationInputBlur: boolean
}
type Action = {
    updateAccessToken: (accessToken: State['accessToken']) => void;
    addFlightData: (flightData: State['flightData']) => void;
    addDepartureTime: (departureTime: State['departureTime'][number]) => void;
    addArrivalTime: (arrivalTime: State['arrivalTime'][number]) => void;
    addDepartureiataCode: (departureiataCode: State['departureiataCode'][number]) => void;
    addArrivalIataCode: (arrivalIataCode: State['arrivalIataCode'][number]) => void;
    addFlightItineraries: (flightItineraries: State['flightItineraries'][number]) => void;
    addFlightDuration: (flightDuration: State['flightDuration'][number]) => void;
    addFlightPrice: (flightPrice: State['flightPrice'][number]) => void;
    addFlightPriceCurrency: (flightPriceCurrency: State['flightPriceCurrency'][number]) => void;
    addAirlinesLogo: (airlinesLogo: State['airlinesLogo'][number]) => void;
    addCarriersCode: (carriersCode: State['carriersCode'][number]) => void;
    addLocationInputFrom: (locationInputFrom: State['locationInputFrom']) => void;
    addLocationInputTo: (locationInputTo: State['locationInputTo']) => void;
    addLocationResponseData: (locationResponseData: State['locationResponseData'][number]) => void;
    addDepartureDateInput: (departureDateInput: State['departureDateInput']) => void;
    addReturnDateInput: (returnDateInput: State['returnDateInput']) => void;
    addTravelersInput: (travelersInput: State['travelersInput']) => void;
    updateIsReturnTravel: (isReturnTravel: State['isReturnTravel']) => void;
    updateIsSearchBtnActive: (isSearchBtnActive: State['isSearchBtnActive']) => void;
    updateIsSearchBtnClicked: (isSearchBtnClicked: State['isSearchBtnClicked']) => void;
    updateIsSmallScreenInputClicked: (isSmallScreenInputClicked: State['isSmallScreenInputClicked']) => void;
    updateIsDataResponseSuccess: (isDataResponseSuccess: State['isDataResponseSuccess']) => void;
    updateIsInputDataFilled: (isInputDataFilled: State['isInputDataFilled']) => void;
    updateChoseFlight: (choseFlight: State['choseFlight']) => void;
    updatePassengerInfo: (passengerInfo: State['passengerInfo']) => void;
    updateFlightBooked: (flightBooked: State['flightBooked']) => void;
    updateCarrierCode: (carrierCode: State['carrierCode']) => void;
    updatePassengerBirthPlace: (passengerBirthPlace: State['passengerBirthPlace']) => void;
    updateShouldLocationInputBlur: (shouldLocationInputBlur: State['shouldLocationInputBlur']) => void;
}
const useGlobalStore = create<State & Action>((set) => ({
    accessToken: '',
    updateAccessToken: (accessToken) => set(() => ({ accessToken: accessToken })),
    flightData: [],
    addFlightData: (flightData) => set(() => ({ flightData: flightData })),
    departureTime: [],
    addDepartureTime: (departureTime) => set((state) => ({ ...state, departureTime: [...state.departureTime, departureTime] })),
    arrivalTime: [],
    addArrivalTime: (arrivalTime) => set((state) => ({ ...state, arrivalTime: [...state.arrivalTime, arrivalTime] })),
    departureiataCode: [],
    addDepartureiataCode: (departureiataCode) => set((state) => ({ ...state, departureiataCode: [...state.departureiataCode, departureiataCode] })),
    arrivalIataCode: [],
    addArrivalIataCode: (arrivalIataCode) => set((state) => ({ ...state, arrivalIataCode: [...state.arrivalIataCode, arrivalIataCode] })),
    flightItineraries: [],
    addFlightItineraries: (flightItineraries) => set((state) => ({ ...state, flightItineraries: [...state.flightItineraries, flightItineraries] })),
    flightDuration: [],
    addFlightDuration: (flightDuration) => set((state) => ({ ...state, flightDuration: [...state.flightDuration, flightDuration] })),
    flightPrice: [],
    addFlightPrice: (flightPrice) => set((state) => ({ ...state, flightPrice: [...state.flightPrice, flightPrice] })),
    flightPriceCurrency: [],
    addFlightPriceCurrency: (flightPriceCurrency) => set((state) => ({ ...state, flightPriceCurrency: [...state.flightPriceCurrency, flightPriceCurrency] })),
    airlinesLogo: [],
    addAirlinesLogo: (airlinesLogo) => set((state) => ({ ...state, airlinesLogo: [...state.airlinesLogo, airlinesLogo] })),
    carriersCode: [],
    addCarriersCode: (carriersCode) => set((state) => ({ ...state, carriersCode: [...state.carriersCode, carriersCode] })),
    locationInputFrom: '',
    addLocationInputFrom: (locationInputFrom) => set(() => ({ locationInputFrom: locationInputFrom })),
    locationInputTo: '',
    addLocationInputTo: (locationInputTo) => set(() => ({ locationInputTo: locationInputTo })),
    locationResponseData: [],
    addLocationResponseData: (locationResponseData) => set((state) => ({ ...state, locationResponseData: [...state.locationResponseData, locationResponseData] })),
    departureDateInput: '',
    addDepartureDateInput: (departureDateInput) => set(() => ({ departureDateInput: departureDateInput })),
    returnDateInput: '',
    addReturnDateInput: (returnDateInput) => set(() => ({ returnDateInput: returnDateInput })),
    travelersInput: '',
    addTravelersInput: (travelersInput) => set(() => ({ travelersInput: travelersInput })),
    isReturnTravel: true,
    updateIsReturnTravel: (isReturnTravel) => set(() => ({ isReturnTravel: isReturnTravel })),
    isSearchBtnActive: false,
    updateIsSearchBtnActive: (isSearchBtnActive) => set(() => ({ isSearchBtnActive: isSearchBtnActive })),
    isSearchBtnClicked: false,
    updateIsSearchBtnClicked: (isSearchBtnClicked) => set(() => ({ isSearchBtnClicked: isSearchBtnClicked })),
    isSmallScreenInputClicked: false,
    updateIsSmallScreenInputClicked: (isSmallScreenInputClicked) => set(() => ({ isSmallScreenInputClicked: isSmallScreenInputClicked })),
    isDataResponseSuccess: false,
    updateIsDataResponseSuccess: (isDataResponseSuccess) => set(() => ({ isDataResponseSuccess: isDataResponseSuccess })),
    isInputDataFilled: false,
    updateIsInputDataFilled: (isInputDataFilled) => set(() => ({ isInputDataFilled: isInputDataFilled })),
    choseFlight: {},
    updateChoseFlight: (choseFlight) => set(() => ({ choseFlight: choseFlight })),
    passengerInfo: {},
    updatePassengerInfo: (passengerInfo) => set(() => ({ passengerInfo: passengerInfo })),
    flightBooked: {},
    updateFlightBooked: (flightBooked) => set(() => ({ flightBooked: flightBooked })),
    carrierCode: [],
    updateCarrierCode: (carrierCode) => set(() => ({ carrierCode: carrierCode })),
    passengerBirthPlace: [],
    updatePassengerBirthPlace: (passengerBirthPlace: string[]) => set((state) => ({ ...state, passengerBirthPlace })),
    shouldLocationInputBlur: false,
    updateShouldLocationInputBlur: (shouldLocationInputBlur) => set(() => ({ shouldLocationInputBlur: shouldLocationInputBlur }))
}))
export default useGlobalStore;

