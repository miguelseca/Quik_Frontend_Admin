export default interface Client {
    email: string;
    phone: number;
    firstName: string;
    lastName: string;
    password: string;
    paymentMethod: string;
    addresses: [{ name: string; location: number[] }];
    status: { isBanned: boolean; emailVerified: boolean };
  }