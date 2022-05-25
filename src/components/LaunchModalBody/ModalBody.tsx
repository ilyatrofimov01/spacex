import React, { useEffect, useState } from "react";
import "./ModalBody.scss";
import { getLaunchById } from "../../services/LaunchService";
import { Launch } from "../../types/launchTypes";
import { toLocalDateFormatter } from "../../utils/dateFormatter";

interface Props {
  selectedLaunchId: string,
  onCloseModal: () => void
}

export const ModalBody = ({ selectedLaunchId, onCloseModal }: Props) => {

  const [selectedLaunch, setSelectedLaunch] = useState<Launch | null>(null);
  useEffect(() => {
    getLaunchById(selectedLaunchId).then((res: Launch) => setSelectedLaunch(res));
  }, [selectedLaunchId]);

  return (
    <div className="modal-body">
      <h2>{`RocketName: ${selectedLaunch?.name}`}</h2>
      <p>{`Description: ${selectedLaunch?.details || "No description of this launch"}`}</p>
      <p>{`Launch Date :${selectedLaunch?.date_utc ? toLocalDateFormatter(selectedLaunch?.date_utc) : "No date"}`}</p>
      {(selectedLaunch?.links.youtube_id && <iframe
        src={`https://www.youtube.com/embed/${selectedLaunch?.links.youtube_id}`}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        title="video"
      />)}
      <button onClick={onCloseModal}>Close Modal</button>

    </div>
  );
};