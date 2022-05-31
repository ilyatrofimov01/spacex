import React from "react";
import { Launch } from "../../types/launchTypes";
import { toLocalDateFormatter } from "../../utils/dateFormatter";
import { noImage } from "../../assets/img";
import { CardContainer } from "./styled-components";

interface LaunchCardProps {
  launchData: Launch,
  onCardClick: (id: string) => void
}

export const LaunchCard = ({ launchData, onCardClick }: LaunchCardProps) => {
  const { name, id, flight_number: flightNumber, date_utc, links } = launchData;
  const imgPath = links.youtube_id ? `https://img.youtube.com/vi/${links.youtube_id}/0.jpg` : noImage;

  return (
    <CardContainer onClick={() => onCardClick(id)}>
      <div>
        <img src={imgPath} alt="launch preview" />
      </div>
      <div>
        <p>{`Rocket Name: ${name}`}</p>
        <p>{`Launch Date: ${toLocalDateFormatter(date_utc)}`}</p>
        <p>{`Flight Number: ${flightNumber}`}</p>
      </div>
    </CardContainer>
  );
};
