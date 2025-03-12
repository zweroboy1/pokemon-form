import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


const schema = yup.object({
  firstName: yup
    .string()
    .required("First name is required")
    .matches(/^[a-zA-Z]+$/, "Only alphabets are allowed")
    .min(2, "Must be at least 2 characters")
    .max(12, "Must be at most 12 characters"),
  lastName: yup
    .string()
    .required("Last name is required")
    .matches(/^[a-zA-Z]+$/, "Only alphabets are allowed")
    .min(2, "Must be at least 2 characters")
    .max(12, "Must be at most 12 characters"),
  team: yup
    .array()
    .of(yup.string())
    .min(4, "Select exactly 4 Pokémon")
    .max(4, "Select exactly 4 Pokémon"),
});

type FormData = yup.InferType<typeof schema>;

const TrainerForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>First Name</label>
        <input {...register("firstName")} />
        {errors.firstName && <p>{errors.firstName.message}</p>}
      </div>
      <div>
        <label>Last Name</label>
        <input {...register("lastName")} />
        {errors.lastName && <p>{errors.lastName.message}</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default TrainerForm;