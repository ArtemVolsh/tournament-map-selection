import { useState } from "react";
import type { Map, Team, GameState, PickBanPhase } from "../../types";
import MapCard from "../MapCard/MapCard";
import TeamCard from "../TeamCard/TeamCard";
import "./PickBanInterface.css";

// Default CS2 map pool
const defaultMaps: Map[] = [
  {
    id: "mirage",
    name: "Mirage",
    thumbnail: "https://i.imgur.com/YvJCXzq.jpg",
    status: "available",
  },
  {
    id: "dust2",
    name: "Dust II",
    thumbnail: "https://i.imgur.com/mTzPEDd.jpg",
    status: "available",
  },
  {
    id: "inferno",
    name: "Inferno",
    thumbnail: "https://i.imgur.com/QHKCpAZ.jpg",
    status: "available",
  },
  {
    id: "cache",
    name: "Cache",
    thumbnail: "https://i.imgur.com/wBjkMQy.jpg",
    status: "available",
  },
  {
    id: "overpass",
    name: "Overpass",
    thumbnail: "https://i.imgur.com/EZGcF8G.jpg",
    status: "available",
  },
  {
    id: "vertigo",
    name: "Vertigo",
    thumbnail: "https://i.imgur.com/V7XwjB8.jpg",
    status: "available",
  },
  {
    id: "ancient",
    name: "Ancient",
    thumbnail: "https://i.imgur.com/tpMyKyh.jpg",
    status: "available",
  },
];

// Standard BO3 pick/ban format
const defaultPhases: PickBanPhase[] = [
  { type: "ban", team: "team1", completed: false },
  { type: "ban", team: "team2", completed: false },
  { type: "pick", team: "team1", completed: false },
  { type: "pick", team: "team2", completed: false },
  { type: "ban", team: "team1", completed: false },
  { type: "ban", team: "team2", completed: false },
  { type: "pick", team: "team1", completed: false },
];

const defaultTeams: [Team, Team] = [
  { id: "team1", name: "Team Alpha", color: "#3498db" },
  { id: "team2", name: "Team Beta", color: "#e74c3c" },
];

export default function PickBanInterface() {
  const [gameState, setGameState] = useState<GameState>({
    teams: defaultTeams,
    maps: defaultMaps,
    currentPhase: 0,
    phases: defaultPhases,
    isComplete: false,
  });

  const [teamNames, setTeamNames] = useState({
    team1: defaultTeams[0].name,
    team2: defaultTeams[1].name,
  });

  const [isConfiguring, setIsConfiguring] = useState(true);

  const currentPhase = gameState.phases[gameState.currentPhase];
  const currentTeam = gameState.teams.find(
    (team) => team.id === currentPhase?.team
  );

  const handleMapClick = (mapId: string) => {
    if (gameState.isComplete || !currentPhase) return;

    const newMaps = gameState.maps.map((map) => {
      if (map.id === mapId && map.status === "available") {
        return {
          ...map,
          status: currentPhase.type as "picked" | "banned",
          pickedBy:
            currentPhase.type === "pick" ? currentPhase.team : undefined,
        };
      }
      return map;
    });

    const newPhases = [...gameState.phases];
    newPhases[gameState.currentPhase] = { ...currentPhase, completed: true };

    const nextPhase = gameState.currentPhase + 1;
    const isComplete = nextPhase >= gameState.phases.length;

    setGameState({
      ...gameState,
      maps: newMaps,
      phases: newPhases,
      currentPhase: nextPhase,
      isComplete,
    });
  };

  const startPickBan = () => {
    const updatedTeams: [Team, Team] = [
      { ...gameState.teams[0], name: teamNames.team1 },
      { ...gameState.teams[1], name: teamNames.team2 },
    ];

    setGameState({
      ...gameState,
      teams: updatedTeams,
    });
    setIsConfiguring(false);
  };

  const resetGame = () => {
    setGameState({
      teams: defaultTeams,
      maps: defaultMaps.map((map) => ({
        ...map,
        status: "available",
        pickedBy: undefined,
      })),
      currentPhase: 0,
      phases: defaultPhases.map((phase) => ({ ...phase, completed: false })),
      isComplete: false,
    });
    setIsConfiguring(true);
  };

  if (isConfiguring) {
    return (
      <div className="configuration-screen">
        <div className="config-container">
          <h1>CS2 Pick/Ban Configuration</h1>

          <div className="team-config">
            <div className="team-input">
              <label htmlFor="team1">Team 1 Name:</label>
              <input
                id="team1"
                type="text"
                value={teamNames.team1}
                onChange={(e) =>
                  setTeamNames({ ...teamNames, team1: e.target.value })
                }
                placeholder="Enter team 1 name"
              />
            </div>

            <div className="team-input">
              <label htmlFor="team2">Team 2 Name:</label>
              <input
                id="team2"
                type="text"
                value={teamNames.team2}
                onChange={(e) =>
                  setTeamNames({ ...teamNames, team2: e.target.value })
                }
                placeholder="Enter team 2 name"
              />
            </div>
          </div>

          <button className="btn btn-primary btn-lg" onClick={startPickBan}>
            Start Pick/Ban
          </button>
        </div>
      </div>
    );
  }

  const pickedMaps = gameState.maps.filter((map) => map.status === "picked");

  return (
    <div className="pickban-interface">
      <div className="game-header">
        <h1>CS2 Map Pick/Ban</h1>
        <button className="btn btn-secondary" onClick={resetGame}>
          Reset Game
        </button>
      </div>

      <div className="teams-section">
        <TeamCard
          team={gameState.teams[0]}
          isActive={currentPhase?.team === "team1"}
          currentAction={currentPhase?.type}
        />

        <div className="vs-indicator">
          <span>VS</span>
        </div>

        <TeamCard
          team={gameState.teams[1]}
          isActive={currentPhase?.team === "team2"}
          currentAction={currentPhase?.type}
        />
      </div>

      {!gameState.isComplete && currentPhase && (
        <div className="phase-indicator">
          <h3>
            {currentTeam?.name}{" "}
            {currentPhase.type === "pick" ? "picks" : "bans"} a map
          </h3>
          <div className="phase-progress">
            Phase {gameState.currentPhase + 1} of {gameState.phases.length}
          </div>
        </div>
      )}

      {gameState.isComplete && (
        <div className="game-complete">
          <h2>🎉 Pick/Ban Complete!</h2>
          <h3>Selected Maps:</h3>
          <div className="selected-maps">
            {pickedMaps.map((map, index) => (
              <div key={map.id} className="selected-map">
                <span className="map-order">Map {index + 1}:</span>
                <span className="map-name">{map.name}</span>
                <span
                  className="picked-by"
                  style={{
                    color: gameState.teams.find((t) => t.id === map.pickedBy)
                      ?.color,
                  }}
                >
                  (Picked by{" "}
                  {gameState.teams.find((t) => t.id === map.pickedBy)?.name})
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="maps-grid">
        {gameState.maps.map((map) => (
          <MapCard
            key={map.id}
            map={map}
            teams={gameState.teams}
            onMapClick={handleMapClick}
            isClickable={
              !gameState.isComplete &&
              map.status === "available" &&
              !!currentPhase
            }
          />
        ))}
      </div>
    </div>
  );
}
