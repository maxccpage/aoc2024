import run from "aocrunner"
import { inputIterator, getFileContents } from "../utils/index.js"

const formatInput = (rawInput) => {
  const left_side = []
  const right_side = []

  inputIterator(rawInput)((line) => {
    const parsed = line.split(/ /)

    const left = parsed[0]
    const right = parsed[parsed.length - 1]

    left_side.push(parseInt(left))
    right_side.push(parseInt(right))
  })

  return [left_side, right_side]
}

const part1 = (rawInput) => {
  const [left_side, right_side] = formatInput(rawInput)

  let sum = 0

  const sorted_left_side = left_side.sort((a, b) => a - b)
  const sorted_right_side = right_side.sort((a, b) => a - b)

  sorted_left_side.forEach((item, index) => {
    const diff = Math.abs(item - sorted_right_side[index])
    sum += diff
  })

  return sum
}

const part2 = (rawInput) => {
  const [left_side, right_side] = formatInput(rawInput)

  let cache = new Map()

  for (const num of right_side) {
    if (cache.has(num)) {
      cache.set(num, cache.get(num) + 1)
    } else {
      cache.set(num, 1)
    }
  }

  let sum = 0

  for (const num of left_side) {
    if (cache.has(num)) {
      sum += num * cache.get(num)
    }
  }

  return sum
}

run({
  part1: {
    tests: [
      {
        input: getFileContents("src/day01/test.txt"),
        expected: 11,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: getFileContents("src/day01/test.txt"),
        expected: 31,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
