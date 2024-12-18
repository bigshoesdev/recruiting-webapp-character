import React, { useState } from "react";

type SkillCheckProps = {
  skills: any;
  onRoll: (result: string) => void;
};

const SkillCheck: React.FC<SkillCheckProps> = ({
  skills,
  onRoll,
}) => {
  const [selectedSkill, setSelectedSkill] = useState<string>("Acrobatics");
  const [dc, setDc] = useState<number>(20);
  const [result, setResult] = useState<string>("?");

  const handleRoll = () => {
    const skillPoints = skills[selectedSkill]?.points || 0;
    const modifier = skills[selectedSkill].modifier;
    if (isNaN(skillPoints) || isNaN(modifier)) {
      setResult("Invalid skill or attribute data.");
      return;
    }

    const skillValue = skillPoints + modifier;
    const roll = Math.floor(Math.random() * 20) + 1;
    const total = skillValue + roll;
    const isSuccess = total >= dc;

    const rollResult = `Roll: ${roll}, Total: ${total} - ${
      isSuccess ? "Success" : "Failure"
    }`;
    setResult(rollResult);
    onRoll(rollResult);
  };

  return (
    <div>
      <h3>Skill Check</h3>
      <label>
        Select Skill:
        <select
          value={selectedSkill}
          onChange={(e) => setSelectedSkill(e.target.value)}
        >
          {Object.keys(skills).map((skillName) => (
            <option key={skillName} value={skillName}>
              {skillName}
            </option>
          ))}
        </select>
      </label>
      <label>
        DC:
        <input
          type="number"
          value={dc}
          onChange={(e) => setDc(Number(e.target.value))}
          min="1"
          max="30"
        />
      </label>
      <button onClick={handleRoll}>Roll</button>
      <div>Result: {result}</div>
    </div>
  );
};

export default SkillCheck;
