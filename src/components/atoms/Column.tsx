import { ReactNode } from "react";

export const Column = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={`flex flex-col items-stretch ${className}`}>{children}</div>
  );
};
