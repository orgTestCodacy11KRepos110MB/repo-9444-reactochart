import React from "react";
import ReactDOM from "react-dom";
import ComponentDocs from "../../ComponentDocs";
import ExampleSection from "../../ExampleSection";
// autogenerated docs data containing descriptions of this component's props
import propDocs from "./propDocs.json";

const examples = [
  {
    id: "basic",
    label: "Basic YAxisLabels",
    codeText: require("raw-loader!./examples/YAxisLabels.js.example")
  }
];

export default class YAxisLabelsExamples extends React.Component {
  render() {
    return (
      <ComponentDocs name="YAxisLabels" propDocs={propDocs}>
        {/* documentation goes here. intersperse docs with examples or leave examples loop below */}

        {examples.map(example => {
          return <ExampleSection {...example} key={example.id} />;
        })}
      </ComponentDocs>
    );
  }
}