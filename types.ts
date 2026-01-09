
export type CharacterId = 'wataru' | 'gou' | 'misaki' | 'shadow' | 'none';

export interface Choice {
  text: string;
  nextScene: string;
}

export interface Scene {
  id: string;
  text: string;
  name?: string;
  background: string;
  character: CharacterId;
  choices?: Choice[];
  isEnding?: boolean;
}

export interface GameState {
  currentSceneId: string;
  history: { name?: string; text: string }[];
  visitedScenes: string[]; // 全プレイを通じた既読フラグ
}
