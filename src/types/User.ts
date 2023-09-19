export type User = {
  name: {
    first: string;
    last: string;
  };
  phone: string;
  cell: string;
  location: {
    country: string;
  };
  dob: {
    age: number;
  };
  login: {
    uuid: string;
  };
  nat: string;
};

export type Users = User[];

export type Nationality = {
  code: string;
  name: string;
  selected: boolean;
};

export type Nationalities = Record<string, Nationality>;
