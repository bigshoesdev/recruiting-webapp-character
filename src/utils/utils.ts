import { CLASS_LIST } from "../consts/consts";

export const calculateModifier = (attribute: number): number => {
  return Math.floor((attribute - 10) / 2);
};

export const calculateAvailableSkillPoints = (intelligence: number): number => {
  return 10 + 4 * calculateModifier(intelligence);
};

export const isClassEligible = (
  attributes: any,
  className: string
): boolean => {
  const classRequirements = CLASS_LIST[className];

  for (const attribute in classRequirements) {
    if (attributes[attribute] < classRequirements[attribute]) {
      return false;
    }
  }
  return true;
};
