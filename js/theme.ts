import { css } from "emotion";

// .type(@color, @shade) {
//   background-color: @color;
//   color: white;
//   text-shadow:
//     0 1px 0 black,
//     0 0 1px fade(black, 60%),
//     0 0 2px fade(black, 70%),
//     0 0 3px fade(black, 80%),
//     0 0 4px fade(black, 90%);

//   &.with-border-color {
//     border-color: darken(@color, @shade);
//   }
// }

// .type-fire       { .type(#f08030, 10%); }
// .type-water      { .type(#6890f0, 10%); }
// .type-grass      { .type(#78c850, 15%); }
// .type-electric   { .type(#f8d030, 15%); }
// .type-psychic    { .type(#f85888, 10%); }
// .type-ice        { .type(#98d8d8, 10%); }
// .type-dragon     { .type(#7038f8, 10%); }
// .type-dark       { .type(#705848, 15%); }
// .type-fairy      { .type(#ee99ac, 10%); }
// .type-normal     { .type(#a8a878, 10%); }
// .type-fighting   { .type(#c03028, 15%); }
// .type-flying     { .type(#a890f0, 10%); }
// .type-poison     { .type(#a040a0, 10%); }
// .type-ground     { .type(#e0c068, 15%); }
// .type-rock       { .type(#b8a038, 10%); }
// .type-bug        { .type(#a8b820, 10%); }
// .type-ghost      { .type(#705898, 10%); }
// .type-steel      { .type(#b8b8d0, 10%); }
// .type-none       { .type(#dedede, 10%); }

const theme = {
  typeColors: {
    fire: "#f08030",
    water: "#6890f0",
    grass: "#78c850",
    electric: "#f8d030",
    psychic: "#f85888",
    ice: "#98d8d8",
    dragon: "#7038f8",
    dark: "#705848",
    fairy: "#ee99ac",
    normal: "#a8a878",
    fighting: "#c03028",
    flying: "#a890f0",
    poison: "#a040a0",
    ground: "#e0c068",
    rock: "#b8a038",
    bug: "#a8b820",
    ghost: "#705898",
    steel: "#b8b8d0",
    none: "#dedede"
  }
};

const mixins = {
  // .chunky-focus {
  //   transition: 150ms box-shadow;
  // }

  // .chunky-focus:focus {
  //   outline: none;
  //   box-shadow: 0 0 0 2px white, 0 0 0 4px black;
  // }

  clicky: {
    "&:active": {
      transform: "scale(0.98)"
    }
  },

  chunkyFocus: {
    transition: "150ms box-shadow",

    "&:focus": {
      outline: "none",
      boxShadow: "0 0 0 2px white, 0 0 0 4px black"
    }
  }
};

export { css, theme, mixins };
