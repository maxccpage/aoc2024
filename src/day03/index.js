import run from "aocrunner"
import { getFileContents } from "../utils/index.js"

const MUL_REGEX = /mul\((\d{1,3}),(\d{1,3})\)/g

const DIGIT_REGEX = /\d{1,3}/g

const ENABLED_REGEX = /do\(\)|don't\(\)/g

const DO_REGEX = /do\(\)/

const DONT_REGEX = /don't\(\)/

const getMatches = (input, regex) => input.match(regex)

const formatIterableMatches = (iterator) =>
  Array.from(iterator).map((iterable) => [iterable[0], iterable.index])

const getEnabledMatches = (input, regex) => {
  const all_matches = formatIterableMatches(input.matchAll(regex))

  let anchor_index = 0

  let enabled = true

  let enabled_matches = []

  for (const [iterator_index, match] of all_matches.entries()) {
    const [keyword, match_index] = match

    if (enabled) {
      if (DONT_REGEX.test(keyword)) {
        enabled_matches.push(
          getMatches(input.slice(anchor_index, match_index), MUL_REGEX),
        )
        enabled = false
      }
    } else {
      if (DO_REGEX.test(keyword)) {
        anchor_index = match_index + 4
        enabled = true
        if (iterator_index === all_matches.length - 1) {
          enabled_matches.push(
            getMatches(input.slice(anchor_index, input.length - 1), MUL_REGEX),
          )
        }
      }
    }
  }

  return enabled_matches.flat()
}

const getDigitPairs = (matches, regex) => {
  const pairs = []

  matches.forEach((match) => {
    const digits = match.match(regex)
    if (digits) {
      pairs.push(digits)
    }
  })

  const digit_pairs = pairs.map(([a, b]) => [parseInt(a), parseInt(b)])

  return digit_pairs
}

const sumDigitPairs = (digit_pairs) =>
  digit_pairs.reduce((accum, [a, b]) => accum + a * b, 0)

const part1 = (rawInput) => {
  const matches = getMatches(rawInput, MUL_REGEX)

  const digit_pairs = getDigitPairs(matches, DIGIT_REGEX)

  return sumDigitPairs(digit_pairs)
}

const part2 = (rawInput) => {
  const enabled_matches = getEnabledMatches(rawInput, ENABLED_REGEX)

  const digit_pairs = getDigitPairs(enabled_matches, DIGIT_REGEX)

  return sumDigitPairs(digit_pairs)
}

run({
  part1: {
    tests: [
      {
        input: getFileContents("src/day03/test.txt"),
        expected: 161,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: getFileContents("src/day03/test_two.txt"),
        expected: 48,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
})
