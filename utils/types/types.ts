import BookFlight from "../../app/[locale]/book-flight/page";

export interface accessToken {
    data: {
      accessToken: string
    };
  }

  export interface DataResponse {
    data: {
      data: DataItem[];
    }
  }

  export interface DataItem {
    data: FlightData[]
  }
  export interface FlightData {
    id: number,
    itineraries: Itinerarie[],
    price: {
      currency: string,
      total: string,
      base: string
    }
  }

  export interface Itinerarie {
    segments: Segment[];
    duration: string;
  }

  export interface Segment {
      arrival: {
        iataCode: string,
        terminal?: string,
        at: string
      },
      carrierCode: string,
      departure: {
        iataCode: string,
        terminal?: string,
        at: string
      },
      duration: string;
  }

  export interface queryReturns {
    error: string | null;
    isFetching: boolean,
    isSuccess: boolean,
    refetch: () => void
  }

  export interface PassengerInfo {
    passengers: {
        dateOfBirth: string,
        email: string,
        expireDate: string,
        firstName: string,
        lastName: string,
        gender: string,
        issuanceDate: string,
        mobileNumber: string,
        nationality: string,
        passportOrId: string
    }[];
  }

  export interface AirlineNames {
    data: AirlineNamesData[]
  }
  export interface AirlineNamesData {
    commonName: string
  }

  export interface CountryInfo {
    index: CountryInfoData[]
  }
  export interface CountryInfoData {
    nome: {
        'abreviado': string,
        'abreviado-EN': string,
        'abreviado-ES': string
    }
  }

  export interface BookFlightData {
    data: {
        associatedRecords: AssociatedRecordsData[],
        travelers: Traveler[],
        flightOffers: FlightOffers[]
    }
  }
  export interface AssociatedRecordsData {
    creationDate: string,
    reference: string
  }
  export interface Traveler {
    gender: 'MALE' | 'FEMALE';
    name: {
      firstName: string;
      lastName: string;
    };
  }
  export interface FlightOffers {
    price: {
        base: string,
        currency: string
    }
  }

  
  export interface ChoseFlight {
    /* id: string, itineraries, price */
  }