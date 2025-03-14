import { useState, useEffect, useRef } from 'react';
import { UseFormRegister } from 'react-hook-form';
import axios from 'axios';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { capitalizeFirstLetter } from '../utils/capitalizeFirstLetter';

interface FormData {
  firstName: string;
  lastName: string;
  team?: string[];
}

interface PokemonSelectProps {
  register: UseFormRegister<FormData>;
  error?: string;
  onPokemonDataChange: (pokemons: Pokemon[]) => void;
}

export interface Pokemon {
  name: string;
  url: string;
  sprite: string;
}

const PokemonSelect = ({
  register,
  error,
  onPokemonDataChange,
}: PokemonSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPokemons, setSelectedPokemons] = useState<string[]>([]);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get(
          'https://pokeapi.co/api/v2/pokemon?limit=50',
        );
        const pokemonData = response.data.results.map((pokemon: Pokemon) => ({
          ...pokemon,
          sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            pokemon.url.split('/')[6]
          }.png`,
        }));
        setPokemons(pokemonData);
        onPokemonDataChange(pokemonData);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    };

    fetchPokemons();
  }, []);

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelectPokemon = (pokemon: string) => {
    const newSelected = selectedPokemons.includes(pokemon)
      ? selectedPokemons.filter((p) => p !== pokemon)
      : [...selectedPokemons, pokemon];
    setSelectedPokemons(newSelected);
    register('team').onChange({ target: { value: newSelected, name: 'team' } });
  };

  const handleRemovePokemon = (pokemon: string) => {
    const newSelected = selectedPokemons.filter((p) => p !== pokemon);
    setSelectedPokemons(newSelected);
    register('team').onChange({ target: { value: newSelected, name: 'team' } });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="mb-8 relative" ref={dropdownRef}>
      <label className="mb-1 block text-sm font-medium text-gray-700">
        Select 4 Pokémon
      </label>
      <div
        onClick={toggleDropdown}
        className="w-full rounded border p-2 text-gray-700 focus:border-blue-500 focus:outline-none cursor-pointer flex items-center justify-between"
      >
        <div className="flex flex-wrap items-center gap-2 flex-1">
          {selectedPokemons.length > 0 ? (
            selectedPokemons.map((pokemon) => (
              <div
                key={pokemon}
                className="flex items-center gap-1 bg-[#f4f4f6] rounded-full px-3 py-1 text-sm text-black cursor-default"
              >
                <span>{capitalizeFirstLetter(pokemon)}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemovePokemon(pokemon);
                  }}
                  className="text-[#9ca2ae] hover:text-[#6b7280] cursor-pointer"
                >
                  <XMarkIcon className="h-4 w-4 hover:text-[#6b7280]" />
                </button>
              </div>
            ))
          ) : (
            <span>Choose Pokémon</span>
          )}
        </div>
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full rounded border bg-white shadow-lg mt-1">
          <div className="p-2 border-b">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Search Pokémon..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 rounded border focus:outline-none focus:border-blue-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="ml-2 p-1 text-gray-500 hover:text-gray-700"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>

          <div className="max-h-60 overflow-y-auto">
            {filteredPokemons.map((pokemon) => (
              <div
                key={pokemon.name}
                onClick={() => handleSelectPokemon(pokemon.name)}
                className={`p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2 ${
                  selectedPokemons.includes(pokemon.name) ? 'bg-blue-100' : ''
                }`}
              >
                <img
                  src={pokemon.sprite}
                  alt={pokemon.name}
                  className="h-6 w-6"
                />
                <span>{capitalizeFirstLetter(pokemon.name)}</span>
              </div>
            ))}
          </div>
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
