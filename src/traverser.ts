import { RootNode, ChildNode, NodeType, CallExpressionNode } from './parser'

export interface Visitor {
  Program?: VisitorOption
  NumberLiteral?: VisitorOption
  CallExpression?: VisitorOption
}

export type VisitorOption = {
  enter(): void
  exit(): void
}

export function traverser(ast: RootNode, visitor: Visitor) {
  function dfs(arr: ChildNode[]) {
    arr.forEach((node) => {
      traverse(node)
    })
  }

  function traverse(node: ChildNode | RootNode) {
    // before
    const visitorObj = visitor[node.type]
    if (visitorObj) {
      visitorObj.enter()
    }

    switch (node.type) {
      case NodeType.Program: {
        dfs((node as RootNode).body)
        break
      }
      case NodeType.CallExpression: {
        dfs((node as CallExpressionNode).params)
        break
      }
      case NodeType.NumberLiteral: {
        console.log('1234 number', node.value)
        break
      }
    }

    if (visitorObj) {
      visitorObj.exit()
    }
  }

  traverse(ast)
}
