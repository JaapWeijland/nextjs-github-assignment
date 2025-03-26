import { Column } from "@/components/atoms/Column";
import { ReactNode } from "react";

export const Page = ({
  children,
  className = "",
}: {
  children?: ReactNode;
  className?: string;
}) => {
  return (
    <Column className={`max-w-[800px] mx-auto pt-24 px-4 ${className}`}>
      {children}
    </Column>
  );
};
