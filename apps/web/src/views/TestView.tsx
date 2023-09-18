import { Button } from "@flowdev/ui/Button";
import { Dialog, DialogContent, DialogTrigger } from "@flowdev/ui/Dialog";
import { LoginForm } from "./LoginView";
import { FormSelect } from "@flowdev/ui/FormSelect";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@flowdev/ui/Select";
import { useForm } from "react-hook-form";
type FormValues = {
  type: string;
};
export default () => {
  const { control, handleSubmit } = useForm<FormValues>();
  const onSubmit = (values: FormValues) => {
    console.log(values);
  };
  return (
    <div>
      <Dialog defaultOpen>
        <DialogTrigger asChild>
          <Button>Open test dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
            Title
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
      </Dialog>
      <LoginForm />
    </div>
  );
};
