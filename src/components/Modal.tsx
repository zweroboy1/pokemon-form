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
      <div className="flex flex-col gap-7 bg-white rounded-lg p-6 min-h-80 min-w-80">
        <div className="flex justify-between">
          <p className="text-xl font-bold">Trainer Information</p>
          <button onClick={onClose} className="text-black flex font-bold text-2xl">
            x
          </button>
        </div>
        <div>
          <p className="text-xm font-bold">Trainer Full Name:</p>
          <p className="text-xl capitalize">
            {formData.firstName} {formData.lastName}
          </p>
        </div>
        <div className="text-xm font-bold">Pokemon Team:</div>
        <div className="grid grid-cols-2 gap-4">
          {formData.team.map((pokemonName, index) => {
            const pokemon = pokemons.find((p) => p.name === pokemonName);
            return (
              <div key={index} className="flex flex-col items-center gap-2 p-2 border rounded-lg shadow-sm">
                <img
                  src={pokemon?.sprite.replace(
                    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/',
                    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/',
                  )}
                  alt={pokemonName}
                  className="w-20 h-20"
                />
                <span className="text-xl capitalize">
                  {capitalizeFirstLetter(pokemonName)}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex justify-end gap-5">
          <button
            onClick={onClose}
            className="hover:bg-purple-500 text-white px-4 py-2 rounded-md bg-purple-600 w-6/12 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="hover:bg-purple-500 text-white px-4 py-2 rounded-md bg-purple-600 w-6/12 cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;