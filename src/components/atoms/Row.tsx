import { ReactNode } from "react";

export const Row = ({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) => {
  return <div className={`flex flex-row ${className}`}>{children}</div>;
};
