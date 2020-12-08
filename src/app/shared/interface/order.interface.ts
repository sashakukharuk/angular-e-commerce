export interface OrderType {
  _id: string;
  image: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
}

export interface List {
  positionId: string;
  quantity: number;
}

export interface OrderFormType {
  firstName: string;
  lastName: string;
  phone: number;
  email: string;
  city: string;
  novaPosh: string;
  list: Array<List>;
}

