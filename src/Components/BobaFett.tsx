import { useEffect, useState } from "react";
import { readCharacter, readHomeworld } from "../api";

export default function BobaFett() {
  const [character, setCharacter] = useState<any>(null);
  const [homeworld, setHomeworld] = useState(null);
  const [films, setFilms] = useState<string[]>([]);

  useEffect(() => {
    async function getCharacter() {
      try {
        const characterData = await readCharacter();
        setCharacter(characterData);

        if (characterData.homeworld) {
          const homeworldName = await readHomeworld(characterData.homeworld);
          setHomeworld(homeworldName);
        }

        if (characterData.films) {
          let filmTitles: string[] = [];
          for (let filmList of characterData.films) {
            const response = await fetch(filmList);
            if (!response.ok) throw new Error("Failed to fetch film");
            const filmData = await response.json();
            filmTitles.push(filmData.title);
          }
          setFilms(filmTitles);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getCharacter();
  }, []);

  return (
    <>
      <p>Name : {character.name}</p>
      <p>Home World: {homeworld}</p>
      <h2>Films:</h2>
      {films.length > 0 && (
        <ul>
          {films.map((film, index) => (
            <li key={index}>{film}</li>
          ))}
        </ul>
      )}
    </>
  );
}
