import { Button } from "@flowdev/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@flowdev/ui/Dialog";
import { LoginForm } from "./LoginView";

export default () => {
  return (
    <div>
      <Dialog defaultOpen>
        <DialogTrigger asChild>
          <Button>Open test dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <div>Test to see where this fits.</div>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Are you sure you want to permanently delete this file from
            our servers?
          </DialogDescription>
          <DialogFooter>
            <Button type="submit">Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <LoginForm />
    </div>
  );
};
