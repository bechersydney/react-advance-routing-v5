import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";
const MainNavigation = () => {
    return (
        <header className={classes.header}>
            <div className={classes.logo}>Greate Qoutes</div>
            <nav className={classes.nav}>
                <ul>
                    <li>
                        <NavLink activeClassName={classes.active} to="/qoutes">
                            All Qoutes
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            activeClassName={classes.active}
                            to="/new-qoute"
                        >
                            New Qoute
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};
export default MainNavigation;
