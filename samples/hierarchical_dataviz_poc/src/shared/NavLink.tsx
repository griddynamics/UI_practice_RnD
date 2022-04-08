import { PropsWithChildren } from "react";
import { NavLink as ReactRouterNavLink } from "react-router-dom";
import styles from "./NavLink.module.css";
import classnames from "classnames";

export interface Props {
  to: string;
  className?: string;
}

function NavLink({ to, className, children }: PropsWithChildren<Props>) {
  return (
    <ReactRouterNavLink
      className={({ isActive }) =>
        classnames([
          className,
          styles.navLink,
          { [styles.activeNavLink]: isActive },
        ])
      }
      to={to}
    >
      {children}
    </ReactRouterNavLink>
  );
}

export default NavLink;
