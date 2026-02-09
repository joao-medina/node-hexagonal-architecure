interface IAddress {
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export class Address implements IAddress {
  constructor(
    public street: string,
    public number: string,
    public neighborhood: string,
    public city: string,
    public state: string,
    public zipCode: string,
    public country: string
  ) {}
}
