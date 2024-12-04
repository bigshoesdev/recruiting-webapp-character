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
            <label>{skill.name}:</label>
            <span>{skills[skill.name]?.points}</span>
            <span>(modifier: {skill.attributeModifier}): {modifier} </span>
            <button
              onClick={() => handleSkillPointChange(skill.name, 1)} 
              disabled={skills[skill.name]?.points >= availableSkillPoints}
            >
              +
            </button>
            <button
              onClick={() => handleSkillPointChange(skill.name, -1)} 
              disabled={skills[skill.name]?.points <= 0}
            >
              -
            </button>
            <span>total: {totalSkillValue}</span>
          </div>
        );
      })}
    </div>
  );
};

export default SkillSection;

