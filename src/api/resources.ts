import axios from "axios";
import { Person } from "../models/person";
import { Starship } from "../models/starship";

type Response = {
  count: number;
  next: string;
  previous: string;
  results: Array<Person | Starship>;
};

const baseUrl = "https://swapi.dev/api/"

export const getResource = async (type: string): Promise<Array<Starship | Person>> => {
  const all: Array<Starship | Person> = [];
  let url: string = `${baseUrl}${type}`
  let hasMore: boolean = true;

  while (hasMore) {
    const { data } = await axios.get<Response>(url);
    all.push(...data.results);
    hasMore = Boolean(data.next);
    url = data.next;
  }
  return all;
}
