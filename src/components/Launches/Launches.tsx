import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Modal from "react-modal";
import { getLaunches } from "../../services/LaunchService";
import { Filter } from "../../types/filter";
import { Launch } from "../../types/launchTypes";
import { FiltersBar } from "../FiltersBar";
import { LaunchCard } from "../LaunchCard";
import { ModalBody } from "../LaunchModalBody/ModalBody";
import { LaunchesNotFound } from "./LaunchesNotFound";
import "./Launches.scss";

export const Launches = () => {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [totalLaunches, setTotalLaunches] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedLaunchId, setSelectedLaunchId] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [filters, setFilters] = useState<Filter>({ name: "", flightNumber: null, date: "" });

  useEffect(() => {
    getLaunches({ page, filters })
      .then(({ launchesList, totalDocs }: { launchesList: Launch[], totalDocs: number }) => {
        setLaunches([...launches, ...launchesList]);
        setTotalLaunches(totalDocs);
      });
  }, [page, filters]);

  const setFiltersHandler = (filters: Filter) => {
    setFilters(filters);
    setLaunches([]);
    setPage(1);
  };

  const onCardClick = (id: string) => {
    setSelectedLaunchId(id);
    setIsModalOpen(true);
  };

  const onScrollMore = () => {
    setPage(page + 1);
  };

  return (
    <div className="launches">
      <FiltersBar setFilters={setFiltersHandler} />

      {launches.length ? <InfiniteScroll
        dataLength={page * 9}
        next={onScrollMore}
        hasMore={page * 9 < totalLaunches}
        loader={<h2>Loading...</h2>}
      >
        {launches.map((launch: Launch) => {
          return (
            <LaunchCard
              key={launch.id}
              launchData={launch}
              onCardClick={onCardClick}
            />
          );
        })}
      </InfiniteScroll> : <LaunchesNotFound />}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      >
        <ModalBody
          selectedLaunchId={selectedLaunchId}
          onCloseModal={() => {
            setIsModalOpen(false);
          }}
        />
      </Modal>
    </div>
  );
};
