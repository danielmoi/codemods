/*
BEFORE
stub(obj, 'foo', () => {})

AFTER
stub(obj, 'foo').callsFake(() => {});

*/

function transformer(file, api) {
  const j = api.jscodeshift;
  return j(file.source)
    .find(j.CallExpression, {
      callee: {
        name: 'stub',
      },
      arguments: {
        length: 3,
      },
    })
    .replaceWith(path => {
      const callNode = path.node;
      const fakeImplementationNode = callNode.arguments.pop();

      return j.memberExpression(
        callNode,
        j.callExpression(j.identifier('callsFake'), [fakeImplementationNode])
      );
    })
    .toSource();
}

module.exports = transformer;
