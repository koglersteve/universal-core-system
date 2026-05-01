import Link from "next/link";
import type { Joke } from "@/types/jokes";

export function JokeCard({ joke }: { joke: Joke }) {
  return (
    <Link href={`/jokes/${joke.id}`}>
      <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
        <p>{joke.text}</p>
      </div>
    </Link>
  );
}
