import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { createUseStyles } from "react-jss";
import { FiMenu } from "react-icons/fi";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";

const useStyles = createUseStyles({
  appName: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    textAlign: "center",
  },
  navContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "1rem 0 1rem 0",
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
  const [isOpen, setIsOpen] = useState(false);
  const classes = useStyles();

  return (
    <div>
      {/* Hamburger Menu Icon for smaller screens */}
      <div className="p-4">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <button>
              <FiMenu size={24} />
            </button>
          </SheetTrigger>
          <SheetContent side="left" style={{ width: "230px" }}>
            <div
              className={`${classes.navContainer} font-medium flex-shrink-0`}
            >
              <div className={`${classes.navSectionContainer} mt-4`}>
                <div className={`${classes.appName} mb-5 mt-3 text-2xl`}>
                  <SheetTitle>
                    <SheetClose asChild>
                      <Link to="/">NotationChess</Link>
                    </SheetClose>
                  </SheetTitle>
                </div>
                <Accordion type="single" collapsible>
                  <AccordionItem value="minigames">
                    <AccordionTrigger className="">Minigames</AccordionTrigger>
                    <Link to="/make-move/instructions">
                      <div className={`${classes.clickableElement}`}>
                        <SheetClose asChild>
                          <AccordionContent className={classes.navElement}>
                            - Make that Move
                          </AccordionContent>
                        </SheetClose>
                      </div>
                    </Link>
                    <Link to="/name-notation/instructions">
                      <div className={`${classes.clickableElement}`}>
                        <SheetClose asChild>
                          <AccordionContent className={classes.navElement}>
                            - Name that Notation
                          </AccordionContent>
                        </SheetClose>
                      </div>
                    </Link>
                  </AccordionItem>
                  <AccordionItem value="play">
                    <AccordionTrigger>Play</AccordionTrigger>
                    <Link to="/play-human">
                      <div className={`${classes.clickableElement}`}>
                        <SheetClose asChild>
                          <AccordionContent className={classes.navElement}>
                            - vs Human
                          </AccordionContent>
                        </SheetClose>
                      </div>
                    </Link>
                    <Link to="/play-bot/instructions">
                      <div className={`${classes.clickableElement}`}>
                        <SheetClose asChild>
                          <AccordionContent className={classes.navElement}>
                            - vs Bot
                          </AccordionContent>
                        </SheetClose>
                      </div>
                    </Link>
                  </AccordionItem>
                </Accordion>
                <Link to="/learn">
                  <SheetClose asChild>
                    <div
                      className={`${classes.navElement} ${classes.clickableElement}`}
                    >
                      Learn
                    </div>
                  </SheetClose>
                </Link>
                <Link to="/analytics">
                  <SheetClose asChild>
                    <div
                      className={`${classes.navElement} ${classes.clickableElement}`}
                    >
                      Analytics
                    </div>
                  </SheetClose>
                </Link>
              </div>
              <div className={`${classes.navSectionContainer}`}>
                <Link to="/settings">
                  <SheetClose asChild>
                    <div
                      className={`${classes.navElement} ${classes.clickableElement}`}
                    >
                      Settings
                    </div>
                  </SheetClose>
                </Link>
                <Link to="/report-bug">
                  <SheetClose asChild>
                    <div
                      className={`${classes.navElement} ${classes.clickableElement}`}
                    >
                      Report Bug
                    </div>
                  </SheetClose>
                </Link>
                <SheetClose asChild>
                  <div
                    className={`${classes.navElement} ${classes.clickableElement} mb-[40px]`}
                  >
                    Sign Out
                  </div>
                </SheetClose>
              </div>
            </div>
            {/* <SheetClose asChild>
              <button className="absolute top-2 right-2">Close</button>
            </SheetClose> */}
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Navbar;
