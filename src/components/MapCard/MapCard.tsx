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
      case "pick":
        const pickingTeam = teams.find((team) => team.id === map.pickedBy);
        return {
          overlay: "pick",
          label: `PICKED BY ${pickingTeam?.name.toUpperCase() || "UNKNOWN"}`,
          color: pickingTeam?.color || "#28a745",
        };
      case "ban":
        return {
          overlay: "ban",
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

        {/* Map name overlay - always visible */}
        <div className="map-name-overlay">
          <h5 className="map-name-center">{map.name.toUpperCase()}</h5>
        </div>

        {/* Status overlay - only visible when picked/banned */}
        {status && (
          <div
            className="map-status-overlay"
            style={{ backgroundColor: status.color + "CC" }}
          >
            <div className="overlay-content">
              <span className="status-label">{status.label}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
