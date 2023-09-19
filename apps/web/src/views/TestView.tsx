// import { Button } from "@flowdev/ui/Button";
// import { Dialog, DialogContent, DialogTrigger } from "@flowdev/ui/Dialog";
// import { LoginForm } from "./LoginView";
// import { FormSelect } from "@flowdev/ui/FormSelect";
// import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@flowdev/ui/Select";
// import { useForm } from "react-hook-form";
import { BsCheck, HiChevronUpDown } from "@flowdev/icons";
import { Button } from "@flowdev/ui/Button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxSelected,
  ComboboxTrigger,
  ComboboxValue,
} from "@flowdev/ui/Combobox";

const frameworks = [
  {
    value: "Next.js 2.0 different",
    label: "Next.js 2.0",
  },
  {
    value: "SvelteKit",
    label: "SvelteKit",
  },
  {
    value: "Nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "Remix",
    label: "Remix",
  },
  {
    value: "Astro",
    label: "Astro",
  },
];

export default function ComboboxDemo() {
  return (
    <Combobox multiselect>
      <ComboboxTrigger asChild>
        <Button role="combobox" className="w-50 flex justify-between">
          <ComboboxValue
            placeholder="Select a framework..."
            renderValues={(values) => {
              return values
                .map((value) => {
                  const framework = frameworks.find((f) => f.value === value);
                  return framework?.label;
                })
                .join(", ");
            }}
          />
          <HiChevronUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </ComboboxTrigger>
      <ComboboxContent className="w-50 p-0">
        <ComboboxInput placeholder="Search framework..." />
        <ComboboxEmpty>No framework found.</ComboboxEmpty>
        <ComboboxGroup>
          {frameworks.map((framework) => (
            <ComboboxItem key={framework.value} value={framework.value}>
              <ComboboxSelected className="mr-2 h-4 w-4 opacity-0" selectedClassName="opacity-100">
                <BsCheck />
              </ComboboxSelected>
              {framework.label}
            </ComboboxItem>
          ))}
        </ComboboxGroup>
      </ComboboxContent>
    </Combobox>
  );
}

// type FormValues = {
//   title: string;
//   type: string;
// };
// export default () => {
//   // const { register, control, handleSubmit, formState } = useForm<FormValues>();
//   // const onSubmit = (values: FormValues) => {
//   //   console.log(values);
//   // };
//   return (
//     <div>
//       {/* <Dialog defaultOpen>
//         <DialogTrigger asChild>
//           <Button>Open test dialog</Button>
//         </DialogTrigger>
//         <DialogContent>
//           <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
//             <input
//               className="placeholder:text-foreground-700 placeholder:font-300 bg-transparent outline-none"
//               type="text"
//               placeholder="What do you want to do?"
//               {...register("title")}
//             />
//             {formState.errors.title && (
//               <div className="text-negative-600 text-sm">{formState.errors.title.message}</div>
//             )}
//             <FormSelect name="type" control={control}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Select type" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="CODE">Code</SelectItem>
//                 <SelectItem value="REVIEW">Review</SelectItem>
//               </SelectContent>
//             </FormSelect>
//             <Button type="submit">Submit</Button>
//           </form>
//         </DialogContent>
//       </Dialog> */}
//       <div className="flex h-screen items-center justify-center">
//         <div className="w-full max-w-lg">
//           <Command>
//             <CommandInput placeholder="Type a command or search..." />
//             <CommandList>
//               <CommandEmpty>No results found.</CommandEmpty>
//               <CommandGroup heading="Suggestions">
//                 <CommandItem>Calendar</CommandItem>
//                 <CommandItem>Search Emoji</CommandItem>
//                 <CommandItem>
//                   Calculator
//                   <CommandShortcut>C</CommandShortcut>
//                 </CommandItem>
//               </CommandGroup>
//               <CommandSeparator />
//               <CommandGroup heading="Settings">
//                 <CommandItem>Profile</CommandItem>
//                 <CommandItem>Billing</CommandItem>
//                 <CommandItem>Settings</CommandItem>
//               </CommandGroup>
//             </CommandList>
//           </Command>
//         </div>
//       </div>
//       {/* <LoginForm /> */}
//     </div>
//   );
// };
