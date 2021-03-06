const {
  generateExtension,
  firefox,
  print,
  setEnv,
} = require('./util');

setEnv('build', 'webstore');
setEnv('audience', 'internal');
setEnv('gitinfo', 'yes');

// --- Firefox ---
generateExtension(firefox)
  .catch((err) => { print(err); });
