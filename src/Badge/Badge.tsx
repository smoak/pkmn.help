import React, { FC } from "react";
import classnames from "classnames";

import { Type } from "../data";

export interface BadgeProps {
  readonly pokemonType: Type;
}

const Badge: FC<BadgeProps> = ({ pokemonType }) => {
  const style = { minWidth: "7.5em" };
  const className = classnames(
    `type-${pokemonType}`,
    "ba b--black-10",
    "badge",
    "with-border-color",
    "dib pv2 ph3",
    "br1",
    "ma--2px",
    "ttu tc b f5 f4-l"
  );

  return (
    <div key={pokemonType} className={className} style={style}>
      {pokemonType}
    </div>
  );
};

export default Badge;
