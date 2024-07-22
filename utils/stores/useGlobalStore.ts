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
    flightBooked: any
}
type Action = {
    updateAccessToken: (accessToken: State['accessToken']) => void,
    addFlightData: (flightData: any) => void,
    addDepartureTime: (departureTime: string) => void,
    addArrivalTime: (arrivalTime: string) => void,
    addDepartureiataCode: (departureiataCode: string) => void,
    addArrivalIataCode: (addArrivalIataCode: string) => void,
    addFlightItineraries: (flightItineraries: string) => void,
    addFlightDuration: (flightItineraries: string) => void,
    addFlightPrice: (flightPrice:string) => void,
    addFlightPriceCurrency: (flightPriceCurrency:string) => void,
    addAirlinesLogo: (AddAirlinesLogo:string) => void,
    addCarriersCode: (AddCarriersCode:string) => void,
    addLocationInputFrom: (AddLocationInputFrom:string) => void,
    addLocationInputTo: (AddLocationInputTo:string) => void,
    addLocationResponseData: (addLocationResponseData:string) => void,
    addDepartureDateInput: (addDepartureDateInput:string) => void,
    addReturnDateInput: (addReturnDateInput:string) => void,
    addTravelersInput: (addTravelersInput:string) => void,
    updateIsReturnTravel: (updateIsReturnTravel:boolean) => void,
    updateIsSearchBtnActive: (updateIsSearchBtnActive:boolean) => void,
    updateIsSearchBtnClicked: (updateIsSearchBtnClicked:boolean) => void,
    updateIsSmallScreenInputClicked: (updateIsSmallScreenInputClicked:boolean) => void,
    updateIsDataResponseSuccess:  (updateIsDataResponseSuccess:boolean) => void,
    updateIsInputDataFilled: (updateIsInputDataFilled:boolean) => void,
    updateChoseFlight: (updateChoseFlight: any) => void,
    updatePassengerInfo: (updatePassengerInfo: any) => void,
    updateFlightBooked: (updateFlightBooked: any) => void
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
    updateFlightBooked: (flightBooked) => set(() => ({ flightBooked: flightBooked }))
}))
export default useGlobalStore;

