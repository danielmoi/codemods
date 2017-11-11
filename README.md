# Codemods

## Usage
```
jscodeshift index.js -t destructure-require.js -dp
```

This will transform `index.js`, using `destructure-require.js` as the transformer.

It will be a dry run (no actual changes).

It will print the output to the terminal.


Sample output
```
Processing 1 files...
Spawning 1 workers...
Running in dry mode, no files will be written!
Sending 1 files to free worker...
const {
  logger
} = require('../../');

module.exports = logger;

All done.
Results:
0 errors
0 unmodified
0 skipped
1 ok
Time elapsed: 1.946seconds
```
