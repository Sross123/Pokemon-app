interface Ability {
  name: string;
  url: string;
}

interface AbilitySlot {
  ability: Ability;
  is_hidden: boolean;
  slot: number;
}

interface Cries {
  latest: string;
  legacy: string;
}

interface Form {
  name: string;
  url: string;
}

interface GameIndex {
  game_index: number;
  version: {
    name: string;
    url: string;
  };
}

interface HeldItemVersionDetail {
  rarity: number;
  version: {
    name: string;
    url: string;
  };
}

interface HeldItem {
  item: {
    name: string;
    url: string;
  };
  version_details: HeldItemVersionDetail[];
}

interface MoveLearnMethod {
  name: string;
  url: string;
}

interface VersionGroup {
  name: string;
  url: string;
}

interface MoveVersionGroupDetail {
  level_learned_at: number;
  move_learn_method: MoveLearnMethod;
  version_group: VersionGroup;
}

interface Move {
  move: {
    name: string;
    url: string;
  };
  version_group_details: MoveVersionGroupDetail[];
}

interface Species {
  name: string;
  url: string;
}

interface Sprites {
  back_default: string | StaticImport;
  back_female: string | StaticImport;
  back_shiny: string | StaticImport;
  back_shiny_female: string | StaticImport;
  front_default: string | StaticImport;
  front_female: string | StaticImport;
  front_shiny: string | StaticImport;
  front_shiny_female: string | StaticImport;
  other: {
    dream_world: {
      front_default: string | StaticImport;
      front_female: string | StaticImport;
    };
    home: {
      front_default: string | StaticImport;
      front_female: string | StaticImport;
      front_shiny: string | StaticImport;
      front_shiny_female: string | StaticImport;
    };
    "official-artwork": {
      front_default: string;
      front_shiny: string;
    };
    showdown: {
      back_default: string;
      back_female: string | null;
      back_shiny: string;
      back_shiny_female: string | null;
      front_default: string;
      front_female: string | null;
      front_shiny: string;
      front_shiny_female: string | null;
    };
  };
  versions: {
    [generation: string]: {
      [version: string]: {
        back_default?: string;
        back_female?: string | null;
        back_shiny?: string;
        back_shiny_female?: string | null;
        front_default?: string;
        front_female?: string | null;
        front_shiny?: string;
        front_shiny_female?: string | null;
        front_transparent?: string;
        back_transparent?: string;
        back_shiny_transparent?: string;
        front_shiny_transparent?: string;
        back_gray?: string;
        front_gray?: string;
      };
    };
  };
}

interface Stat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

interface IType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface IPokemonDetails {
  abilities: AbilitySlot[];
  base_experience: number;
  cries: Cries;
  forms: Form[];
  game_indices: GameIndex[];
  height: number;
  held_items: HeldItem[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Move[];
  name: string;
  order: number;
  past_abilities: any[]; // You can define a more specific type if needed
  past_types: any[]; // You can define a more specific type if needed
  species: Species;
  sprites: Sprites;
  stats: Stat[];
  types: IType[];
  weight: number;
}

export interface IPokemonList {
  name: string;
  url: string;
}