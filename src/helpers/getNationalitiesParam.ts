import { Nationalities } from "../types/User"

export const getNationalitiesParam = (nats: Nationalities) => {
  return Object.values(nats).filter(nat => nat.selected).map(nat => nat.code).join()
}