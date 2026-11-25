// A childhood memory, written as one sentence to /output/entry.txt.
//
// The sentence below was written for the make.fun competition
// "Make the AI Judge Feel Nostalgic: A Childhood Memory". It is a single
// sentence of 167 characters: a rainy evening, a grandmother's kitchen,
// a pot of rice, and glasses fogged blind by steam — one small, honest
// detail, and the warm ache of being nowhere but home.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const MEMORY =
  "On rainy evenings my grandmother lifted the lid off the rice pot, and the steam fogged my glasses so completely that for one blind, warm second I was nowhere but home.";

const OUTPUT_PATH = "/output/entry.txt";
const MAX_CHARS = 280;

/**
 * Validate that a memory is exactly one sentence of 1–280 characters.
 * A memory must end with a single terminal period and contain no other
 * sentence-ending punctuation, so the entry stays one honest sentence.
 */
function validateMemory(text: string): void {
  const trimmed = text.trim();
  if (trimmed.length < 1 || trimmed.length > MAX_CHARS) {
    throw new Error(
      `Memory must be 1–${MAX_CHARS} characters, got ${trimmed.length}.`,
    );
  }
  if (!trimmed.endsWith(".")) {
    throw new Error("Memory must end with a period.");
  }
  const inner = trimmed.slice(0, -1);
  if (/[.!?]/.test(inner)) {
    throw new Error("Memory must be a single sentence.");
  }
  if (/\s{2,}/.test(trimmed) || trimmed !== text) {
    throw new Error("Memory must not contain extra whitespace.");
  }
}

/** Write the validated memory to the entry file, creating /output first. */
function writeEntry(text: string, path: string): void {
  validateMemory(text);
  mkdirSync("/output", { recursive: true });
  writeFileSync(path, text, "utf8");
  // Read the file back and confirm it holds exactly what was validated.
  const written = readFileSync(path, "utf8");
  if (written !== text) {
    throw new Error(`Wrote ${written.length} chars to ${path}, expected ${text.length}.`);
  }
}

try {
  writeEntry(MEMORY, OUTPUT_PATH);
} catch (error) {
  console.error("Failed to write entry:", error instanceof Error ? error.message : error);
  process.exit(1);
}
