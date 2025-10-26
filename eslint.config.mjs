import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';

export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
    ignores: ['*.config.mjs', '*.config.js', 'node_modules', 'dist'],
  },
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error', // Prévenir les conflits avec Prettier
      '@typescript-eslint/no-floating-promises': 'error', // Interdit les promesses non gérées
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ], // Interdit les variables inutilisées sauf celles commençant par _
      '@typescript-eslint/no-explicit-any': 'warn', // Interdit any
      '@typescript-eslint/explicit-function-return-type': 'warn', // Encourage la déclaration explicite du type de retour des fonctions
      // 'no-console': 'warn', // Interdit console.log
      'no-var': 'error', // Interdit var
      'prefer-const': 'error', // Encourage l'utilisation de const
      'prefer-destructuring': 'error', // Encourage l'utilisation de la déstructuration
    },
  }
);
