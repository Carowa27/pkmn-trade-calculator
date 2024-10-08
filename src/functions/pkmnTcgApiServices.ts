import axios from "axios";
import {
  ICardResponse,
  IPkmnCard,
  IPkmnResponse,
  IPkmnSet,
  ISetResponse,
  ISetsResponse,
} from "@/interfaces/dataFromApi";

export const get = async <T>(url: string) => {
  return await axios.get<T>(url);
};

export const getPkmnFromApi = async (
  searchString: string,
  page: number,
  orderBy: string
) => {
  try {
    const result = await get<IPkmnResponse>(
      `https://api.pokemontcg.io/v2/cards/${searchString}&orderBy=${orderBy}&pageSize=100&page=${page}`
    )
      .then((res) => {
        return res.data as IPkmnResponse;
      })
      .catch((error) => {
        console.error(error);
      });
    return result;
  } catch (error) {
    console.error("An error has occurred: ", error);
  }
};
export const getSetFromApi = async (searchString: string) => {
  try {
    const result = await get<ISetResponse>(
      `https://api.pokemontcg.io/v2/sets/${searchString}`
    )
      .then((res) => {
        return res.data.data as IPkmnSet;
      })
      .catch((error) => {
        console.error(error);
      });
    return result;
  } catch (error) {
    console.error("An error has occurred: ", error);
  }
};
export const getSetsFromApi = async (page: number) => {
  try {
    const result = await get<ISetsResponse>(
      `https://api.pokemontcg.io/v2/sets/?orderBy=releaseDate&pageSize=100&page=${page}`
    )
      .then((res) => {
        return res.data as ISetsResponse;
      })
      .catch((error) => {
        console.error(error);
      });
    return result;
  } catch (error) {
    console.error("An error has occurred: ", error);
  }
};
export const getCardFromApi = async (searchString: string) => {
  try {
    const result = await get<ICardResponse>(
      `https://api.pokemontcg.io/v2/cards/${searchString}`
    )
      .then((res) => {
        return res.data.data as IPkmnCard;
      })
      .catch((error) => {
        console.error(error);
      });
    return result;
  } catch (error) {
    console.error("An error has occurred: ", error);
  }
};

export const getMostValuableCardFromApi = async (type: string) => {
  try {
    const result = await get<IPkmnResponse>(
      `https://api.pokemontcg.io/v2/cards/?orderBy=-tcgplayer.prices.${type}.market`
    )
      .then((res) => {
        return res.data.data[0] as IPkmnCard;
      })
      .catch((error) => {
        console.error(error);
      });
    return result;
  } catch (error) {
    console.error("An error has occurred: ", error);
  }
};
