module.exports = {
  'extends': 'stylelint-config-standard',
  'rules': {
    /* Selectors */
    'selector-list-comma-newline-after': 'never-multi-line',
    'selector-list-comma-space-after': 'always-single-line',

    /* Prefixes */
    'at-rule-no-vendor-prefix': true,
    'media-feature-name-no-vendor-prefix': true,
    'property-no-vendor-prefix': true,
    'selector-no-vendor-prefix': true,
    'value-no-vendor-prefix': true,

    /* Custom */
    'block-no-empty': null,
    'unit-no-unknown': [true, { ignoreUnits: ['vr'] }],
    'selector-type-no-unknown': [
      true,
      {
        'ignoreTypes': [
          '/deep/'
        ]
      }
    ]
  }
};
