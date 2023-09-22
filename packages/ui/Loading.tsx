import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, Suspense } from "react";
import { suspend } from "./suspend";

const WAVELENGTH = 82;

type LoadingProps = {
  /** 0 - 40. The loader will animate from this minProgress up to 60. Starts at 0 as the fast part  */
  minProgress?: number;
  /** 60 - 100. The loader will animate from 0 up to this maxProgress. Starts at 60 as the slow part  */
  maxProgress?: number;
  /** Duration in seconds. */
  duration?: number;
};

export const Loading = (props: LoadingProps) => {
  const maxProgress = props.maxProgress && props.maxProgress >= 60 ? props.maxProgress : 60;
  const duration = props.duration ?? 2;
  // progress starts at 96 and ends at -17
  const min =
    props.minProgress && props.minProgress <= 40 ? 96 - (props.minProgress / 100) * 113 : 96;
  const heightOfWave = 113;
  const max = min - (maxProgress / 100) * heightOfWave;
  return (
    <div className="ring-primary-500/10 ring-5 rounded-full p-1">
      <div className="relative h-24 w-24 overflow-clip rounded-full">
        <motion.svg
          width="246"
          height="113"
          viewBox="0 0 246 113"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute right-0"
          animate={{
            transition: {
              duration: duration,
              ease: "linear",
              times: [0, 0.1, 0.8, 1],
            },
            y: [min, 60, 30, max],
          }}
        >
          <motion.path
            d="M41 14.6066C27.3331 14.6066 13.6669 0.0610556 0 0.0205112V113H246V0.0205112L245.998 0.0214844C232.332 8.44216 218.666 16.8624 205 14.6066C191.333 12.3498 177.667 -0.58383 164 0.0205112C150.333 0.624852 136.667 14.7672 123 14.6066C109.333 14.4451 95.6669 -0.0200333 82 0.0205112C68.3331 0.0610556 54.6669 14.6066 41 14.6066Z"
            fill="url(#bg-wave-gradient)"
            animate={{
              transition: {
                repeat: Infinity,
                duration: 0.9,
                delay: 0.1,
                ease: "linear",
              },
              x: [0, WAVELENGTH],
            }}
          />
          <defs>
            <linearGradient
              id="bg-wave-gradient"
              x1="0"
              y1="0"
              x2="0"
              y2="50"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="currentColor" className="text-primary-300" />
              <stop offset="1" stop-color="currentColor" className="text-primary-400" />
            </linearGradient>
          </defs>
        </motion.svg>
        <motion.svg
          width="246"
          height="113"
          viewBox="0 0 246 113"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-0"
          animate={{
            transition: {
              duration: duration,
              ease: "linear",
              times: [0, 0.1, 0.8, 1],
            },
            y: [min, 60, 30, max],
          }}
        >
          <motion.path
            d="M41 14.6066C27.3331 14.6066 13.6669 0.0610556 0 0.0205112V113H246V0.0205112L245.998 0.0214844C232.332 8.44216 218.666 16.8624 205 14.6066C191.333 12.3498 177.667 -0.58383 164 0.0205112C150.333 0.624852 136.667 14.7672 123 14.6066C109.333 14.4451 95.6669 -0.0200333 82 0.0205112C68.3331 0.0610556 54.6669 14.6066 41 14.6066Z"
            fill="url(#fg-wave-gradient)"
            animate={{
              transition: {
                repeat: Infinity,
                duration: 0.9,
                ease: "linear",
              },
              x: [0, -WAVELENGTH],
            }}
          />
          <defs>
            <linearGradient
              id="fg-wave-gradient"
              x1="0"
              y1="0"
              x2="0"
              y2="113"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="currentColor" className="text-primary-200" />
              <stop offset="1" stop-color="currentColor" className="text-primary-400" />
            </linearGradient>
          </defs>
        </motion.svg>
      </div>
    </div>
  );
};

export const LoadingView = () => {
  return (
    <motion.div
      className="flex h-screen w-full items-center justify-center"
      transition={{ duration: 0.3 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }} // TODO: this exit animation still doesn't work, the component get's unmouted immediately instead of fading out
    >
      <Loading minProgress={40} />
    </motion.div>
  );
};

const wait = (ms: number) => new Promise((resolve) => setTimeout(() => resolve(true), ms));
/** This component will suspend for the given time (in ms). 500ms by default. Also, yes, it's a play on words. */
const WaitInSuspense = ({ waitFor = 500 }: { waitFor?: number }) => {
  suspend(wait(waitFor), [waitFor]);
  return null;
};
export const SuspenseLoadingView = (props: { children: ReactNode }) => {
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<LoadingView />}>
        <WaitInSuspense waitFor={500} />
        {props.children}
      </Suspense>
    </AnimatePresence>
  );
};
