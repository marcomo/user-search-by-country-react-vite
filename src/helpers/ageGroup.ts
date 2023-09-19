import { ageGroups } from "../constants";

const getAgeGroup = (age: number) => {
  return ageGroups.find((bracket) => {
    if (!bracket.end) {
      return age >= bracket.start;
    }
    return age >= bracket.start && age <= bracket.end;
  });
};

export default getAgeGroup;
