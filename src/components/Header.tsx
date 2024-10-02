import { createUseStyles } from "react-jss";
import { Link } from "react-router-dom";
import { useUser } from "./UserProvider";
import NavbarDrawer from "./Navbar/NavbarDrawer";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { defaultPfp } from "@/assets";

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
  userInfo: {
    display: "flex",
    alignItems: "center",
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
      <div className={classes.userInfo}>
        <div className="mr-4">{username}</div>
        <Avatar>
          <AvatarImage src={defaultPfp} alt="*U" />
          <AvatarFallback>{username ? username.charAt(0) : "U"}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Header;
