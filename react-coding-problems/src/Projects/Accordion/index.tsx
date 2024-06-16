import { Fragment, useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
export default function Accordion() {
  const [index, setIndex] = useState(-1);

  const accordionData = [
    {
      i: 0,
      tabName: "HTML",
      content:
        "The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser.",
    },
    {
      i: 1,
      tabName: "CSS",
      content:
        "Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML.",
    },
    {
      i: 2,
      tabName: "JavaScript",
      content:
        "JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.",
    },
  ];

  const handleClick = (i: number) => {
    let curr = i;
    if (i === index) {
      curr = -1;
    }
    setIndex(curr);
  };

  return (
    <div>
      {accordionData.map(({ tabName, content, i }) => {
        return (
          <Fragment key={i}>
            <div
              onClick={() => handleClick(i)}
              className="flex flex-row cursor-pointer hover:bg-slate-300 py-2 px-1 mx-4"
            >
              <div>{tabName}</div>
              {index === i ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </div>
            <div className={`${index !== i ? "hidden" : ""} mx-4 py-4`}>
              {content}
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}
