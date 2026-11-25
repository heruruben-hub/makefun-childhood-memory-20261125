// A childhood memory, written as one sentence to /output/entry.txt.
//
// The sentence below was written for the make.fun competition
// "Make the AI Judge Feel Nostalgic: A Childhood Memory". It is a single
// sentence of 167 characters: a rainy evening, a grandmother's kitchen,
// a pot of rice, and glasses fogged blind by steam — one small, honest
// detail, and the warm ache of being nowhere but home.
import { mkdirSync, writeFileSync } from "node:fs";

const memory =
  "On rainy evenings my grandmother lifted the lid off the rice pot, and the steam fogged my glasses so completely that for one blind, warm second I was nowhere but home.";

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", memory, "utf8");
