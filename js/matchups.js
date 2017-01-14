const _ = require("lodash")
const React = require("react")
const Data = require("./data")
const classes = require("./classes")

const $ = React.createElement

function badge(type) {
  const style = {minWidth: "7.5em"}
  const className = classes(
    "type-" + type,
    "ba b--black-10",
    "badge",
    "with-border-color",
    "dib pv2 ph3",
    "br1",
    "ma--2px",
    "ttu tc b f5 f4-l"
  )
  return $("div", {key: type, className, style}, type)
}

function section(title, info) {
  if (!info) {
    return null
  }
  return $("div", {key: title},
    $("h3", {className: "f4 mt3 mb0 dark-gray"}, title),
    $("div", {className: "mw6 center"}, info.map(badge))
  )
}

function formatFactor(f) {
  if (f === 0.50) return "½"
  if (f === 0.25) return "¼"
  return "" + f
}

function makeSections(direction, matchups) {
  // Sorted damage scaling factors from object keys
  const factors = _.sortBy(Object.keys(matchups).map(Number)).reverse()
  return factors.map(f => {
    const types = matchups[f]
    const factor = formatFactor(f)
    return section(`${direction} ${factor}×`, types)
  })
}

function Defense(props) {
  const matchups =
    Data.defensiveMatchups(
      props.type1,
      props.type2,
      props.status,
      props.ability
    )
  const sections = makeSections("takes", matchups)
  return $("div", {className: "tc"}, sections)
}

function Offense(props) {
  const matchups = Data.offensiveMatchups(props.type)
  const sections = makeSections("deals", matchups)
  return $("div", {className: "tc"}, sections)
}

exports.Defense = Defense
exports.Offense = Offense
