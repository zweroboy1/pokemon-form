import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import PokemonSelect, { Pokemon } from './PokemonSelect';
import Modal from './Modal';

const schema = yup.object({
  firstName: yup
    .string()
    .required('First name is required')
    .matches(/^[a-zA-Z]+$/, 'Only latin letters are allowed')
    .min(2, 'Must be at least 2 characters')
    .max(12, 'Must be at most 12 characters'),
  lastName: yup
    .string()
    .required('Last name is required')
    .matches(/^[a-zA-Z]+$/, 'Only latin letters are allowed')
    .min(2, 'Must be at least 2 characters')
    .max(12, 'Must be at most 12 characters'),
  team: yup
    .array(yup.string().required())
    .min(4, 'Select exactly 4 Pokémon')
    .max(4, 'Select exactly 4 Pokémon'),
});

type FormData = yup.InferType<typeof schema>;

const TrainerForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      team: [],
    },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setFormData(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 p-4 min-w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-md"
      >
        <h2 className="mb-6 text-center text-2xl font-semibold text-gray-800">
          Pokémon Trainer Form
        </h2>
        <div className="mb-8 relative">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            {...register('firstName')}
            className={`w-full rounded border p-2 text-black placeholder-[#c1bfc8] focus:outline-3 focus:outline-[#4724c7]  ${
              errors.firstName
                ? 'border-[#f98f90] focus:outline-3 focus:outline-[#f98f90] '
                : 'border-[#c1bfc8]'
            }`}
            placeholder="Enter your first name"
          />
          <p className="absolute left-0 top-full mt-1 text-sm text-[#f98f90]">
            {errors.firstName?.message}
          </p>
          <p className="absolute left-0 top-full mt-1 text-sm text-red-500">
            {errors.firstName?.message}
          </p>
        </div>
        <div className="mb-8 relative">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            {...register('lastName')}
            className={`w-full rounded border p-2 text-black placeholder-[#c1bfc8] focus:outline-3 focus:outline-[#4724c7]  ${
              errors.lastName
                ? 'border-[#f98f90] focus:outline-3 focus:outline-[#f98f90] '
                : 'border-[#c1bfc8]'
            }`}
            placeholder="Enter your last name"
          />
          <p className="absolute left-0 top-full mt-1 text-sm text-red-500">
            {errors.lastName?.message}
          </p>
        </div>

        <PokemonSelect
          register={register}
          error={errors.team?.message}
          onPokemonDataChange={(pokemons) => setPokemons(pokemons)}
        />

        <button
          type="submit"
          disabled={!isValid}
          className={`w-full rounded px-4 py-2 transition ${
            isValid
              ? 'bg-[#4724c7] text-white hover:bg-[#1724c7]  focus:ring-2 focus:ring-[#4724c7] focus:ring-offset-2  cursor-pointer'
              : 'bg-[#eef2ff] text-[#c6d2fe] cursor-not-allowed'
          }`}
        >
          Submit
        </button>
      </form>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        formData={
          (formData || { firstName: '', lastName: '', team: [] }) as {
            firstName: string;
            lastName: string;
            team: string[];
          }
        }
        pokemons={pokemons}
      />
    </div>
  );
};

export default TrainerForm;
