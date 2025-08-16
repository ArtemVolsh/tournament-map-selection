import type { Team } from "../../types";
import "./TeamCard.css";

interface TeamCardProps {
  team: Team;
  isActive: boolean;
  currentAction?: "pick" | "ban";
}

export default function TeamCard({
  team,
  isActive,
  currentAction,
}: TeamCardProps) {
  return (
    <div className={`team-card ${isActive ? "active" : ""}`}>
      <div className="team-header" style={{ backgroundColor: team.color }}>
        {team.logo && (
          <img
            src={team.logo}
            alt={`${team.name} logo`}
            className="team-logo"
          />
        )}
        <h3 className="team-name">{team.name}</h3>
      </div>

      {isActive && currentAction && (
        <div className="current-action">
          <span className={`action-indicator ${currentAction}`}>
            {currentAction === "pick" ? "🎯 PICKING" : "🚫 BANNING"}
          </span>
        </div>
      )}
    </div>
  );
}
