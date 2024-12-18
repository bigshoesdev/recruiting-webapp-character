import React, { useState } from "react";
import CharacterSheet from "./CharacterSheet";
import { Character } from "../types/types";
import { DEFAULT_ATTRIBUTE } from "../consts/consts";

const CharacterManager: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);

  const handleAddCharacter = () => {
    const newCharacter: Character = {
      name: `Character ${characters.length + 1}`,
      class: "Barbarian",
      attributes: { ...DEFAULT_ATTRIBUTE },
      skills: {},
    };
    setCharacters([...characters, newCharacter]);
  };

  return (
    <div>
      <button onClick={handleAddCharacter}>Add Character</button>
      <div>
        {characters.map((character, index) => (
          <CharacterSheet character={character} />
        ))}
      </div>
    </div>
  );
};

export default CharacterManager;
