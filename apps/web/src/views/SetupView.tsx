import { graphql, useFragment, useMutation } from "@flowdev/relay";
import { Controller, useForm } from "react-hook-form";
import { SetupViewSetPasswordMutation } from "../relay/__generated__/SetupViewSetPasswordMutation.graphql";
import { LOCAL_STORAGE_USER_TOKEN_KEY } from "../relay/environment";
import { FormInput } from "@flowdev/ui/FormInput";
import { BsInfoCircle, BsLock } from "@flowdev/icons";
import { Button } from "@flowdev/ui/Button";
import { SetupView_data$key } from "../relay/__generated__/SetupView_data.graphql";
import { AnimatePresence, motion } from "framer-motion";
import { Loading } from "@flowdev/ui/Loading";
import { SetupViewSetTimezoneMutation } from "../relay/__generated__/SetupViewSetTimezoneMutation.graphql";
import { TimezoneSelect } from "@flowdev/ui/TimezoneSelect";
import { dayjs } from "../dayjs";
import { useNavigate } from "react-router-dom";

const LOADING_DURATION = 3;
const SCREEN_FILL_DURATION = 0.8;
const SCREEN_DARKEN_DURATION = 2;
const SCREEN_LOGO_DURATION = 3;
const SCREEN_WELCOME_DURATION = 3;

type Props = {
  data: SetupView_data$key;
};

export const SetupView = (props: Props) => {
  const navigate = useNavigate();
  const data = useFragment(
    graphql`
      fragment SetupView_data on Query {
        isPasswordSet
        timezoneSet
      }
    `,
    props.data,
  );

  return (
    <div className="relative flex h-screen w-full items-center justify-center">
      <Loading maxProgress={100} duration={LOADING_DURATION} />

      {/* Increasing size circle transition */}
      <motion.div
        className="bg-gradient-from-primary-200 bg-gradient-to-primary-400 absolute h-[max(100vw,100vh)] w-screen bg-gradient-to-b hidden"
        animate={{
          transition: {
            duration: SCREEN_FILL_DURATION,
            delay: LOADING_DURATION,
            times: [0, 0.5, 1],
          },
          display: ["none", "block", "block"],
          scale: [0, 1, 1],
          borderRadius: ["50%", "50%", "0%"],
        }}
      />
      {/* Darkening gradient transition */}
      <motion.div
        className="bg-gradient-from-primary-600 bg-gradient-to-primary-950 absolute h-[max(100vw,100vh)] w-screen bg-gradient-to-b hidden"
        animate={{
          transition: {
            duration: SCREEN_DARKEN_DURATION,
            delay: LOADING_DURATION + SCREEN_FILL_DURATION,
            times: [0, 1],
          },
          display: ["none", "block"],
          opacity: [0, 1],
        }}
      />

      {/* Logo transition */}
      <motion.div
        className="absolute hidden"
        animate={{
          transition: {
            duration: SCREEN_LOGO_DURATION,
            delay: LOADING_DURATION + SCREEN_FILL_DURATION,
            times: [0, 0.4, 0.6, 1],
            ease: ["easeOut", "easeIn"],
          },
          display: ["none", "block", "block", "block"],
          y: [300, 0, 0, -300],
          opacity: [0, 1, 1, 0],
          filter: ["blur(50px)", "blur(0px)", "blur(0px)", "blur(10px)"],
        }}
      >
        <svg
          width="100"
          height="100"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-primary-50"
        >
          <path
            d="M2 7C4 5.5 6 4.39441 9.5 7C12.1865 8.99998 12.1865 8.99998 12.1865 8.99998L18 3"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <path
            d="M2 11C4 9.5 6 8.39441 9.5 11C12.1865 13 12.1865 13 12.1865 13L18 7"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <path
            d="M2 15C4 13.5 6 12.3944 9.5 15C12.1865 17 12.1865 17 12.1865 17L18 11"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
      </motion.div>

      {/* Welcome text transition */}
      <motion.div
        className="text-primary-50 absolute w-full text-center text-7xl font-black hidden"
        animate={{
          transition: {
            duration: SCREEN_WELCOME_DURATION,
            delay: LOADING_DURATION + SCREEN_FILL_DURATION + SCREEN_LOGO_DURATION - 0.5,
            times: [0, 0.4, 0.6, 1],
            ease: ["easeOut", "easeIn"],
          },
          display: ["none", "block", "block", "block"],
          y: [300, 0, 0, -300],
          opacity: [0, 1, 1, 0],
          filter: ["blur(50px)", "blur(0px)", "blur(0px)", "blur(10px)"],
        }}
      >
        Welcome {data.isPasswordSet ? "back" : ""} to your Flow
      </motion.div>

      {/* Setup form transition */}
      <AnimatePresence>
        {!data.isPasswordSet ? (
          <motion.div
            key="test1"
            className="absolute flex-col items-center p-4 hidden"
            animate={{
              transition: {
                duration: 1,
                delay:
                  LOADING_DURATION +
                  SCREEN_FILL_DURATION +
                  SCREEN_LOGO_DURATION +
                  SCREEN_WELCOME_DURATION -
                  0.5,
                times: [0, 1],
                ease: "easeOut",
              },
              display: ["none", "flex"],
              y: [300, 0],
              opacity: [0, 1],
              filter: ["blur(50px)", "blur(0px)"],
            }}
            exit={{
              transition: {
                duration: 1,
                ease: "easeIn",
              },
              y: -300,
              opacity: 0,
            }}
          >
            <SetPasswordForm />
          </motion.div>
        ) : !data.timezoneSet ? (
          <motion.div
            key="test1"
            className="absolute flex-col items-center p-4 hidden"
            animate={{
              transition: {
                duration: 1,
                delay:
                  LOADING_DURATION +
                  SCREEN_FILL_DURATION +
                  SCREEN_LOGO_DURATION +
                  SCREEN_WELCOME_DURATION -
                  0.5,
                times: [0, 1],
                ease: "easeOut",
              },
              display: ["none", "flex"],
              y: [300, 0],
              opacity: [0, 1],
              filter: ["blur(50px)", "blur(0px)"],
            }}
            exit={{
              transition: {
                duration: 1,
                ease: "easeIn",
              },
              y: -300,
              opacity: 0,
            }}
          >
            <SetTimezoneForm />
          </motion.div>
        ) : (
          <motion.div
            className="text-primary-50 absolute w-full text-center text-7xl font-black hidden"
            animate={{
              transition: {
                duration: 2,
                delay: 1,
                times: [0, 0.3, 1],
                ease: "easeOut",
              },
              display: ["none", "block", "block"],
              y: [300, 0, 0],
              opacity: [0, 1, 1],
              filter: ["blur(50px)", "blur(0px)", "blur(0px)"],
            }}
            onAnimationComplete={() => navigate("/")}
          >
            Time to start Flowing...
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

type SetPasswordFormValues = {
  password: string;
  confirmPassword: string;
};

export const SetPasswordForm = () => {
  const { register, handleSubmit, formState, setError, watch } = useForm<SetPasswordFormValues>();
  const password = watch("password");
  const [setPassword, isSettingPassword] = useMutation<SetupViewSetPasswordMutation>(graphql`
    mutation SetupViewSetPasswordMutation($input: MutationSetPasswordInput!) {
      token: setPassword(input: $input)
    }
  `);

  const onSubmit = (values: SetPasswordFormValues) => {
    setPassword({
      variables: { input: { password: values.password } },
      onError: (error) => setError("root", { message: error.message }),
      updater: (store) => store.getRoot().setValue(true, "isPasswordSet"),
      onCompleted: (data) => {
        window.localStorage.setItem(LOCAL_STORAGE_USER_TOKEN_KEY, data.token);
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-background-50 flex max-w-md flex-col gap-3 rounded-lg p-16"
    >
      <h1 className="text-xl font-bold">First, let's protect your Flow with a password.</h1>
      <h2 className="text-foreground-700 text-base">Don't worry, you can change it later.</h2>
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
          validate: (value) => value === password || "Passwords must match.",
        })}
        error={formState.errors.confirmPassword}
      />
      <div className="text-foreground-700 bg-primary-100/70 flex items-center gap-3 rounded p-3">
        <BsInfoCircle className="flex-shrink-0" />
        <p className="text-sm">
          Psst... make sure to save it somewhere safe, like a password manager.
        </p>
      </div>
      <Button fullWidth loading={isSettingPassword} className="mt-3">
        Set password
      </Button>
    </form>
  );
};

type SetTimezoneFormValues = {
  timezone: string;
};

export const SetTimezoneForm = () => {
  const { control, handleSubmit, formState, setError } = useForm<SetTimezoneFormValues>();
  const [setTimezone, isSettingTimezone] = useMutation<SetupViewSetTimezoneMutation>(graphql`
    mutation SetupViewSetTimezoneMutation($input: MutationSetTimezoneInput!) {
      timezone: setTimezone(input: $input)
    }
  `);

  const onSubmit = (values: SetTimezoneFormValues) => {
    setTimezone({
      variables: { input: { timezone: values.timezone } },
      onError: (error) => setError("timezone", { message: error.message }),
      updater: (store) => store.getRoot().setValue(values.timezone, "timezoneSet"),
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-background-50 flex max-w-md flex-col gap-3 rounded-lg p-16"
    >
      <h1 className="text-xl font-bold">Now, let's set your timezone.</h1>
      <p className="text-foreground-700 text-base">
        We will use it to do automations at the right time for you.
      </p>
      <Controller
        name="timezone"
        control={control}
        defaultValue={dayjs.tz.guess()}
        render={({ field }) => (
          <TimezoneSelect
            {...field}
            onChange={(tzObj) => field.onChange(tzObj.value)}
            placeholder="Select your timezone"
            error={formState.errors.timezone}
          />
        )}
      />
      <Button fullWidth loading={isSettingTimezone} className="mt-3">
        Set timezone
      </Button>
    </form>
  );
};
