import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines and merges class names with Tailwind CSS classes efficiently
 * using clsx for conditional class combinations and tailwind-merge to resolve conflicts.
 */
export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
} 