import { BsInfoCircle, BsLock } from "@flowdev/icons";
import {
  PreloadedQuery,
  graphql,
  useMutation,
  usePreloadedQuery,
  useQueryLoader,
} from "@flowdev/relay";
import { Button } from "@flowdev/ui/Button";
import { FormInput } from "@flowdev/ui/FormInput";
import { LoginViewQuery } from "@flowdev/web/relay/__generated__/LoginViewQuery.graphql";
import { useForm } from "react-hook-form";
import { LoginViewLoginMutation } from "../relay/__generated__/LoginViewLoginMutation.graphql";
import { LOCAL_STORAGE_USER_TOKEN_KEY } from "../relay/environment";
import { useNavigate } from "react-router-dom";
import { LoginViewSetPasswordMutation } from "../relay/__generated__/LoginViewSetPasswordMutation.graphql";

const loginViewQuery = graphql`
  query LoginViewQuery {
    isPasswordSet
  }
`;

export default () => {
  const { queryRef } = useQueryLoader<LoginViewQuery>(loginViewQuery);
  if (!queryRef) return null;
  return <LoginViewContent queryRef={queryRef} />;
};

type LoginViewContentProps = {
  queryRef: PreloadedQuery<LoginViewQuery>;
};

const LoginViewContent = (props: LoginViewContentProps) => {
  const data = usePreloadedQuery(loginViewQuery, props.queryRef);

  if (!data.isPasswordSet) {
    return <SetPasswordForm />;
  }

  return <LoginForm />;
};

type LoginFormValues = {
  password: string;
};

const LoginForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState, setError } = useForm<LoginFormValues>();
  const [login, isLoggingIn] = useMutation<LoginViewLoginMutation>(graphql`
    mutation LoginViewLoginMutation($input: MutationLoginInput!) {
      token: login(input: $input)
    }
  `);

  const onSubmit = (values: LoginFormValues) => {
    login({
      variables: { input: { password: values.password } },
      onError: (error) => setError("password", { message: error.message }),
      onCompleted: (data) => {
        window.localStorage.setItem(LOCAL_STORAGE_USER_TOKEN_KEY, data.token);
        navigate("/");
      },
    });
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="bg-background-50 flex max-w-md flex-col gap-8 rounded-lg p-16">
        <h1 className="text-center text-3xl font-semibold">Welcome back!</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p>Your Flow has been protected. Please input your password.</p>
            <FormInput
              leftIcon={<BsLock />}
              type="password"
              placeholder="Password"
              fullWidth
              {...register("password", {
                required: "Please enter your password.",
                minLength: {
                  value: 8,
                  message: "Your password must be at least 8 characters long.",
                },
              })}
              error={formState.errors.password}
            />
          </div>
          <Button fullWidth loading={isLoggingIn}>
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

type SetPasswordFormValues = {
  password: string;
  confirmPassword: string;
};

const SetPasswordForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState, setError, watch } = useForm<SetPasswordFormValues>();
  const password = watch("password");
  const [setPassword, isSettingPassword] = useMutation<LoginViewSetPasswordMutation>(graphql`
    mutation LoginViewSetPasswordMutation($input: MutationSetPasswordInput!) {
      token: setPassword(input: $input)
    }
  `);

  const onSubmit = (values: SetPasswordFormValues) => {
    setPassword({
      variables: { input: { password: values.password } },
      onError: (error) => setError("root", { message: error.message }),
      onCompleted: (data) => {
        window.localStorage.setItem(LOCAL_STORAGE_USER_TOKEN_KEY, data.token);
        navigate("/");
      },
    });
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="bg-background-50 flex max-w-md flex-col gap-8 rounded-lg p-16">
        <h1 className="text-center text-3xl font-semibold">Welcome to your Flow</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p>First, let's protect your Flow from others by setting a password.</p>
            <FormInput
              leftIcon={<BsLock />}
              type="password"
              placeholder="Password"
              fullWidth
              {...register("password", { required: "Please enter your password." })}
              error={formState.errors.password}
              hasError={!!formState.errors.confirmPassword}
            />
            <FormInput
              leftIcon={<BsLock />}
              type="password"
              placeholder="Confirm password"
              fullWidth
              {...register("confirmPassword", {
                required: "Please confirm your password.",
                minLength: {
                  value: 8,
                  message: "Your password must be at least 8 characters long.",
                },
                validate: (value) => value === password || "Passwords do not match.",
              })}
              error={formState.errors.confirmPassword}
            />
            <div className="text-foreground-700 bg-primary-50 flex gap-2 rounded p-2">
              <BsInfoCircle className="flex-shrink-0" />
              <p className="text-sm">
                Psst... make sure to save it somewhere safe, like a password manager.
              </p>
            </div>
          </div>
          <Button fullWidth loading={isSettingPassword}>
            Set password
          </Button>
        </form>
      </div>
    </div>
  );
};
