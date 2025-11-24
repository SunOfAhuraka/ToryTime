import React from "react";

const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseStyle =
    "px-6 py-3 rounded-2xl font-bold transition-transform active:scale-95 shadow-md flex items-center justify-center gap-2";

  const variants = {
    primary: "bg-brand-primary text-white hover:opacity-90",
    secondary: "bg-brand-secondary text-white hover:opacity-90",
    outline:
      "border-2 border-brand-primary text-brand-primary bg-transparent hover:bg-brand-primary/10",
    ghost: "bg-transparent text-brand-text hover:bg-black/5 shadow-none",
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
