import run from "aocrunner"
import { inputIterator, getFileContents } from "../utils/index.js"

const getDirection = (a, b) => (a > b ? 0 : 1)

const isValid = (a, b) => {
  const diff = Math.abs(a - b)

  return diff > 0 && diff < 4
}

const isSafeReport = (report_arr) => {
  if (report_arr[0] === report_arr[1]) return false

  let initital_direction = getDirection(report_arr[0], report_arr[1])

  for (let i = 0; i < report_arr.length - 1; i++) {
    let a = report_arr[i]
    let b = report_arr[i + 1]

    if (initital_direction !== getDirection(a, b) || !isValid(a, b)) {
      return false
    }
  }

  return true
}

const canPassByRemovingOne = (invalid_report) => {
  for (let i = 0; i < invalid_report.length; i++) {
    let copy = [...invalid_report]
    copy.splice(i, 1)
    if (isSafeReport(copy)) {
      return true
    }
  }

  return false
}

const part1 = (rawInput) => {
  let reports = []

  inputIterator(rawInput)((line) => {
    const report = line.split(/ /).map((level) => parseInt(level))
    reports.push(report)
  })

  let safe_count = 0

  for (const report of reports) {
    if (isSafeReport(report)) {
      safe_count += 1
    }
  }

  return safe_count
}

const part2 = (rawInput) => {
  let reports = []

  inputIterator(rawInput)((line) => {
    const report = line.split(/ /).map((level) => parseInt(level))
    reports.push(report)
  })

  let invalid_reports = new Set()

  for (const report of reports) {
    if (!isSafeReport(report)) {
      invalid_reports.add(report)
    }
  }

  for (let invalid_report of invalid_reports) {
    if (canPassByRemovingOne(invalid_report)) {
      invalid_reports.delete(invalid_report)
    }
  }

  return reports.length - invalid_reports.size
}

run({
  part1: {
    tests: [
      {
        input: getFileContents("src/day02/test.txt"),
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: getFileContents("src/day02/test.txt"),
        expected: 6,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
})
