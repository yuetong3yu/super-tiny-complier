interface Token {
  type: string
  value: string
}

export function tokenlizer(code: string): Token[] {
  const tokens: Token[] = []
  let p = 0
  const NUMBERS = /[0-9]/i
  const ALPHAS = /[a-zA-Z]/i

  while (p < code.length) {
    let char = code[p]

    if (/\s/.test(char)) {
      p++
      continue
    }

    if (char === '(') {
      tokens.push({
        type: 'paren',
        value: char,
      })
      p++
      continue
    }

    if (char === ')') {
      tokens.push({
        type: 'paren',
        value: ')',
      })
      p++
      continue
    }

    if (ALPHAS.test(char)) {
      let value = ''
      while (ALPHAS.test(char) && p < code.length) {
        value += char
        char = code[++p]
      }
      tokens.push({
        type: 'name',
        value,
      })
      continue
    }

    if (NUMBERS.test(char)) {
      let value = ''
      while (NUMBERS.test(char) && p < code.length) {
        value += char
        char = code[++p]
      }
      tokens.push({
        type: 'number',
        value,
      })
      continue
    }
  }

  return tokens
}
