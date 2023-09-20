import { BsCheck, BsCircleFill } from "@flowdev/icons";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxSelected,
  ComboboxTrigger,
  ComboboxValue,
} from "@flowdev/ui/Combobox";

const types: Record<string, { label: string; iconClassName: string }> = {
  CODE: { label: "Code", iconClassName: "text-blue-600" },
  SPEC: { label: "Spec", iconClassName: "text-gray-600" },
  REVIEW: { label: "Review", iconClassName: "text-yellow-600" },
  QA: { label: "QA", iconClassName: "text-purple-600" },
  LEARNING: { label: "Learning", iconClassName: "text-green-700" },
};

export default function ComboboxDemo() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-75 bg-background-50 flex h-20 items-center justify-center gap-2 rounded-lg shadow-md">
        <Combobox defaultValue="CODE">
          <ComboboxTrigger asChild>
            <button
              role="combobox"
              className="bg-background-50 ring-background-300 flex items-center gap-1 rounded-sm px-2 py-px text-sm  shadow-md ring"
            >
              <ComboboxValue renderValue={(value) => types[value as keyof typeof types].label} />
            </button>
          </ComboboxTrigger>
          <ComboboxContent className="w-50 p-0" align="start">
            <ComboboxInput placeholder="Search type..." />
            <ComboboxEmpty>No type found.</ComboboxEmpty>
            <ComboboxGroup>
              {Object.entries(types).map(([value, taskType]) => (
                <ComboboxItem key={value} value={value}>
                  <ComboboxSelected
                    className="mr-2 h-4 w-4 opacity-0"
                    selectedClassName="opacity-100"
                  >
                    <BsCheck />
                  </ComboboxSelected>
                  {taskType.label}
                </ComboboxItem>
              ))}
            </ComboboxGroup>
          </ComboboxContent>
        </Combobox>
        <Combobox defaultValue="CODE">
          <ComboboxTrigger asChild>
            <button
              role="combobox"
              className="bg-background-50 ring-background-300 flex items-center gap-0.5 rounded-sm py-px pl-1 pr-2 text-sm  shadow-md ring"
            >
              <ComboboxValue
                renderValue={(value) => (
                  <>
                    <BsCircleFill
                      className={`${types[value as keyof typeof types].iconClassName} h-2`}
                    />
                    {types[value as keyof typeof types].label}
                  </>
                )}
              />
            </button>
          </ComboboxTrigger>
          <ComboboxContent className="w-50 p-0" align="start">
            <ComboboxInput placeholder="Search type..." />
            <ComboboxEmpty>No type found.</ComboboxEmpty>
            <ComboboxGroup>
              {Object.entries(types).map(([value, taskType]) => (
                <ComboboxItem key={value} value={value} className="flex items-center gap-1">
                  <ComboboxSelected className="opacity-0" selectedClassName="opacity-100">
                    <BsCheck className="text-foreground-900 h-6" />
                  </ComboboxSelected>
                  <BsCircleFill className={`${taskType.iconClassName} h-2`} />
                  {taskType.label}
                </ComboboxItem>
              ))}
            </ComboboxGroup>
          </ComboboxContent>
        </Combobox>
      </div>
    </div>
  );
}
