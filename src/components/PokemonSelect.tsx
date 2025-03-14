import { useState, useEffect, useRef } from "react";
import { UseFormRegister } from "react-hook-form";

interface FormData {
  firstName: string;
  lastName: string;
  team?: string[];
}

interface PokemonSelectProps {
  register: UseFormRegister<FormData>;
  error?: string;
}

const POKEMONS = [
  "Pikachu", "Charmander", "Squirtle", "Bulbasaur",
  "Eevee", "Jigglypuff", "Snorlax", "Gengar",
  "Psyduck", "Meowth"
];

const PokemonSelect = ({ register, error }: PokemonSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPokemons, setSelectedPokemons] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelectPokemon = (pokemon: string) => {
    const newSelected = selectedPokemons.includes(pokemon)
      ? selectedPokemons.filter(p => p !== pokemon)
      : [...selectedPokemons, pokemon];
    setSelectedPokemons(newSelected);
    register("team").onChange({ target: { value: newSelected, name: "team" } });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="mb-8 relative" ref={dropdownRef}>
      <label className="mb-1 block text-sm font-medium text-gray-700">
        Select 4 Pokémon
      </label>
      <div
        onClick={toggleDropdown}
        className="w-full rounded border p-2 text-gray-700 focus:border-blue-500 focus:outline-none cursor-pointer"
      >
        {selectedPokemons.length > 0 ? selectedPokemons.join(", ") : "Choose Pokémon"}
      </div>
      {isOpen && (
        <div
          className="absolute z-10 w-full rounded border bg-white shadow-lg mt-1"
          onClick={(e) => e.stopPropagation()}
        >
          {POKEMONS.map((pokemon) => (
            <div
              key={pokemon}
              onClick={(e) => {
                e.stopPropagation();
                handleSelectPokemon(pokemon);
              }}
              className={`p-2 hover:bg-gray-100 cursor-pointer ${
                selectedPokemons.includes(pokemon) ? "bg-blue-100" : ""
              }`}
            >
              {pokemon}
            </div>
          ))}
        </div>
      )}
      {error && (
        <p className="absolute left-0 top-full mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default PokemonSelect;