import axios from "axios";

export const getCountries = async () => {
  const response = await axios.get(
    "https://restcountries.com/v3.1/all?fields=name,flags,capital,population,continents,cca3",
  );

  return response.data;
};
