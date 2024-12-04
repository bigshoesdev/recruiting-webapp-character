import { API_URL } from "../consts/consts";

export const saveCharacter = async (characterData: any) => {
  console.log(characterData)
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(characterData),
    });
    const data = await response.json();
    alert('Add success')
    return data;
  } catch (error) {
    console.error('Error saving character:', error);
    alert('Error saving character');
    return null;
  }
};

export const loadCharacter = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    alert('Load success');
    return data.body;
  } catch (error) {
    console.error('Error loading character:', error);
    alert('Error saving character');
    return null;
  }
};
