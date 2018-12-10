import * as React from "react";
import * as classnames from "classnames";

import { css, theme, mixins } from "./theme";

function buttonClass(disabled: boolean) {
  return classnames(
    "db w-100",
    "ba br1",
    "pv3 ph4",
    "b f4",
    "ttu",
    "chunky-focus",
    disabled
      ? "b--black-10 black-20 bg-transparent"
      : "b--black-40 bg-white hover-bg-washed-blue"
  );
}

const cssButton = (props: ButtonProps) =>
  css(
    mixins.chunkyFocus,
    mixins.clicky,
    {
      display: "block",
      width: "100%",
      border: "1px solid",
      padding: `${theme.sizes[3]} ${theme.sizes[4]}`,
      fontSize: theme.fontSizes[3],
      borderRadius: theme.borderRadius[1],
      fontWeight: "bold"
    },
    props.disabled
      ? {
          borderColor: "rgba(0, 0, 0, 0.1)",
          background: "transparent",
          color: "rgba(0, 0, 0, 0.2)"
        }
      : {
          borderColor: "rgba(0, 0, 0, 0.4)",
          background: "white",
          color: "rgba(0, 0, 0, 0.8)",

          "&:hover": {
            background: theme.colors.washedBlue
          }
        }
  );

interface ButtonProps {
  onClick(): void;
  disabled: boolean;
  children: any;
}

const Button = (props: ButtonProps) => (
  <button
    onClick={props.onClick}
    disabled={props.disabled}
    className={cssButton(props)}
  >
    {props.children}
  </button>
);

export default Button;
