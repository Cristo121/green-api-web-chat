interface AlertProps {
  type: string;
  message: string;
  actions?: React.ReactNode[];
}

function Alert({ type, message, actions = [] }: AlertProps) {
  return (
    <div className={type}>
      <span>{message}</span>
      {actions.map((action) => action)}
    </div>
  );
}

export default Alert;
