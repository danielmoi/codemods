# Codemods

## Usage
```
jscodeshift index.js -t destructure-require.js -dp
```

This will transform `index.js`, using `destructure-require.js` as the transformer.
It will be a dry run (no actual changes)
It will print the output to the terminal
