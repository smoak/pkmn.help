const React = require("react")
const TypeSelector = require("./type-selector")
const Matchups = require("./matchups")

const $ = React.createElement

function Defense(props) {
  const classH2 = "tc f3 mt4 mb2"
  return $("main", {className: "ph3 pt1 pb2 mw6 mw9-ns center"},
    $("div", {className: "dib w-50-ns v-top"},
      $("h2", {className: classH2}, "choose primary type"),
      $(TypeSelector, {
        value: props.type1,
        onChange: props.updateType1,
        includeNone: false
      }),
      $("h2", {className: classH2 + " mt4"}, "choose secondary type"),
      $(TypeSelector, {
        value: props.type2,
        onChange: props.updateType2,
        includeNone: true
      }),
      $("h2", {className: classH2 + " mt4"}, "choose status"),
      $("select", {},
        $("option", {value: ""}, "—"),
        $("option", {value: "forest-curse"}, "Forest's Curse"),
        $("option", {value: "trick-or-treat"}, "Trick-or-Treat")
      ),
      $("h2", {className: classH2 + " mt4"}, "choose ability"),
      $("select", {},
        $("option", {value: ""}, "—"),
        $("option", {value: "..."}, "Thick Fat"),
        $("option", {value: "..."}, "Heatproof"),
        $("option", {value: "..."}, "Levitate"),
        $("option", {value: "..."}, "Volt Absorb"),
        $("option", {value: "..."}, "Water Absorb"),
        $("option", {value: "..."}, "Dry Skin"),
        $("option", {value: "..."}, "Flash Fire"),
        $("option", {value: "..."}, "Filter"),
        $("option", {value: "..."}, "Wonder Guard")
      )
    ),
    $("div", {className: "dib w-50-ns v-top pl3-ns mt4-ns"},
      $("hr", {className: "dn-ns subtle-hr mv4"}),
      $(Matchups.Defense, {
        type1: props.type1,
        type2: props.type2
      })
    )
  )
}

module.exports = Defense
