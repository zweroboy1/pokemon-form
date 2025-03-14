import { FieldError, UseFormRegister } from "react-hook-form";

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
  return (
    <div className="mb-8 relative">
      <label className="mb-1 block text-sm font-medium text-gray-700">
        Select 4 Pokémon
      </label>
      <select
        {...register("team")}
        multiple
        className="w-full rounded border p-2 text-gray-700 focus:border-blue-500 focus:outline-none"
        style={{ height: "120px" }}
      >
        {POKEMONS.map((pokemon) => (
          <option key={pokemon} value={pokemon}>
            {pokemon}
          </option>
        ))}
      </select>
      {error && (
        <p className="absolute left-0 top-full mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default PokemonSelect;
