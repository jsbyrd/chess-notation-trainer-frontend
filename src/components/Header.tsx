import { createUseStyles } from "react-jss";
import { Link } from "react-router-dom";

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

  return (
    <header className={classes.header}>
      <div className={`${classes.appName} my-3 text-2xl`}>
        <Link to="/">NotationChess</Link>
      </div>
      <div>placeholder</div>
    </header>
  );
};

export default Header;
