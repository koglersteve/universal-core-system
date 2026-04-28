import { Joke, Category } from "./lafflab.types";

export const categories: Category[] = [
  { id: "general", name: "General" },
  { id: "animals", name: "Animals" },
  { id: "tech", name: "Tech" },
];

export const jokes: Joke[] = [
  { id: "1", text: "Why did the chicken join a band? Because it had drumsticks!", category: "animals" },
  { id: "2", text: "I told my computer I needed a break, and it said 'No problem — I'll go to sleep.'", category: "tech" },
  { id: "3", text: "I'm reading a book on anti-gravity. It's impossible to put down.", category: "general" },
];
