export default interface Driver {
    nif: number;
    firstName: string;
    lastName: string;
    phone: number;
    email: string;
    service: {
      code: number;
      carBrand: string;
      carModel: string;
      licensePlate: string;
    };
    shift: number;
    lastTrip?: Date;
    lastTripTime?: number;
    lastTripLocation?: number[];
    currentLocation?: number[];
    startLocation?: number[];
    isBooked?: boolean;
  }
