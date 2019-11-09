import React from "react";

import AppBar from "./AppBar";
import ToolBar from "./ToolBar";
import FormulaBar from "./FormulaBar";
import Sheet from "./Sheet";
import SheetNavigator from "./SheetNavigator";

import "./Excel.scss";

const Divider = () => <hr className="divider"/>;

const Excel = ({ name, values, xlsxPopulate, returnLink, handleSubmitName }) => (
  <div className="excel">
    <AppBar name={name} returnLink={returnLink} handleSubmitName={handleSubmitName}/>
    <Divider/>
    <ToolBar/>
    <Divider/>
    <FormulaBar/>
    <Divider/>
    <Sheet values={values} xlsxPopulate={xlsxPopulate}/>
    <Divider/>
    <SheetNavigator/>
  </div>
);

export default Excel;