import { FormEvent, ReactNode } from "react";

interface FormProps {
  children: ReactNode;
  className?: string;
  autoComplete?: string;
  enctype?: string;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
}

export default function Form({
  children,
  className,
  onSubmit,
  autoComplete,
  enctype,
  ...other
}: FormProps) {
  return (
    <form
      encType={enctype}
      {...other}
      className={className}
      onSubmit={onSubmit}
      autoComplete={autoComplete}
    >
      {children}
    </form>
  );
}
