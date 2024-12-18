import { useState } from "react";
import {
  calculateModifier,
  calculateAvailableSkillPoints,
} from "./../utils/utils";
import { saveCharacter, loadCharacter } from "./../services/services";
import { DEFAULT_ATTRIBUTE, SKILL_LIST } from "../consts/consts";

export const useCharacterController = () => {
  const [attributes, setAttributes] = useState({ ...DEFAULT_ATTRIBUTE });

  const [skills, setSkills] = useState(
    SKILL_LIST.reduce((acc, skill) => {
      acc[skill.name] = {
        points: 0,
        modifier: calculateModifier(attributes[skill.attributeModifier]),
      };
      return acc;
    }, {} as Record<string, { points: number; modifier: number }>)
  );

  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const availableSkillPoints = calculateAvailableSkillPoints(
    attributes["Intelligence"]
  );

  const handleSkillPointChange = (skillName: string, delta: number) => {
    setSkills((prevSkills) => {
      const updatedSkills = { ...prevSkills };
      updatedSkills[skillName].points = Math.max(
        updatedSkills[skillName].points + delta,
        0
      );
      return updatedSkills;
    });
  };

  const checkMaxReached = () => {
    const totalAttributes = Object.values(attributes).reduce(
      (total, value) => total + value,
      0
    );
    return totalAttributes >= 70;
  };

  const handleIncrement = (attribute: string) => {
    if (checkMaxReached()) {
      alert(
        "Total attributes cannot exceed 70. Please decrease one attribute first."
      );
      return;
    }

    setAttributes((prevState) => ({
      ...prevState,
      [attribute]: prevState[attribute] + 1,
    }));
  };

  const handleDecrement = (attribute: string) => {
    if (attributes[attribute] > 0) {
      setAttributes((prevState) => ({
        ...prevState,
        [attribute]: prevState[attribute] - 1,
      }));
    }
  };

  const handleSave = async () => {
    const characterData = { attributes, skills, selectedClass };
    await saveCharacter(characterData);
  };

  const handleLoad = async () => {
    const characterData = await loadCharacter();
    if (characterData) {
      setAttributes(characterData.attributes);
      setSkills(characterData.skills);
      setSelectedClass(characterData.selectedClass);
    }
  };

  return {
    attributes,
    skills,
    availableSkillPoints,
    handleSkillPointChange,
    handleIncrement,
    handleDecrement,
    handleSave,
    handleLoad,
    selectedClass,
    setSelectedClass,
  };
};
