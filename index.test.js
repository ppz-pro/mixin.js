// 在“树”结构中，根结点有子节点，没父节点；叶子节点有父节点，没子节点；中间的，父节点、子节点都有
const mixin = require('./index')

function Parent() {
  this.children = []
}
test('simple', () => {
  function RootTreeNode() {
    mixin(this, Parent)
  }
  const node = new RootTreeNode()

  expect(
    node._mixin(Parent)
  ).toBe(true)
  expect(
    node._mixin(RootTreeNode)
  ).toBe(false)

  expect(
    node.children
  ).toEqual([])
})

function Child(parent) {
  this.parent = parent
}
test('arguments', () => {
  function LeafTreeNode(parent) {
    mixin(this, Child, [parent])
  }
  const node = new LeafTreeNode('parent')

  expect(
    node._mixin(Child)
  ).toBe(true)

  expect(
    node.parent
  ).toBe('parent')
})

test('multi mixin', () => {
  function ChildTreeNode(parent) {
    mixin(this, Parent)
    mixin(this, Child, [parent])
  }
  const node = new ChildTreeNode('parent')

  expect(
    node._mixin(Parent)
  ).toBe(true)
  expect(
    node._mixin(Child)
  ).toBe(true)
  expect(
    node._mixin(ChildTreeNode)
  ).toBe(false)

  expect(
    node.parent
  ).toBe('parent')
  expect(
    node.children
  ).toEqual([])
})
