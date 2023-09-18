// import { Button } from "@flowdev/ui/Button";
// import { Dialog, DialogContent, DialogTrigger } from "@flowdev/ui/Dialog";
// import { LoginForm } from "./LoginView";
// import { FormSelect } from "@flowdev/ui/FormSelect";
// import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@flowdev/ui/Select";
// import { useForm } from "react-hook-form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@flowdev/ui/Command";

// type FormValues = {
//   title: string;
//   type: string;
// };
export default () => {
  // const { register, control, handleSubmit, formState } = useForm<FormValues>();
  // const onSubmit = (values: FormValues) => {
  //   console.log(values);
  // };
  return (
    <div>
      {/* <Dialog defaultOpen>
        <DialogTrigger asChild>
          <Button>Open test dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
            <input
              className="placeholder:text-foreground-700 placeholder:font-300 bg-transparent outline-none"
              type="text"
              placeholder="What do you want to do?"
              {...register("title")}
            />
            {formState.errors.title && (
              <div className="text-negative-600 text-sm">{formState.errors.title.message}</div>
            )}
            <FormSelect name="type" control={control}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CODE">Code</SelectItem>
                <SelectItem value="REVIEW">Review</SelectItem>
              </SelectContent>
            </FormSelect>
            <Button type="submit">Submit</Button>
          </form>
        </DialogContent>
      </Dialog> */}
      <div className="flex h-screen items-center justify-center">
        <div className="w-full max-w-lg">
          <Command>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem>Calendar</CommandItem>
                <CommandItem>Search Emoji</CommandItem>
                <CommandItem>
                  Calculator
                  <CommandShortcut>C</CommandShortcut>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Settings">
                <CommandItem>Profile</CommandItem>
                <CommandItem>Billing</CommandItem>
                <CommandItem>Settings</CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      </div>
      {/* <LoginForm /> */}
    </div>
  );
};
