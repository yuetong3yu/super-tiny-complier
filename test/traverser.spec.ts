import { expect, it } from 'vitest'
import { NodeType, traverser } from '../src'

it('👍 Complete Traverse', () => {
  const ast = {
    type: 'Program',
    body: [
      {
        type: 'CallExpression',
        name: 'add',
        params: [
          {
            type: 'NumberLiteral',
            value: '2',
          },
          {
            type: 'CallExpression',
            name: 'subtract',
            params: [
              {
                type: 'NumberLiteral',
                value: '4',
              },
              {
                type: 'NumberLiteral',
                value: '2',
              },
            ],
          },
        ],
      },
    ],
  }
  const ops_arr: string[] = []
  const operations = {
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

  traverser()

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
