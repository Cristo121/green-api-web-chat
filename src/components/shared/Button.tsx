interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  label?: string;
}

function Button({ label, icon, children, className, ...props }: ButtonProps) {
  return (
    <button
      className={[
        className,
        "bg-emerald-600 hover:bg-emerald-700 text-white-100 px-4 rounded-2xl px-8 py-3 dark:text-emerald-100 font-semibold",
        "hover:font-bold shadow-md cursor-pointer",
      ].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
