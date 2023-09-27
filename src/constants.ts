import { AgeGroup } from "./types/AgeGroup";
import { Params } from "./types/Params";
import { Nationalities } from "./types/User";
export const ageGroups: AgeGroup[] = [
  {
    id: 1,
    label: "0 - 17",
    color: "#ccc",
    start: 0,
    end: 17,
  },
  {
    id: 2,
    label: "18 - 34",
    color: "#87e3ff",
    start: 18,
    end: 34,
  },
  {
    id: 3,
    label: "35 - 54",
    color: "#0261a6",
    start: 35,
    end: 54,
  },
  {
    id: 4,
    label: "55 - 74",
    color: "#44ab33",
    start: 55,
    end: 74,
  },
  {
    id: 5,
    label: "75+",
    color: "#ffbb0f",
    start: 15,
  },
];

export const countries: { value: string; label: string }[] = [
  {
    value: "au",
    label: "Australia",
  },
  {
    value: "br",
    label: "Brazil",
  },
  {
    value: "ca",
    label: "Canada",
  },
  {
    value: "us",
    label: "United States",
  },
];

export const initParams: Params = {
  results: "10",
  inc: "name,phone,cell,location,dob,login,nat",
  nat: Object.values(countries).map((nat) => nat.value).join()
}

export const initNationalities: Nationalities = countries.reduce((countries, country) => {
  return {
    ...countries,
    [country.value]: {
      code: country.value,
      name: country.label,
      selected: true,
    },
  };
}, {})
