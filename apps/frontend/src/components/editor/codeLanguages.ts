import { createLowlight } from 'lowlight';
import bash from 'highlight.js/lib/languages/bash';
import c from 'highlight.js/lib/languages/c';
import cpp from 'highlight.js/lib/languages/cpp';
import csharp from 'highlight.js/lib/languages/csharp';
import css from 'highlight.js/lib/languages/css';
import diff from 'highlight.js/lib/languages/diff';
import dockerfile from 'highlight.js/lib/languages/dockerfile';
import go from 'highlight.js/lib/languages/go';
import ini from 'highlight.js/lib/languages/ini';
import java from 'highlight.js/lib/languages/java';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import lua from 'highlight.js/lib/languages/lua';
import markdown from 'highlight.js/lib/languages/markdown';
import nginx from 'highlight.js/lib/languages/nginx';
import php from 'highlight.js/lib/languages/php';
import plaintext from 'highlight.js/lib/languages/plaintext';
import powershell from 'highlight.js/lib/languages/powershell';
import python from 'highlight.js/lib/languages/python';
import ruby from 'highlight.js/lib/languages/ruby';
import rust from 'highlight.js/lib/languages/rust';
import scss from 'highlight.js/lib/languages/scss';
import sql from 'highlight.js/lib/languages/sql';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import yaml from 'highlight.js/lib/languages/yaml';

/**
 * Destaque de sintaxe do bloco de código.
 *
 * Fica tudo no cliente e a linguagem escolhida viaja dentro do próprio conteúdo
 * da nota (`<pre><code class="language-ts">`), que o backend já salva cru — não
 * há nada a mudar no banco nem na API.
 *
 * As linguagens são registradas uma a uma em vez do preset `common` do lowlight:
 * `common` traz ~35 gramáticas e dobraria o chunk do editor.
 */
export const lowlight = createLowlight();

/** `value` é o nome usado no lowlight e na classe `language-…`. */
export const CODE_LANGUAGES: ReadonlyArray<{ value: string; label: string }> = [
  { value: 'plaintext', label: 'Texto simples' },
  { value: 'bash', label: 'Bash / Shell' },
  { value: 'c', label: 'C' },
  { value: 'cpp', label: 'C++' },
  { value: 'csharp', label: 'C#' },
  { value: 'css', label: 'CSS' },
  { value: 'diff', label: 'Diff' },
  { value: 'dockerfile', label: 'Dockerfile' },
  { value: 'go', label: 'Go' },
  { value: 'ini', label: 'INI / TOML' },
  { value: 'java', label: 'Java' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'json', label: 'JSON' },
  { value: 'lua', label: 'Lua' },
  { value: 'markdown', label: 'Markdown' },
  { value: 'nginx', label: 'Nginx' },
  { value: 'php', label: 'PHP' },
  { value: 'powershell', label: 'PowerShell' },
  { value: 'python', label: 'Python' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'rust', label: 'Rust' },
  { value: 'scss', label: 'SCSS' },
  { value: 'sql', label: 'SQL' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'xml', label: 'HTML / XML' },
  { value: 'yaml', label: 'YAML' },
];

lowlight.register({
  bash,
  c,
  cpp,
  csharp,
  css,
  diff,
  dockerfile,
  go,
  ini,
  java,
  javascript,
  json,
  lua,
  markdown,
  nginx,
  php,
  plaintext,
  powershell,
  python,
  ruby,
  rust,
  scss,
  sql,
  typescript,
  xml,
  yaml,
});

// Apelidos: conteúdo colado de fora costuma vir com `language-ts`, `language-html`…
lowlight.registerAlias({
  bash: ['sh', 'shell', 'zsh', 'console'],
  csharp: ['cs'],
  ini: ['toml'],
  javascript: ['js', 'jsx', 'mjs', 'cjs'],
  markdown: ['md'],
  plaintext: ['text', 'txt'],
  python: ['py'],
  typescript: ['ts', 'tsx'],
  xml: ['html', 'vue', 'svg'],
  yaml: ['yml'],
});

export const DEFAULT_CODE_LANGUAGE = 'plaintext';

/** Rótulo para exibir na barra do bloco (aceita apelidos e valores legados). */
export function codeLanguageLabel(language?: string | null): string {
  if (!language) return 'Texto simples';
  const known = CODE_LANGUAGES.find(l => l.value === language);
  return known ? known.label : language;
}
