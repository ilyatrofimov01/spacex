import React from "react";
import { Launch } from "../../types/launchTypes";
import { toLocalDateFormatter } from "../../utils/dateFormatter";
import "./LaunchCard.scss";
import { noImage } from "../../assets/img";

interface Props {
  launchData: Launch,
  onCardClick: (id: string) => void
}

export const LaunchCard = ({ launchData, onCardClick }: Props) => {
  const { name, id, flight_number: flightNumber, date_utc, links } = launchData;
  const imgPath = links.youtube_id ? `https://img.youtube.com/vi/${links.youtube_id}/0.jpg` : noImage;

  return (
    <div className="launch-card" onClick={() => onCardClick(id)}>
      <div className="launch-card__preview">
        <img src={imgPath} alt="launch preview" />
      </div>
      <div className="launch-card__short-description">
        <p>{`Rocket Name: ${name}`}</p>
        <p>{`Launch Date: ${toLocalDateFormatter(date_utc)}`}</p>
        <p>{`Flight Number: ${flightNumber}`}</p>
      </div>
    </div>
  );
};
