const _ = require("lodash")

const types = [
  "normal",
  "fighting",
  "flying",
  "poison",
  "ground",
  "rock",
  "bug",
  "ghost",
  "steel",
  "fire",
  "water",
  "grass",
  "electric",
  "psychic",
  "ice",
  "dragon",
  "dark",
  "fairy"
]

const statusTypes = {
  "Forest's Curse (grass)": "grass",
  "Trick-or-Treat (ghost)": "ghost",
}

const statuses = ["none", ...Object.keys(statusTypes)]

const abilityFactors = {
  "Thick Fat": {
    ice: 0.5,
    fire: 0.5,
  },
  "Heatproof": {
    fire: 0.5
  },
  "Levitate": {
    ground: 0
  },
  "Volt Absorb": {
    electric: 0
  },
  "Water Absorb": {
    water: 0,
  },
  "Dry Skin": {
    fire: 1.25,
    water: 0,
  },
  "Flash Fire": {
    fire: 0
  },
  "Water Bubble": {
    fire: 0.5
  },
  "Prism Guard": {},
  "Filter": {},
  "Wonder Guard": {},
}

const abilities = ["none", ...Object.keys(abilityFactors)]

function rawDataStrToNumber(str) {
  if (str === "2") return 2
  if (str === "1") return 1
  if (str === "½") return 0.5
  if (str === "0") return 0
  throw new Error()
}

const rawData = [
  "1 1 1 1 1 ½ 1 0 ½ 1 1 1 1 1 1 1 1 1",
  "2 1 ½ ½ 1 2 ½ 0 2 1 1 1 1 ½ 2 1 2 ½",
  "1 2 1 1 1 ½ 2 1 ½ 1 1 2 ½ 1 1 1 1 1",
  "1 1 1 ½ ½ ½ 1 ½ 0 1 1 2 1 1 1 1 1 2",
  "1 1 0 2 1 2 ½ 1 2 2 1 ½ 2 1 1 1 1 1",
  "1 ½ 2 1 ½ 1 2 1 ½ 2 1 1 1 1 2 1 1 1",
  "1 ½ ½ ½ 1 1 1 ½ ½ ½ 1 2 1 2 1 1 2 ½",
  "0 1 1 1 1 1 1 2 1 1 1 1 1 2 1 1 ½ 1",
  "1 1 1 1 1 2 1 1 ½ ½ ½ 1 ½ 1 2 1 1 2",
  "1 1 1 1 1 ½ 2 1 2 ½ ½ 2 1 1 2 ½ 1 1",
  "1 1 1 1 2 2 1 1 1 2 ½ ½ 1 1 1 ½ 1 1",
  "1 1 ½ ½ 2 2 ½ 1 ½ ½ 2 ½ 1 1 1 ½ 1 1",
  "1 1 2 1 0 1 1 1 1 1 2 ½ ½ 1 1 ½ 1 1",
  "1 2 1 2 1 1 1 1 ½ 1 1 1 1 ½ 1 1 0 1",
  "1 1 2 1 2 1 1 1 ½ ½ ½ 2 1 1 ½ 2 1 1",
  "1 1 1 1 1 1 1 1 ½ 1 1 1 1 1 1 2 1 0",
  "1 ½ 1 1 1 1 1 2 1 1 1 1 1 2 1 1 ½ ½",
  "1 2 1 ½ 1 1 1 1 ½ ½ 1 1 1 1 1 2 2 1"
].map(row => row.split(" ").map(rawDataStrToNumber))

function keyForTypes(t1, t2) {
  return t1 + " ~ " + t2
}

const pairs =
  _.flatMap(rawData, (row, i) =>
    _.map(row, (data, j) =>
      [keyForTypes(types[i], types[j]), data]
    )
  )

const table = _.fromPairs(pairs)

// Pokémon abilities can provide damage scaling factors for certain types.
function applyAbility(factor, tb, ability) {
  if (ability === "none") {
    return factor
  } else if (ability === "Filter" || ability === "Prism Armor") {
    return factor * (factor >= 2 ? 0.25 : 1)
  } else if (ability === "Wonder Guard") {
    return factor * (factor < 2 ? 0 : 1)
  } else if (tb in abilityFactors[ability]) {
    return factor * abilityFactors[ability][tb]
  } else {
    return factor
  }
}

function matchupFor(ta1, ta2, status, ability, tb) {
  const x1 = table[keyForTypes(tb, ta1)]
  // Don't allow bogus type combinations, such as Fire/Fire or Fire/None
  const x2 = (ta1 !== ta2 && ta2 !== "none")
    ? table[keyForTypes(tb, ta2)]
    : 1
  // Certain Pokémon moves can provide a third type as a status.
  // Pokémon can't have the same type twice, though.
  const ta3 = statusTypes[status]
  const x3 = status !== "none" && ta3 && ta3 !== ta1 && ta3 !== ta2
    ? table[keyForTypes(tb, ta3)]
    : 1
  return applyAbility(x1 * x2 * x3, tb, ability)
}

const typesOrNone = types.concat("none")

function mapToObj(array, fn) {
  const obj = {}
  array.forEach(x => obj[x] = fn(x))
  return obj
}

function offensiveMatchups(type) {
  const allMatchups =
    mapToObj(types, t => matchupFor(t, "none", "none", "none", type))
  return _.invertBy(allMatchups)
}

function defensiveMatchups(t1, t2, status, ability) {
  const allMatchups =
    mapToObj(types, t => matchupFor(t1, t2, status, ability, t))
  return _.invertBy(allMatchups)
}

exports.statuses = statuses
exports.abilities = abilities
exports.offensiveMatchups = offensiveMatchups
exports.defensiveMatchups = defensiveMatchups
exports.typesOrNone = typesOrNone
exports.types = types
