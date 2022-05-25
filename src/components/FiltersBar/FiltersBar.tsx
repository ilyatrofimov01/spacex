import React from "react";
import { useForm } from "react-hook-form";
import { Filter } from "../../types/filter";
import "./FiltersBar.scss";

interface FiltersBarProps {
  setFilters: (filters: Filter) => void;
}

export const FiltersBar = ({ setFilters }: FiltersBarProps) => {
  const { register, handleSubmit } = useForm<Filter>({ mode: "onSubmit" });

  const onFormSubmit = (filters: Filter) => {
    setFilters(filters);
  };

  return (
    <div>
      <form className="filters-form" onSubmit={handleSubmit(onFormSubmit)}>
        <label>
          Rocket Name:
          <input className="form-control" type="text" {...register("name")} />
        </label>
        <label>
          FlightNumber:
          <input className="form-control" type="number" {...register("flightNumber")} />
        </label>
        <label>
          FlightNumber:
          <input className="form-control" type="date" {...register("date")} />
        </label>
        <button type="submit"> Apply Filters</button>
      </form>
    </div>
  );
};