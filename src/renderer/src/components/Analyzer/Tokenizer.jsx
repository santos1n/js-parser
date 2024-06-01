// Token types enumeration
export const TokenType = {
  WHITESPACE: 'WHITESPACE',
  NUMBER: 'NUMBER',
  IDENTIFIER: 'IDENTIFIER',
  ASSIGNMENT: '=',
  ADDITION: '+',
  SUBTRACTION: '-',
  MULTIPLICATION: '*',
  DIVISION: '/',
  EXPONENTIATION: '^',
  PARENTHESIS_LEFT: '(',
  PARENTHESIS_RIGHT: ')',
  DELIMITER: ';'
}

// Regular expressions for token types
const TokenMap = [
  [/^\s+/, TokenType.WHITESPACE],
  [/^(?:\d+(?:\.\d*)?|\.\d+)/, TokenType.NUMBER],
  [/^[a-zA-Z_]\w*/, TokenType.IDENTIFIER],
  [/^\=/, TokenType.ASSIGNMENT],
  [/^\+/, TokenType.ADDITION],
  [/^\-/, TokenType.SUBTRACTION],
  [/^\*/, TokenType.MULTIPLICATION],
  [/^\//, TokenType.DIVISION],
  [/^\(/, TokenType.PARENTHESIS_LEFT],
  [/^\)/, TokenType.PARENTHESIS_RIGHT]
]

export function Tokenizer(inputString) {
  let string = inputString
  let cursor = 0

  const init = (inputString) => {
    string = inputString
    cursor = 0
  }

  //Check if cursor at end
  const isEnd = () => {
    return cursor === string.length
  }

  //Check String Lenght
  const checkTokens = () => {
    return cursor < string.length
  }

  //Check next Tokens to parse
  const nextToken = () => {
    // Skip whitespace tokens
    while (checkTokens()) {
      const subString = string.slice(cursor)
      const matchedWhitespace = match(/^\s+/, subString)
      if (matchedWhitespace) {
        cursor += matchedWhitespace.length
      } else {
        break // Exit the loop if no whitespace token is found
      }
    }

    if (!checkTokens()) {
      return null // Return null if there are no more tokens
    }

    const subString = string.slice(cursor)

    for (let [regex, tokenType] of TokenMap) {
      const tokenValue = match(regex, subString)

      if (tokenValue != null) {
        cursor += tokenValue.length
        return {
          type: tokenType,
          value: tokenValue
        }
      }
    }

    return null
  }

  // Match cursor's string with the Regular Expression map
  const match = (regex, subString) => {
    const matched = regex.exec(subString)

    if (matched == null) {
      return null
    }

    return matched[0]
  }

  return {
    init,
    isEnd,
    checkTokens,
    nextToken
  }
}
