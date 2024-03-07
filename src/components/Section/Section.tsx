import React from 'react';
import './section.scss';

type PropsType = {
  children?: any;
};

const Section = (props: PropsType) => {
  return <div className="section">{props.children}</div>;
};

export const SectionTitle = (props: PropsType) => {
  return <div className="section__title">{props.children}</div>;
};

export const SectionBody = (props: PropsType) => {
  return <div className="section__body">{props.children}</div>;
};

export default Section;
