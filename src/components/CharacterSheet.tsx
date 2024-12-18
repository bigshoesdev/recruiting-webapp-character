import React from "react";
import { useCharacterController } from "./../controllers/characterController";
import AttributeSection from "./AttributeSection";
import SkillSection from "./SkillSection";
import SkillCheck from "./SkillCheck";
import { CLASS_LIST } from "../consts/consts";
import { Character } from "../types/types";

type CharacterSheetProps = {
  character: Character;
};

const CharacterSheet: React.FC<CharacterSheetProps> = ({ character }) => {
  const {
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
  } = useCharacterController();

  const isClassEligible = (className: string) => {
    const classRequirements = CLASS_LIST[className];
    return Object.keys(classRequirements).every(
      (attr) => attributes[attr] >= classRequirements[attr]
    );
  };

  return (
    <div>
      <h1>{character.name}</h1>

      <div className="character">
        <div className="character-skill">
          <SkillCheck
            skills={skills}
            attributes={attributes}
            onRoll={(result) => console.log("Skill Check Result:", result)}
          />
        </div>

        <div className="character-att">
          <div className="attribute c-border">
            <AttributeSection
              attributes={attributes}
              handleIncrement={handleIncrement}
              handleDecrement={handleDecrement}
              maxReached={Object.values(attributes).includes(70)}
            />
          </div>

          <div className="available c-border">
            <h2>Classes</h2>
            {Object.keys(CLASS_LIST).map((className) => (
              <div
                key={className}
                style={{
                  color: isClassEligible(className) ? "red" : "white",
                  fontWeight: "bold",
                }}
                onClick={() => setSelectedClass(className)}
              >
                {className}
              </div>
            ))}
          </div>

          {selectedClass && (
            <div className="mini-require c-border">
              <h2>{selectedClass} Minimum Requirements</h2>
              {Object.keys(CLASS_LIST[selectedClass]).map((attr) => (
                <div key={attr}>
                  {attr}: {CLASS_LIST[selectedClass][attr]}
                </div>
              ))}
              <button onClick={() => setSelectedClass(null)}>
                Close Requirement View
              </button>
            </div>
          )}

          <div className="skill c-border">
            <SkillSection
              attributes={attributes}
              skills={skills}
              availableSkillPoints={availableSkillPoints}
              handleSkillPointChange={handleSkillPointChange}
            />
          </div>
        </div>

        <div className="btn-group">
          <button onClick={handleSave}>Save Character</button>
          <button onClick={handleLoad}>Load Character</button>
        </div>
      </div>
    </div>
  );
};

export default CharacterSheet;
