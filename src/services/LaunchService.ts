import axios from "axios";
import { Launch, LaunchesRequestData } from "../types/launchTypes";
import { Filter } from "../types/filter";
import { convertDateFormat } from "../utils/dateFormatter";


const baseURL = "https://api.spacexdata.com/v4";

interface GetLaunchesProps {
  page: number,
  filters: Filter
}

interface QueryParams {
  name: {
    $regex: string
  },
  date_utc: {
    $regex: string
  },
  flight_number?: number,
}

const getLaunches = ({ page, filters }: GetLaunchesProps) => {

  const getQueryParams = (filters: Filter) => {
    const querySettings: QueryParams = {
      name: {
        $regex: filters?.name
      },
      date_utc: {
        $regex: filters?.date && convertDateFormat(filters?.date)
      }
    };
    if (filters?.flightNumber) {
      querySettings["flight_number"] = filters.flightNumber;
    }
    return querySettings;
  };


  return axios.post<LaunchesRequestData>(`${baseURL}/launches/query`, {
    query: getQueryParams(filters),
    options: {
      limit: 9,
      page,
      sort: { date_utc: "desc" },
      select: {
        id: 1,
        date_utc: 1,
        name: 1,
        details: 1,
        flight_number: 1,
        links: {
          webcast: 1,
          youtube_id: 1
        }
      }
    }
  }).then((res) => {
    return { launchesList: res.data.docs, totalDocs: res.data.totalDocs };
  });
};

const getLaunchById = (id: string) => {
  return axios.get<Launch>(`${baseURL}/launches/${id}`).then(res => {
    const { id, date_utc, name, details, flight_number, links } = res.data;
    return { id, date_utc, name, details, flight_number, links };

  });
};

export { getLaunches, getLaunchById };
