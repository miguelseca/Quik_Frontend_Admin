export default interface Trip {
    client_email: string;
    driver_nif: number;
    origin: number[];
    destination: number[];
    duration: number;
    distance: number;
    driverETA: number;
    carClass: string;
    licensePlate: string;
    cost: number;
    review: number;
    createdAt: Date;
}