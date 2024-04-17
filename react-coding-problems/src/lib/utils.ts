import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** generates unique id */
export function generateId() {
  // Combine timestamp and random number
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 7);
}
