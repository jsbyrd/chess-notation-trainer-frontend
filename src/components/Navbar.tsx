import { createUseStyles } from "react-jss";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";

const useStyles = createUseStyles({
  navContainer: {
    width: "200px",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRight: "1px solid #a3a3a3",
  },
  navSectionContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  navTitle: {
    width: "100%",
    height: "75px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "24px",
    fontWeight: "bold",
    "&:hover": {
      cursor: "pointer",
    },
  },
  navElement: {
    width: "100%",
    height: "50px",
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    paddingLeft: "30px",
  },
  clickableElement: {
    "&:hover": {
      backgroundColor: "#d4d4d4",
      cursor: "pointer",
    },
  },
});

const Navbar = () => {
  const classes = useStyles();

  return (
    <div className={`${classes.navContainer} font-medium flex-shrink-0`}>
      <div className={`${classes.navSectionContainer}`}>
        <div className={`${classes.navTitle} text-2xl my-[25px]`}>
          <Link to="/">NotationChess</Link>
        </div>
        <Accordion type="single" collapsible>
          <AccordionItem value="minigames">
            <AccordionTrigger className="">Minigames</AccordionTrigger>
            <Link to="/make-move">
              <div className={`${classes.clickableElement}`}>
                <AccordionContent className={classes.navElement}>
                  - Make that Move
                </AccordionContent>
              </div>
            </Link>
            <Link to="/name-notation">
              <div className={`${classes.clickableElement}`}>
                <AccordionContent className={classes.navElement}>
                  - Name that Notation
                </AccordionContent>
              </div>
            </Link>
          </AccordionItem>
          <AccordionItem value="play">
            <AccordionTrigger>Play</AccordionTrigger>
            <Link to="/play-human">
              <div className={`${classes.clickableElement}`}>
                <AccordionContent className={classes.navElement}>
                  - vs Human
                </AccordionContent>
              </div>
            </Link>
            <Link to="/play-bot">
              <div className={`${classes.clickableElement}`}>
                <AccordionContent className={classes.navElement}>
                  - vs Bot
                </AccordionContent>
              </div>
            </Link>
          </AccordionItem>
        </Accordion>
        <Link to="/learn">
          <div className={`${classes.navElement} ${classes.clickableElement}`}>
            Learn
          </div>
        </Link>
        <Link to="/analytics">
          <div className={`${classes.navElement} ${classes.clickableElement}`}>
            Analytics
          </div>
        </Link>
      </div>
      <div className={`${classes.navSectionContainer}`}>
        <div className={`${classes.navElement} ${classes.clickableElement}`}>
          Settings
        </div>
        <div className={`${classes.navElement} ${classes.clickableElement}`}>
          Report Bug
        </div>
        <div
          className={`${classes.navElement} ${classes.clickableElement} mb-[40px]`}
        >
          Sign Out
        </div>
      </div>
    </div>
  );
};

export default Navbar;
