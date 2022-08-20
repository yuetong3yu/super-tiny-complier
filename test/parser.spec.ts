import { expect, it } from 'vitest'
import { parser, NodeType, TokenType } from '../src'

import type { Token } from '../src'

it('AST', () => {
  const tokens: Token[] = [
    { type: TokenType.Paren, value: '(' },
    { type: TokenType.Name, value: 'add' },
    { type: TokenType.Number, value: '2' },
    { type: TokenType.Paren, value: '(' },
    { type: TokenType.Name, value: 'subtract' },
    { type: TokenType.Number, value: '4' },
    { type: TokenType.Number, value: '2' },
    { type: TokenType.Paren, value: ')' },
    { type: TokenType.Paren, value: ')' },
  ]
  const ast_result = {
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

  expect(parser(tokens)).toEqual(ast_result)
})

it('Number Literal', () => {
  const token: Token[] = [
    {
      type: TokenType.Number,
      value: '2',
    },
  ]

  expect(parser(token)).toEqual({
    type: 'Program',
    body: [
      {
        type: 'NumberLiteral',
        value: '2',
      },
    ],
  })
})

it('Call Expression', () => {
  const tokens: Token[] = [
    {
      type: TokenType.Paren,
      value: '(',
    },
    {
      type: TokenType.Name,
      value: 'add',
    },
    {
      type: TokenType.Number,
      value: '2',
    },
    {
      type: TokenType.Number,
      value: '4',
    },
    {
      type: TokenType.Paren,
      value: ')',
    },
  ]
  const ast_result = {
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
            type: NodeType.NumberLiteral,
            value: '4',
          },
        ],
      },
    ],
  }
  expect(parser(tokens)).toEqual(ast_result)
})

it('Two Call Expressions', () => {
  const tokens: Token[] = [
    {
      type: TokenType.Paren,
      value: '(',
    },
    {
      type: TokenType.Name,
      value: 'add',
    },
    {
      type: TokenType.Number,
      value: '2',
    },
    {
      type: TokenType.Number,
      value: '4',
    },
    {
      type: TokenType.Paren,
      value: ')',
    },
    {
      type: TokenType.Paren,
      value: '(',
    },
    {
      type: TokenType.Name,
      value: 'add',
    },
    {
      type: TokenType.Number,
      value: '5',
    },
    {
      type: TokenType.Number,
      value: '4',
    },
    {
      type: TokenType.Paren,
      value: ')',
    },
  ]
  const ast_result = {
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
            type: NodeType.NumberLiteral,
            value: '4',
          },
        ],
      },
      {
        type: NodeType.CallExpression,
        name: 'add',
        params: [
          {
            type: NodeType.NumberLiteral,
            value: '5',
          },
          {
            type: NodeType.NumberLiteral,
            value: '4',
          },
        ],
      },
    ],
  }

  expect(parser(tokens)).toEqual(ast_result)
})
