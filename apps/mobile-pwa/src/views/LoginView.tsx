import { BsLock } from "@flowdev/icons";
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

const loginViewQuery = graphql`
  query LoginViewQuery {
    isFullySetup
    ...SetupView_data
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

  if (!data.isFullySetup) {
    return <SetupView data={data} />;
  }

  return <LoginForm />;
};

type LoginFormValues = {
  password: string;
};

export const LoginForm = () => {
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
