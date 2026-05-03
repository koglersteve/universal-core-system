export default function CollabIcon(props: any) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
    >
      <circle cx="8" cy="8" r="3" />
      <circle cx="16" cy="8" r="3" />
      <path d="M4 20c0-3 2-5 4-5s4 2 4 5" />
      <path d="M12 20c0-3 2-5 4-5s4 2 4 5" />
    </svg>
  );
}
