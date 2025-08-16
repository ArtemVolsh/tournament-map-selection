import type { Map, Team } from "../../types";
import "./MapCard.css";

interface MapCardProps {
  map: Map;
  teams: [Team, Team];
  onMapClick: (mapId: string) => void;
  isClickable: boolean;
}

export default function MapCard({
  map,
  teams,
  onMapClick,
  isClickable,
}: MapCardProps) {
  const getStatusDisplay = () => {
    switch (map.status) {
      case "picked":
        const pickingTeam = teams.find((team) => team.id === map.pickedBy);
        return {
          overlay: "picked",
          label: `PICKED BY ${pickingTeam?.name.toUpperCase() || "UNKNOWN"}`,
          color: pickingTeam?.color || "#28a745",
        };
      case "banned":
        return {
          overlay: "banned",
          label: "BANNED",
          color: "#dc3545",
        };
      default:
        return null;
    }
  };

  const status = getStatusDisplay();

  return (
    <div
      className={`map-card ${map.status} ${isClickable ? "clickable" : ""}`}
      onClick={() => isClickable && onMapClick(map.id)}
    >
      <div className="map-image">
        <img
          src={map.thumbnail}
          alt={map.name}
          onError={(e) => {
            // Fallback to a placeholder if image fails to load
            (e.target as HTMLImageElement).src = "/missing-image.png";
          }}
        />

        {status && (
          <div
            className="map-overlay"
            style={{ backgroundColor: status.color + "90" }}
          >
            <div className="overlay-content">
              <span className="status-label">{status.label}</span>
            </div>
          </div>
        )}
      </div>

      <div className="map-info">
        <h5 className="map-name">{map.name}</h5>
      </div>
    </div>
  );
}
