import github from 'eslint-plugin-github'

export default [
    github.getFlatConfigs().browser,
    github.getFlatConfigs().recommended,
    {
        files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
        ignores: ['eslint.config.mjs'],
        rules: {
            'github/array-foreach': 'error',
            'github/async-preventdefault': 'warn',
            'github/no-then': 'error',
            'github/no-blur': 'error',
            'prettier/prettier': 'off',
        }
    },
    {
        files: ["**/*.test.js"],
        rules: {
            "import/named": "off",
        },
  },
]