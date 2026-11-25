// One Line, One Laugh — make.fun entry (program/v1, Node 22, stdlib only).
// Writes a single original funny line to <output-dir>/entry.txt.
// Deterministic: no input, no randomness, no network, no timestamps.
// The joke is a rule-of-three escalation: slippers, mail, then the neighbor
// himself — the turn lands on the last two words.
//
// Outside the grader's container, pass an output directory:
//   node main.ts ./output

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: one original line, kept as a named constant so it stays
// byte-identical across runs and edits. No trailing newline is written.
const ENTRY =
  "I taught my dog to fetch, and now he brings me the neighbor's slippers, the neighbor's mail, and — yesterday — the neighbor.";

const MAX_ENTRY_CHARS = 200;

// Gate guard: the competition requires /output/entry.txt to be UTF-8 text
// of 1 to 200 characters, not only whitespace, and a single line.
if (ENTRY.length < 1 || ENTRY.length > MAX_ENTRY_CHARS || ENTRY.trim().length === 0) {
  throw new Error(`Entry must be 1-${MAX_ENTRY_CHARS} characters, got ${ENTRY.length}`);
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("Entry must be a single line");
}

const outDir = process.argv[2] ?? process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
