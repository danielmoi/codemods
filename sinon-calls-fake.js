/*
BEFORE
sinon.stub(obj, 'foo', () => {})

AFTER
sinon.stub(obj, 'foo').callsFake(() => {});









*/
function transformer(file, api) {
  const j = api.jscodeshift;
  return j(file.source)
    .find(j.CallExpression, {
      callee: {
        object: {
          name: 'sinon',
        },
        property: {
          name: 'stub',
        },
      },
      arguments: {
        length: 3,
      },
    })
    .replaceWith(path => {
      const callNode = path.node;
      const fakeImplementationNode = callNode.arguments.pop();
      // sinon.stub(obj, 'foo', function () { return 'boom'; })
      // sinon.stub(obj, 'foo', () => {})
      return j.memberExpression(
        callNode,
        j.callExpression(j.identifier('callsFake'), [fakeImplementationNode])
      );
    })
    .toSource();
}

module.exports = transformer;
