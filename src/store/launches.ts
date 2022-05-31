import { makeAutoObservable, runInAction } from "mobx";
import { FetchLaunchesProps } from "./launches.types";
import { getLaunches } from "../services/LaunchService";
import { Launch } from "../types/launchTypes";


class Launches {
  launches: Launch[] = [];
  totalDocs: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  clearLaunches() {
    this.launches = [];
  }

  fetchLaunches(fetchParams: FetchLaunchesProps) {
    (async () => {
      const res = await getLaunches(fetchParams);
      runInAction(() => {
        this.launches = [...this.launches, ...res.launchesList];
        this.totalDocs = res.totalDocs;
      });
    })();
  }


}

export default new Launches();