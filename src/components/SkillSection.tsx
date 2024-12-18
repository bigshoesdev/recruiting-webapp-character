import React from 'react';
import { SKILL_LIST } from '../consts/consts';  
import { calculateModifier } from './../utils/utils'; 

type SkillSectionProps = {
  attributes: any; 
  skills: any;  
  availableSkillPoints: number;  
  handleSkillPointChange: (skillName: string, delta: number) => void;  
};

const SkillSection: React.FC<SkillSectionProps> = ({
  attributes,
  skills,
  availableSkillPoints,
  handleSkillPointChange
}) => {
  return (
    <div className="skill-section">
      <h2>Skills</h2>
      <p>Total skill points available: {availableSkillPoints}</p>
      {SKILL_LIST.map((skill) => {
        const modifier = calculateModifier(attributes[skill.attributeModifier]);
        const totalSkillValue = skills[skill.name]?.points + modifier; 
        return (
          <div key={skill.name} className="skill">
            <label>{skill.name} - points: </label>
            <span>{skills[skill.name]?.points}</span>
            <button
              onClick={() => handleSkillPointChange(skill.name, 1)} 
              >
              +
            </button>
            <button
              onClick={() => handleSkillPointChange(skill.name, -1)} 
              disabled={skills[skill.name]?.points <= 0}
              >
              -
            </button>
            <span> modifier({skill.attributeModifier}): {modifier} </span>
            <span>total: {totalSkillValue}</span>
          </div>
        );
      })}
    </div>
  );
};

export default SkillSection;

