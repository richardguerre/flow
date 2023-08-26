import { graphql, useMutation } from "@flowdev/relay";
import { Button } from "@flowdev/ui/Button";
import { useState } from "react";
import { LOCAL_STORAGE_USER_TOKEN_KEY } from "../relay/environment";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FormInput } from "@flowdev/ui/FormInput";
import { toast } from "@flowdev/ui/Toast";
import { GeneralSettingsViewChangePasswordMutation } from "../relay/__generated__/GeneralSettingsViewChangePasswordMutation.graphql";

export default () => {
  return (
    <div className="flex flex-col gap-8 p-8">
      <ChangePasswordSection />
      <LogoutSection />
    </div>
  );
};

type ChangePasswordFormValues = {
  oldPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
};

const ChangePasswordSection = () => {
  const [changePassword, isChangingPassword] =
    useMutation<GeneralSettingsViewChangePasswordMutation>(graphql`
      mutation GeneralSettingsViewChangePasswordMutation($input: MutationChangePasswordInput!) {
        newToken: changePassword(input: $input)
      }
    `);
  const { register, handleSubmit, formState, setError, reset } =
    useForm<ChangePasswordFormValues>();

  const onSubmit = (values: ChangePasswordFormValues) => {
    changePassword({
      variables: {
        input: {
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        },
      },
      onError: (error) => setError("newPasswordConfirm", { message: error.message }),
      onCompleted: (data) => {
        toast.success("Password changed successfully.");
        const sessionToken = window.localStorage.getItem(LOCAL_STORAGE_USER_TOKEN_KEY);
        console.info(`${sessionToken} is no longer valid.`);
        console.info(`New token: ${data.newToken}`);
        window.localStorage.setItem(LOCAL_STORAGE_USER_TOKEN_KEY, data.newToken!);
        reset();
      },
    });
  };

  return (
    <form className="flex flex-col items-start gap-2">
      <FormInput
        type="password"
        label="Old password"
        {...register("oldPassword", { required: "Please enter your current password." })}
      />
      <FormInput
        type="password"
        label="New password"
        {...register("newPassword", { required: "Please enter your new password." })}
        error={formState.errors.newPassword}
        hasError={!!formState.errors.newPasswordConfirm}
      />
      <FormInput
        type="password"
        label="Confirm new password"
        {...register("newPasswordConfirm", {
          required: "Please confirm your new password.",
          minLength: {
            value: 8,
            message: "Your new password must be at least 8 characters long.",
          },
        })}
        error={formState.errors.newPasswordConfirm}
      />
      <Button onClick={handleSubmit(onSubmit)} loading={isChangingPassword}>
        Change password
      </Button>
    </form>
  );
};

const LogoutSection = () => {
  const navigate = useNavigate();
  const [logout, isLoggingOut] = useMutation(graphql`
    mutation GeneralSettingsViewLogoutMutation {
      logout
    }
  `);
  const [error, setError] = useState<string>();

  const handleClick = () => {
    logout({
      variables: {},
      onError: (error) => setError(error.message),
      onCompleted: () => {
        const sessionToken = window.localStorage.getItem(LOCAL_STORAGE_USER_TOKEN_KEY);
        console.info(`${sessionToken} is no longer valid.`);
        window.localStorage.removeItem(LOCAL_STORAGE_USER_TOKEN_KEY);
        navigate("/login");
      },
    });
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <div>Before logging out, remember to save your password so you can log back in.</div>
      <Button danger onClick={handleClick} loading={isLoggingOut}>
        Logout
      </Button>
      <div className="text-negative-500 text-sm">{error}</div>
    </div>
  );
};
