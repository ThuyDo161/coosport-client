import React from "react";

type HelmetPropTypes = {
  title: string;
  children?: any;
};

const Helmet = (props: HelmetPropTypes) => {
  document.title = "Tuấn Vũ Order - " + props.title;

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <div>{props.children}</div>;
};

export default Helmet;
