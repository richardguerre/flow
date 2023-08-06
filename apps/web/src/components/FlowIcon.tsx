type Props = {
  /** The size of the icon in pixels. */
  size?: number;
};

export const FlowIcon = (props: Props) => {
  const size = (props.size ?? 20) / 4; // converted so that unocss doesn't (re)create too many classes
  return <img src="FlowIcon.svg" alt="Flow icon" className={`h-${size} w-${size}`} />;
};
