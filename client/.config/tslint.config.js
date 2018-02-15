module.exports = {
  'extends': 'tslint-config-standard',
  'rules': {
    'arrow-return-shorthand': [true],
    'comment-format': false,
    'curly': false,
    'interface-name': [true, 'always-prefix'],
    'member-ordering': false,
    'no-empty': false,
    'no-unused-variable': false,
    'ordered-imports': true,
    'semicolon': [true, 'always', 'ignore-interfaces'],
    'space-before-function-paren': [true, 'never'],
    'strict-type-predicates': false,
    'trailing-comma': [true, { 'multiline': 'always', 'singleline': 'never' }],
  }
};
