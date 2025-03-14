import { Meta, StoryFn } from '@storybook/react';
import { useForm, UseFormRegister } from 'react-hook-form';
import PokemonSelect from './PokemonSelect';

interface FormData {
  firstName: string;
  lastName: string;
  team?: string[];
}

const meta: Meta<typeof PokemonSelect> = {
  title: 'Components/PokemonSelect',
  component: PokemonSelect,
};
export default meta;

const Template: StoryFn<typeof PokemonSelect> = (args) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <PokemonSelect
        {...args}
        register={register as UseFormRegister<FormData>}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export const Default = Template.bind({});
Default.args = {
  onPokemonDataChange: (pokemons) =>
    console.log('Pokemon Data Changed:', pokemons),
};

export const WithError = Template.bind({});
WithError.args = {
  ...Default.args,
  error: 'You must select exactly 4 Pokémon',
};
