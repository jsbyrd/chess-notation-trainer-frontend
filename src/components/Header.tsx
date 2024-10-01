import { createUseStyles } from "react-jss";
import { Link } from "react-router-dom";
import { useUser } from "./UserProvider";
import NavbarDrawer from "./Navbar/NavbarDrawer";

const useStyles = createUseStyles({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem",
    borderBottom: "1px solid #d4d4d4",
  },
  appName: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
});

const Header = () => {
  const classes = useStyles();
  const { username } = useUser();

  return (
    <header className={classes.header}>
      <div className="block md:hidden">
        <NavbarDrawer />
      </div>
      <div className={`${classes.appName} my-3 text-2xl hidden md:flex`}>
        <Link to="/">NotationChess</Link>
      </div>
      <div>{username}</div>
    </header>
  );
};

export default Header;
