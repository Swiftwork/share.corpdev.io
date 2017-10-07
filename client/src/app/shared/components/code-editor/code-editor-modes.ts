export interface ICodeEditorMode {
  name: string,
  caption: string,
  mode: string,
  extensions: string,
}

export const CODE_EDITOR_MODES: ICodeEditorMode[] = [
  {
    name: 'actionscript',
    caption: 'ActionScript',
    mode: 'ace/mode/actionscript',
    extensions: 'as',
  },
  {
    name: 'batchfile',
    caption: 'BatchFile',
    mode: 'ace/mode/batchfile',
    extensions: 'bat|cmd',
  },
  {
    name: 'c_cpp',
    caption: 'C and C++',
    mode: 'ace/mode/c_cpp',
    extensions: 'cpp|c|cc|cxx|h|hh|hpp|ino',
  },
  {
    name: 'clojure',
    caption: 'Clojure',
    mode: 'ace/mode/clojure',
    extensions: 'clj|cljs',
  },
  {
    name: 'coffee',
    caption: 'CoffeeScript',
    mode: 'ace/mode/coffee',
    extensions: 'coffee|cf|cson|^Cakefile',
  },
  {
    name: 'csharp',
    caption: 'C#',
    mode: 'ace/mode/csharp',
    extensions: 'cs',
  },
  {
    name: 'css',
    caption: 'CSS',
    mode: 'ace/mode/css',
    extensions: 'css',
  },
  {
    name: 'diff',
    caption: 'Diff',
    mode: 'ace/mode/diff',
    extensions: 'diff|patch',
  },
  {
    name: 'dockerfile',
    caption: 'Dockerfile',
    mode: 'ace/mode/dockerfile',
    extensions: '^Dockerfile',
  },
  {
    name: 'dummy',
    caption: 'Dummy',
    mode: 'ace/mode/dummy',
    extensions: 'dummy',
  },
  {
    name: 'ejs',
    caption: 'EJS',
    mode: 'ace/mode/ejs',
    extensions: 'ejs',
  },
  {
    name: 'gitignore',
    caption: 'Gitignore',
    mode: 'ace/mode/gitignore',
    extensions: '^.gitignore',
  },
  {
    name: 'glsl',
    caption: 'Glsl',
    mode: 'ace/mode/glsl',
    extensions: 'glsl|frag|vert',
  },
  {
    name: 'golang',
    caption: 'Go',
    mode: 'ace/mode/golang',
    extensions: 'go',
  },
  {
    name: 'groovy',
    caption: 'Groovy',
    mode: 'ace/mode/groovy',
    extensions: 'groovy',
  },
  {
    name: 'haml',
    caption: 'HAML',
    mode: 'ace/mode/haml',
    extensions: 'haml',
  },
  {
    name: 'handlebars',
    caption: 'Handlebars',
    mode: 'ace/mode/handlebars',
    extensions: 'hbs|handlebars|tpl|mustache',
  },
  {
    name: 'html',
    caption: 'HTML',
    mode: 'ace/mode/html',
    extensions: 'html|htm|xhtml',
  },
  {
    name: 'ini',
    caption: 'INI',
    mode: 'ace/mode/ini',
    extensions: 'ini|conf|cfg|prefs',
  },
  {
    name: 'jade',
    caption: 'Jade',
    mode: 'ace/mode/jade',
    extensions: 'jade|pug',
  },
  {
    name: 'java',
    caption: 'Java',
    mode: 'ace/mode/java',
    extensions: 'java',
  },
  {
    name: 'javascript',
    caption: 'JavaScript',
    mode: 'ace/mode/javascript',
    extensions: 'js|jsm|jsx',
  },
  {
    name: 'json',
    caption: 'JSON',
    mode: 'ace/mode/json',
    extensions: 'json',
  },
  {
    name: 'jsx',
    caption: 'JSX',
    mode: 'ace/mode/jsx',
    extensions: 'jsx',
  },
  {
    name: 'less',
    caption: 'LESS',
    mode: 'ace/mode/less',
    extensions: 'less',
  },
  {
    name: 'lua',
    caption: 'Lua',
    mode: 'ace/mode/lua',
    extensions: 'lua',
  },
  {
    name: 'makefile',
    caption: 'Makefile',
    mode: 'ace/mode/makefile',
    extensions: '^Makefile|^GNUmakefile|^makefile|^OCamlMakefile|make',
  },
  {
    name: 'markdown',
    caption: 'Markdown',
    mode: 'ace/mode/markdown',
    extensions: 'md|markdown',
  },
  {
    name: 'mysql',
    caption: 'MySQL',
    mode: 'ace/mode/mysql',
    extensions: 'mysql',
  },
  {
    name: 'objectivec',
    caption: 'Objective-C',
    mode: 'ace/mode/objectivec',
    extensions: 'm|mm',
  },
  {
    name: 'perl',
    caption: 'Perl',
    mode: 'ace/mode/perl',
    extensions: 'pl|pm',
  },
  {
    name: 'pgsql',
    caption: 'pgSQL',
    mode: 'ace/mode/pgsql',
    extensions: 'pgsql',
  },
  {
    name: 'php',
    caption: 'PHP',
    mode: 'ace/mode/php',
    extensions: 'php|phtml|shtml|php3|php4|php5|phps|phpt|aw|ctp|module',
  },
  {
    name: 'powershell',
    caption: 'Powershell',
    mode: 'ace/mode/powershell',
    extensions: 'ps1',
  },
  {
    name: 'python',
    caption: 'Python',
    mode: 'ace/mode/python',
    extensions: 'py',
  },
  {
    name: 'r',
    caption: 'R',
    mode: 'ace/mode/r',
    extensions: 'r',
  },
  {
    name: 'razor',
    caption: 'Razor',
    mode: 'ace/mode/razor',
    extensions: 'cshtml|asp',
  },
  {
    name: 'ruby',
    caption: 'Ruby',
    mode: 'ace/mode/ruby',
    extensions: 'rb|ru|gemspec|rake|^Guardfile|^Rakefile|^Gemfile',
  },
  {
    name: 'sass',
    caption: 'SASS',
    mode: 'ace/mode/sass',
    extensions: 'sass',
  },
  {
    name: 'scss',
    caption: 'SCSS',
    mode: 'ace/mode/scss',
    extensions: 'scss',
  },
  {
    name: 'sh',
    caption: 'SH',
    mode: 'ace/mode/sh',
    extensions: 'sh|bash|^.bashrc',
  },
  {
    name: 'soy_template',
    caption: 'Soy Template',
    mode: 'ace/mode/soy_template',
    extensions: 'soy',
  },
  {
    name: 'sql',
    caption: 'SQL',
    mode: 'ace/mode/sql',
    extensions: 'sql',
  },
  {
    name: 'stylus',
    caption: 'Stylus',
    mode: 'ace/mode/stylus',
    extensions: 'styl|stylus',
  },
  {
    name: 'svg',
    caption: 'SVG',
    mode: 'ace/mode/svg',
    extensions: 'svg',
  },
  {
    name: 'swift',
    caption: 'Swift',
    mode: 'ace/mode/swift',
    extensions: 'swift',
  },
  {
    name: 'text',
    caption: 'Text',
    mode: 'ace/mode/text',
    extensions: 'txt',
  },
  {
    name: 'textile',
    caption: 'Textile',
    mode: 'ace/mode/textile',
    extensions: 'textile',
  },
  {
    name: 'tsx',
    caption: 'TSX',
    mode: 'ace/mode/tsx',
    extensions: 'tsx',
  },
  {
    name: 'typescript',
    caption: 'Typescript',
    mode: 'ace/mode/typescript',
    extensions: 'ts|typescript|str',
  },
  {
    name: 'vbscript',
    caption: 'VBScript',
    mode: 'ace/mode/vbscript',
    extensions: 'vbs|vb',
  },
  {
    name: 'xml',
    caption: 'XML',
    mode: 'ace/mode/xml',
    extensions: 'xml|rdf|rss|wsdl|xslt|atom|mathml|mml|xul|xbl|xaml',
  },
  {
    name: 'yaml',
    caption: 'YAML',
    mode: 'ace/mode/yaml',
    extensions: 'yaml|yml',
  },
];