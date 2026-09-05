#!/usr/bin/env node
/**
 * Scans staged files for strings that look like API keys or secrets.
 * Blocks the commit if it finds one. Not a substitute for .gitignore --
 * this is the safety net for when someone pastes a key into a file
 * that IS tracked (e.g. accidentally into a screen component).
 */
const { execSync } = require('child_process');

const patterns = [
  { name: 'OpenAI-style key', regex: /sk-[a-zA-Z0-9]{20,}/ },
  { name: 'Google API key', regex: /AIza[0-9A-Za-z\-_]{35}/ },
  { name: 'Supabase service role JWT', regex: /eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9[a-zA-Z0-9._-]{40,}/ },
  { name: 'Generic secret assignment', regex: /(api|secret|private)[_-]?key\s*[:=]\s*['"][a-zA-Z0-9_\-]{16,}['"]/i },
  { name: 'AWS access key', regex: /AKIA[0-9A-Z]{16}/ },
];

const stagedFiles = execSync('git diff --cached --name-only --diff-filter=ACM')
  .toString()
  .trim()
  .split('\n')
  .filter(Boolean)
  .filter((f) => !f.includes('node_modules'))
  .filter((f) => f !== '.env.example' && !f.endsWith('scan-secrets.js'));

let found = false;

for (const file of stagedFiles) {
  let content;
  try {
    content = execSync(`git show :${file}`).toString();
  } catch {
    continue; // binary or unreadable file, skip
  }
  for (const { name, regex } of patterns) {
    if (regex.test(content)) {
      console.error(`\n🚫 Possible ${name} found in ${file}`);
      found = true;
    }
  }
  if (/^\.env$/.test(file) || /^\.env\.[^.]+$/.test(file)) {
    console.error(`\n🚫 You're trying to commit ${file} -- this should never be tracked.`);
    found = true;
  }
}

if (found) {
  console.error('\nCommit blocked. Remove the secret (or add the file to .gitignore) and try again.\n');
  process.exit(1);
}
