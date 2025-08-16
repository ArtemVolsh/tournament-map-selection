export interface Map {
  id: string;
  name: string;
  thumbnail: string;
  workshopUrl?: string;
  status: "available" | "pick" | "ban";
  pickedBy?: "team1" | "team2";
}

export interface Team {
  id: "team1" | "team2";
  name: string;
  logo?: string;
  color: string;
}

export interface PickBanPhase {
  type: "pick" | "ban";
  team: "team1" | "team2";
  completed: boolean;
}

export interface GameState {
  teams: [Team, Team];
  maps: Map[];
  currentPhase: number;
  phases: PickBanPhase[];
  isComplete: boolean;
}
