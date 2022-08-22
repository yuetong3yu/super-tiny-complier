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
  const ops_arr: string[] = []
  const visitor: Visitor = {
    [NodeType.Program]: {
      enter() {
        ops_arr.push('Program Enter')
      },
      exit() {
        ops_arr.push('Program Exit')
      },
    },
    [NodeType.CallExpression]: {
      enter() {
        ops_arr.push('CallExpression Enter')
      },
      exit() {
        ops_arr.push('CallExpression Exit')
      },
    },
    [NodeType.NumberLiteral]: {
      enter() {
        ops_arr.push('Number Literal Enter')
      },
      exit() {
        ops_arr.push('Number Literal Exit')
      },
    },
  }

  traverser(ast, visitor)

  expect(ops_arr).toEqual([
    'Program Enter',
    'CallExpression Enter',
    'Number Literal Enter',
    'Number Literal Exit',
    'CallExpression Enter',
    'Number Literal Enter',
    'Number Literal Exit',
    'Number Literal Enter',
    'Number Literal Exit',
    'CallExpression Exit',
    'CallExpression Exit',
    'Program Exit',
  ])
})
