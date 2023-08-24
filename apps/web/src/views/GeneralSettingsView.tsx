import { graphql, useMutation } from "@flowdev/relay";
import { Button } from "@flowdev/ui/Button";
import { useState } from "react";
import { LOCAL_STORAGE_USER_TOKEN_KEY } from "../relay/environment";
import { useNavigate } from "react-router-dom";

export default () => {
  return (
    <div className="flex flex-col gap-8 p-8">
      <div>Change password</div>
      <LogoutSection />
    </div>
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
