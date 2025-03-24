export async function readCharacter() {
  try {
    const response = await fetch("https://swapi.dev/api/people/22");
    if (!response.ok) {
      throw new Error("failed to fetch data");
    }
    const character = await response.json();
    return character;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export async function readHomeworld(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Unable to retrive data");
    }
    const homeworld = await response.json();
    return homeworld.name;
  } catch (error) {
    console.error("Error fetching homeworld", error);
    return null;
  }
}
