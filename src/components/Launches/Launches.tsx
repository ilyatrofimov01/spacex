import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Modal from "react-modal";
import { Filter } from "../../types/filter";
import { Launch } from "../../types/launchTypes";
import { FiltersBar } from "../FiltersBar";
import { LaunchCard } from "../LaunchCard";
import { ModalBody } from "../LaunchModalBody/ModalBody";
import { LaunchesNotFound } from "./LaunchesNotFound";
import launchesStore from "../../store/launches";
import { observer } from "mobx-react-lite";
import "./Launches.scss";

export const Launches = observer(() => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedLaunchId, setSelectedLaunchId] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [filters, setFilters] = useState<Filter>({ name: "", flightNumber: null, date: "" });


  useEffect(() => {
    launchesStore.fetchLaunches({ page, filters });
  }, [page, filters]);

  const setFiltersHandler = (filters: Filter) => {
    setFilters(filters);
    launchesStore.clearLaunches()
    setPage(1);
  };

  const onCardClick = (id: string) => {
    setSelectedLaunchId(id);
    setIsModalOpen(true);
  };

  const onScrollMore = () => {
    setPage(page + 1);
  };

  const showCards = launchesStore.launches.length ? <InfiniteScroll
    dataLength={page * 9}
    next={onScrollMore}
    hasMore={page * 9 < launchesStore.totalDocs}
    loader={<h2>Loading...</h2>}
  >
    {launchesStore.launches.map((launch: Launch) => {
      return (
        <LaunchCard
          key={launch.id}
          launchData={launch}
          onCardClick={onCardClick}
        />
      );
    })}
  </InfiniteScroll> : <LaunchesNotFound />;

  return (
    <div className="launches">
      <FiltersBar setFilters={setFiltersHandler} />
      {showCards}
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
});
