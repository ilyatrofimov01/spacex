export interface Launch {
  date_utc: string,
  details: string,
  flight_number: number,
  id: string,
  name: string,
  links: {
    webcast: string,
    youtube_id: string
  }
}

export interface LaunchesRequestData {
  docs: Launch[],
  hasNextPage: boolean,
  hasPrevPage: boolean,
  limit: number,
  nextPage: number,
  offset: number,
  page: number,
  pagingCounter: number,
  prevPage: null
  totalDocs: number
  totalPages: number
}

