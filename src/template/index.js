import run from "aocrunner"
import { inputIterator, getFileContents } from "../utils/index.js"

const part1 = (rawInput) => {
  inputIterator(rawInput)((line, index) => {
    // Code here
  })

  return
}

const part2 = (rawInput) => {
  inputIterator(rawInput)((line, index) => {
    // Code here
  })

  return
}

run({
  part1: {
    tests: [
      // {
      //   input: getFileContents('src/day[INSERT_DAY]/test.txt'),
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: getFileContents('src/day[INSERT_DAY]/test.txt'),
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
})
