import { Token, TokenType } from './index'

export enum NodeType {
  Program = 'Program',
  NumberLiteral = 'NumberLiteral',
  CallExpression = 'CallExpression',
}

export interface BaseNode {
  type: NodeType
}

export interface RootNode extends BaseNode {
  type: NodeType.Program
  body: BaseNode[]
}

export interface NumberNode extends BaseNode {
  value: string
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

export function ast(tokens: Token[]): any {
  let p = 0
  let token = tokens[p]

  const rootNode: RootNode = createRootNode()

  while (p < tokens.length) {
    if (token.type === TokenType.Number) {
      rootNode.body.push(createNumberNode(token.value))
    }
    p++
    continue
  }

  return rootNode
}
