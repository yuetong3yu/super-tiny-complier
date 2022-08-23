import { expect, it } from 'vitest'
import { NodeType, traverser, Visitor, RootNode } from '../src'

it('👍 Complete Traverse', () => {
  const ast: RootNode = {
    type: NodeType.Program,
    body: [
      {
        type: NodeType.CallExpression,
        name: 'add',
        params: [
          {
            type: NodeType.NumberLiteral,
            value: '2',
          },
          {
            type: NodeType.CallExpression,
            name: 'subtract',
            params: [
              {
                type: NodeType.NumberLiteral,
                value: '4',
              },
              {
                type: NodeType.NumberLiteral,
                value: '2',
              },
            ],
          },
        ],
      },
    ],
  }
  const ops_arr: any[] = []
  const visitor: Visitor = {
    [NodeType.Program]: {
      enter(node, parent) {
        ops_arr.push(['Program Enter', node.type, ''])
      },
      exit(node, parent) {
        ops_arr.push(['Program Exit', node.type, ''])
      },
    },
    [NodeType.CallExpression]: {
      enter(node, parent) {
        ops_arr.push(['CallExpression Enter', node.type, parent.type])
      },
      exit(node, parent) {
        ops_arr.push(['CallExpression Exit', node.type, parent.type])
      },
    },
    [NodeType.NumberLiteral]: {
      enter(node, parent) {
        ops_arr.push(['Number Literal Enter', node.type, parent.type])
      },
      exit(node, parent) {
        ops_arr.push(['Number Literal Exit', node.type, parent.type])
      },
    },
  }

  traverser(ast, visitor)

  expect(ops_arr).toEqual([
    ['Program Enter', NodeType.Program, ''],
    ['CallExpression Enter', NodeType.CallExpression, NodeType.Program],
    ['Number Literal Enter', NodeType.NumberLiteral, NodeType.CallExpression],
    ['Number Literal Exit', NodeType.NumberLiteral, NodeType.CallExpression],
    ['CallExpression Enter', NodeType.CallExpression, NodeType.CallExpression],
    ['Number Literal Enter', NodeType.NumberLiteral, NodeType.CallExpression],
    ['Number Literal Exit', NodeType.NumberLiteral, NodeType.CallExpression],
    ['Number Literal Enter', NodeType.NumberLiteral, NodeType.CallExpression],
    ['Number Literal Exit', NodeType.NumberLiteral, NodeType.CallExpression],
    ['CallExpression Exit', NodeType.CallExpression, NodeType.CallExpression],
    ['CallExpression Exit', NodeType.CallExpression, NodeType.Program],
    ['Program Exit', NodeType.Program, ''],
  ])
})
