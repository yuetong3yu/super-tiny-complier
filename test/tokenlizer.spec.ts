import { expect, it } from 'vitest'
import { tokenlizer } from '../src'

it('tokenlizer', () => {
  const code = `(add 2 (subtract 4 2))`
  const tokens = [
    { type: 'paren', value: '(' },
    { type: 'name', value: 'add' },
    { type: 'number', value: '2' },
    { type: 'paren', value: '(' },
    { type: 'name', value: 'subtract' },
    { type: 'number', value: '4' },
    { type: 'number', value: '2' },
    { type: 'paren', value: ')' },
    { type: 'paren', value: ')' },
  ]

  expect(tokenlizer(code)).toEqual(tokens)
})

it('Left Parenthesis', () => {
  expect(tokenlizer('(')).toEqual([
    {
      type: 'paren',
      value: '(',
    },
  ])
})

it('Operator Name', () => {
  expect(tokenlizer('add')).toEqual([
    {
      type: 'name',
      value: 'add',
    },
  ])
  expect(tokenlizer('substract')).toEqual([
    {
      type: 'name',
      value: 'substract',
    },
  ])
})

it('Number', () => {
  expect(tokenlizer('2')).toEqual([
    {
      type: 'number',
      value: '2',
    },
  ])
  expect(tokenlizer('2 21')).toEqual([
    {
      type: 'number',
      value: '2',
    },
    {
      type: 'number',
      value: '21',
    },
  ])
})
