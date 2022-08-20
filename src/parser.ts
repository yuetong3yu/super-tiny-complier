import { Token, TokenType } from './index'

export enum NodeType {
  Program = 'Program',
  NumberLiteral = 'NumberLiteral',
  CallExpression = 'CallExpression',
}

export interface BaseNode {
  type: NodeType
}

export type ChildNode = NumberNode | CallExpressionNode

export interface RootNode extends BaseNode {
  type: NodeType.Program
  body: ChildNode[]
}

export interface NumberNode extends BaseNode {
  value: string
}

export interface CallExpressionNode extends BaseNode {
  type: NodeType.CallExpression
  name: string
  params: ChildNode[]
}

function createRootNode(): RootNode {
  return {
    type: NodeType.Program,
    body: [],
  }
}

function createNumberNode(value: string): NumberNode {
  return {
    type: NodeType.NumberLiteral,
    value,
  }
}

function createExpressionNode(name: string): CallExpressionNode {
  return {
    type: NodeType.CallExpression,
    name,
    params: [],
  }
}

export function parser(tokens: Token[]): any {
  let p = 0
  const rootNode: RootNode = createRootNode()

  function traverse(): ChildNode {
    let token = tokens[p]
    if (token.type === TokenType.Number) {
      p++
      return createNumberNode(token.value)
    }

    if (token.type === TokenType.Paren && token.value === '(') {
      token = tokens[++p]
      const callExpressionNode = createExpressionNode(token.value)
      token = tokens[++p]
      while (!(token.type === TokenType.Paren && token.value === ')')) {
        callExpressionNode.params.push(traverse())
        token = tokens[p]
      }

      p++
      return callExpressionNode
    }

    throw new Error('Can not identify the token type!')
  }

  while (p < tokens.length) {
    rootNode.body.push(traverse())
  }

  return rootNode
}
