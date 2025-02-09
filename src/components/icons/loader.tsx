export default function LoaderIcon() {
  return (
    <svg
      className="animate-spin h-8 w-8 text-green-500"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="opacity-25"
        cx="25"
        cy="25"
        r="20"
        stroke="currentColor"
        strokeWidth="5"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M25 5a20 20 0 0 1 20 20h-5a15 15 0 0 0-15-15V5z"
      />
    </svg>
  );
}
