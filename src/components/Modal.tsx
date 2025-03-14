import { capitalizeFirstLetter } from '../utils/capitalizeFirstLetter';
import { Pokemon } from './PokemonSelect';
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: {
    firstName: string;
    lastName: string;
    team: string[];
  };
  pokemons: Pokemon[];
}

const Modal = ({ isOpen, onClose, formData, pokemons }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Submitted Data</h2>
        <p>
          <strong>First Name:</strong> {formData.firstName}
        </p>
        <p>
          <strong>Last Name:</strong> {formData.lastName}
        </p>
        <p>
          <strong>Selected Pokémon:</strong>
        </p>
        <div className="mt-4">
          {formData.team.map((pokemonName, index) => {
            const pokemon = pokemons.find((p) => p.name === pokemonName);
            return (
              <div key={index} className="flex items-center gap-2 mb-2">
                <img
                  src={pokemon?.sprite.replace(
                    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/',
                    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/',
                  )}
                  alt={pokemonName}
                  className="h-20 w-20"
                />
                <span>{capitalizeFirstLetter(pokemonName)}</span>
              </div>
            );
          })}
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
