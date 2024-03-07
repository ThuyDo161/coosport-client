import { Affix, Button, Transition } from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import React from "react";

const ScrollTop = () => {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <Affix position={{ bottom: 20, right: 20 }}>
      <Transition transition="slide-up" mounted={scroll.y > 0}>
        {(transitionStyles) => (
          <Button
            variant="filled"
            size="lg"
            radius={"lg"}
            sx={{ backgroundColor: "#4267b2" }}
            style={transitionStyles}
            onClick={() => scrollTo({ y: 0 })}
          >
            <i className="bx bx-up-arrow-alt"></i>
          </Button>
        )}
      </Transition>
    </Affix>
  );
};

export default ScrollTop;
