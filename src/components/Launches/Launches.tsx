import React, { useEffect, useState } from "react";
import { getLaunches } from "../../services/LaunchService";
import { LaunchCard } from "../LaunchCard";
import { Launch } from "../../types/launchTypes";
import InfiniteScroll from "react-infinite-scroll-component";
import { ModalBody } from "../LaunchModalBody/ModalBody";
import Modal from "react-modal";
import { Filter } from "../../types/filter";
import { FiltersBar } from "../FiltersBar";
import { LaunchesNotFound } from "./LaunchesNotFound";
import "./Launches.scss";

export const Launches = () => {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [totalLaunches, setTotalLaunches] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedLaunchId, setSelectedLaunchId] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [filters, setFilters] = useState<Filter>({ name: "", flightNumber: null, date: "" });

  const setFiltersHandler = (filters: Filter) => {
    setFilters(filters);
    setLaunches([]);
    setPage(1);
  };

  useEffect(() => {
    getLaunches({ page, filters })
      .then(({ launchesList, totalDocs }: { launchesList: Launch[], totalDocs: number }) => {
        setLaunches([...launches, ...launchesList]);
        setTotalLaunches(totalDocs);
      });
  }, [page, filters]);

  const onCardClick = (id: string) => {
    setSelectedLaunchId(id);
    setShowModal(true);
  };

  return (
    <div className="launches">
      <FiltersBar setFilters={setFiltersHandler} />

      {launches.length ? <InfiniteScroll
        dataLength={page * 9}
        next={() => {
          setPage(page + 1);
        }}
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
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <ModalBody
          selectedLaunchId={selectedLaunchId}
          onCloseModal={() => {
            setShowModal(false);
          }}
        />
      </Modal>
    </div>
  );
};
