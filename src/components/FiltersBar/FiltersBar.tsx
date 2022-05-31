import React from "react";
import { useForm } from "react-hook-form";
import { Filter } from "../../types/filter";
import { FormInput, Label, SearchForm, SubmitButton } from "./styled-components";

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
      <SearchForm onSubmit={handleSubmit(onFormSubmit)}>
        <Label>
          Rocket Name:
          <FormInput type="text" {...register("name")} />
        </Label>
        <Label>
          FlightNumber:
          <FormInput type="number" {...register("flightNumber")} />
        </Label>
        <Label>
          FlightNumber:
          <FormInput type="date" {...register("date")} />
        </Label>
        <SubmitButton type="submit"> Apply Filters</SubmitButton>
      </SearchForm>
    </div>
  );
};