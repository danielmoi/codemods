// Press ctrl+space for code completion
function transformer(file, api) {
  const j = api.jscodeshift;

  const root = j(file.source);

  const generateProperty = (propertyName) => {
    const property = j.property(
      'init',
      j.identifier(propertyName),
      j.identifier(propertyName));
    property.shorthand = true;
    return property;
  };

  const generateId = propertyName => j.objectPattern([
    generateProperty(propertyName),
  ]);

  return root
    .find(j.VariableDeclarator, {
      init: {
        type: 'MemberExpression',
        object: {
          type: 'CallExpression',
          callee: {
            type: 'Identifier',
            name: 'require',
          },
        },
      },
    })
    .replaceWith((path) => {
      const callNode = path.node;
      const propertyName = callNode.init.property.name;
      const val = callNode.init.object;
      return j.variableDeclarator(generateId(propertyName), val);
    })
    .toSource();
}

module.exports = transformer;

