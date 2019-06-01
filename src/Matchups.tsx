import React from "react";

import {
  Type,
  Effectiveness,
  GroupedMatchups,
  defensiveMatchups,
  offensiveMatchups
} from "./data";
import Badge from "./Badge";

function section(title: string, types: Type[]) {
  if (types.length === 0) {
    return null;
  }
  return (
    <div>
      <h3 className="f4 mt3 mb0 dark-gray">{title}</h3>
      <div className="mw6 center">
        {types.map(t => {
          return <Badge pokemonType={t} />;
        })}
      </div>
    </div>
  );
}

function renderMatchups(
  makePrefix: (value: string) => string,
  matchups: GroupedMatchups
) {
  return (
    <div className="tc">
      {section(makePrefix("4×"), matchups.typesFor(Effectiveness.QUADRUPLE))}
      {section(makePrefix("2×"), matchups.typesFor(Effectiveness.DOUBLE))}
      {section(makePrefix("1×"), matchups.typesFor(Effectiveness.REGULAR))}
      {section(makePrefix("½×"), matchups.typesFor(Effectiveness.HALF))}
      {section(makePrefix("¼×"), matchups.typesFor(Effectiveness.QUARTER))}
      {section(makePrefix("0×"), matchups.typesFor(Effectiveness.ZERO))}
    </div>
  );
}

export interface DefenseProps {
  type1: Type;
  type2: Type;
}

export function Defense(props: DefenseProps) {
  const { type1, type2 } = props;
  const matchups = defensiveMatchups(type1, type2);
  return renderMatchups(x => `takes ${x} from`, matchups);
}

Defense.displayName = "Matchups.Defense";

export interface OffenseProps {
  type: Type;
}

export function Offense(props: OffenseProps) {
  const { type } = props;
  const matchups = offensiveMatchups(type);
  return renderMatchups(x => `deals ${x} to`, matchups);
}

Offense.displayName = "Matchups.Offense";
