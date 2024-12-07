import React, { useState } from 'react';
import CharacterSheet from './CharacterSheet';
import { Character } from '../types/types';

const CharacterManager: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]); 

  const handleAddCharacter = () => {
    const newCharacter: Character = {
      name: `Character ${characters.length + 1}`,
      class: 'Barbarian', 
      attributes: {
        Strength: 10,
        Dexterity: 10,
        Constitution: 10,
        Intelligence: 10,
        Wisdom: 10,
        Charisma: 10,
      },
      skills: {},
    };
    setCharacters([...characters, newCharacter]);
  };

  return (
    <div>
      <button onClick={handleAddCharacter}>Add Character</button>
      <div>
        {characters.map((character, index) => (
          <CharacterSheet
            character={character}
          />
        ))}
      </div>
    </div>
  );
};

export default CharacterManager;
