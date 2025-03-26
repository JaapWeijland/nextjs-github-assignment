import { Spinner as RadixSpinner } from "@radix-ui/themes";

export const Spinner = () => {
  return (
    <div className="flex justify-center items-center w-full h-[80px]">
      <RadixSpinner size="3" />
    </div>
  );
};
