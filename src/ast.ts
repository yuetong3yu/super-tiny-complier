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

export function ast(tokens: Token[]): any {
  let p = 0
  let token = tokens[p]

  const rootNode: RootNode = createRootNode()

  if (token.type === TokenType.Number) {
    rootNode.body.push(createNumberNode(token.value))
  }

  if (token.type === TokenType.Paren && token.value === '(') {
    token = tokens[++p]
    const callExpressionNode = createExpressionNode(token.value)

    token = tokens[++p]
    while (token.type !== TokenType.Paren || token.value !== ')') {
      if (token.type === TokenType.Number) {
        const numberNode = createNumberNode(token.value)
        callExpressionNode.params.push(numberNode)
      }

      token = tokens[++p]
    }

    p++
    rootNode.body.push(callExpressionNode)
  }

  return rootNode
}
