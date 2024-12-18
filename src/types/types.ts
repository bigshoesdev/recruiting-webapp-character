export type Attributes = {
  Strength: number;
  Dexterity: number;
  Constitution: number;
  Intelligence: number;
  Wisdom: number;
  Charisma: number;
};

export type Class = "Barbarian" | "Wizard" | "Bard";

export type Skill = {
  name: string;
  attributeModifier: keyof Attributes;
};

export interface Character {
  name: string;
  class: Class;
  attributes: Attributes;
  skills: Record<string, number>;
}
