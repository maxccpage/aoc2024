/**
 * Root for your util libraries.
 *
 * You can import them in the src/template/index.js,
 * or in the specific file.
 *
 * Note that this repo uses ES Modules, so you have to explicitly specify
 * .js extension (yes, .js not .ts - even for TypeScript files)
 * for imports that are not imported from node_modules.
 *
 * For example:
 *
 *   correct:
 *
 *     import _ fro 'lodash
 *     import myLib from '../utils/myLib.js'
 *     import { myUtil } from '../utils/index.js'
 *
 *   incorrect:
 *
 *     import _ fro 'lodash
 *     import myLib from '../utils/myLib'
 *     import { myUtil } from '../utils'
 */
import fs from "fs"

export const getFileContents = (filePath) => {
  try {
    const fileContents = fs.readFileSync(
      `${process.cwd()}/${filePath}`,
      "utf-8",
    )
    return fileContents
  } catch (error) {
    throw new Error(`Failed to read file: ${error.message}`)
  }
}

export const inputIterator = (rawInput, delimiter = null) => {
  const input = rawInput.split(delimiter || "\n")

  return (mapper) => {
    input.forEach((line, index) => {
      if (line) {
        mapper(line, index)
      }
    })
  }
}
