import { createUseStyles } from "react-jss";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const useStyles = createUseStyles({
  navContainer: {
    width: "200px",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRight: "1px solid black",
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
    <div className={`${classes.navContainer} font-medium`}>
      <div className={`${classes.navSectionContainer}`}>
        <div className={`${classes.navTitle} text-2xl mt-[25px]`}>
          NotationChess
        </div>
        <Accordion type="single" collapsible>
          <AccordionItem value="practice">
            <AccordionTrigger>Practice</AccordionTrigger>
            <div className={`${classes.clickableElement}`}>
              <AccordionContent className={classes.navElement}>
                Make that Move
              </AccordionContent>
            </div>
            <div className={`${classes.clickableElement}`}>
              <AccordionContent className={classes.navElement}>
                Name that Notation
              </AccordionContent>
            </div>
          </AccordionItem>
          <AccordionItem value="play">
            <AccordionTrigger>Play</AccordionTrigger>
            <div className={`${classes.clickableElement}`}>
              <AccordionContent className={classes.navElement}>
                vs Human
              </AccordionContent>
            </div>
            <div className={`${classes.clickableElement}`}>
              <AccordionContent className={classes.navElement}>
                vs Bot
              </AccordionContent>
            </div>
          </AccordionItem>
        </Accordion>
        <div className={`${classes.navElement} ${classes.clickableElement}`}>
          Learn
        </div>
        <div className={`${classes.navElement} ${classes.clickableElement}`}>
          Analytics
        </div>
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
