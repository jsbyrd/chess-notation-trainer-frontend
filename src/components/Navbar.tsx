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
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRight: "1px solid #d4d4d4",
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
      <div className={`${classes.navSectionContainer} mt-4`}>
        <Accordion type="single" collapsible>
          <AccordionItem value="minigames">
            <AccordionTrigger className="">Minigames</AccordionTrigger>
            <Link to="/make-move/instructions">
              <div className={`${classes.clickableElement}`}>
                <AccordionContent className={classes.navElement}>
                  - Make that Move
                </AccordionContent>
              </div>
            </Link>
            <Link to="/name-notation/instructions">
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
            <Link to="/play-bot/instructions">
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
        <Link to="settings">
          <div className={`${classes.navElement} ${classes.clickableElement}`}>
            Settings
          </div>
        </Link>
        <Link to="report-bug">
          <div className={`${classes.navElement} ${classes.clickableElement}`}>
            Report Bug
          </div>
        </Link>
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
