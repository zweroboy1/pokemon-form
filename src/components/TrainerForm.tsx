import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import PokemonSelect from "./PokemonSelect";

const schema = yup.object({
  firstName: yup
    .string()
    .required("First name is required")
    .matches(/^[a-zA-Z]+$/, "Only latin letters are allowed")
    .min(2, "Must be at least 2 characters")
    .max(12, "Must be at most 12 characters"),
  lastName: yup
    .string()
    .required("Last name is required")
    .matches(/^[a-zA-Z]+$/, "Only latin letters are allowed")
    .min(2, "Must be at least 2 characters")
    .max(12, "Must be at most 12 characters"),
  team: yup
    .array(yup.string().required())
    .min(4, "Select exactly 4 Pokémon")
    .max(4, "Select exactly 4 Pokémon"),
});

type FormData = yup.InferType<typeof schema>;

const TrainerForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
     team: [],
    }
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
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
            {...register("firstName")}
            className="w-full rounded border p-2 text-gray-700 focus:border-blue-500 focus:outline-none"
          />
          <p className="absolute left-0 top-full mt-1 text-sm text-red-500">
            {errors.firstName?.message}
          </p>
        </div>
        <div className="mb-8 relative">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            {...register("lastName")}
            className="w-full rounded border p-2 text-gray-700 focus:border-blue-500 focus:outline-none"
          />
          <p className="absolute left-0 top-full mt-1 text-sm text-red-500">
            {errors.lastName?.message}
          </p>
        </div>

        <PokemonSelect register={register} error={errors.team?.message} />

        <button
          type="submit"
          disabled={!isValid}
          className={`w-full rounded px-4 py-2 text-white transition ${
            isValid ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default TrainerForm;
