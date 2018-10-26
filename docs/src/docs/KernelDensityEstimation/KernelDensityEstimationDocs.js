import React from "react";
import ReactDOM from "react-dom";
import ComponentDocs from "../../ComponentDocs";
import ExampleSection from "../../ExampleSection";
// autogenerated docs data containing descriptions of this component's props
import propDocs from "./propDocs.json";

const examples = [
  {
    id: "basic",
    label: "Basic KernelDensityEstimation",
    codeText: require("raw-loader!./examples/KernelDensityEstimation.js.example")
  }
];

export default class KernelDensityEstimationExamples extends React.Component {
  render() {
    return (
      <ComponentDocs name="KernelDensityEstimation" propDocs={propDocs}>
        {/* documentation goes here. intersperse docs with examples or leave examples loop below */}

        {examples.map(example => {
          return <ExampleSection {...example} key={example.id} />;
        })}
      </ComponentDocs>
    );
  }
}