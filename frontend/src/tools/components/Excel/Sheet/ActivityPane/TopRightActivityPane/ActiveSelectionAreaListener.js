import React, { useEffect, useRef } from "react";

import { connect } from "react-redux";

import { computeSelectionAreaStyle } from "./tools";

import ActiveSelectionArea from "../ActiveSelectionArea";

const mapStateToProps = ({
  ui: {
    excel: {
      isSelectionMode,
      activeSelectionArea,

      freezeColumnCount,
      freezeRowCount
    }
  }
}) => ({
  isSelectionMode,
  activeSelectionArea,

  freezeColumnCount,
  freezeRowCount
});

let ActiveSelectionAreaListener = ({ 
  sheetGridRef,

  isSelectionMode,
  activeSelectionArea,

  freezeColumnCount,
  freezeRowCount
}) => {
  const activeSelectionAreaRef = useRef(null);

  useEffect(() => {
    const { current: ActiveSelectionAreaInstance } = activeSelectionAreaRef;

    if(isSelectionMode && activeSelectionArea) {
      const { x1, y1, x2, y2 } = activeSelectionArea;

      if((x1 <= freezeColumnCount && x2 <= freezeColumnCount) || (y1 > freezeRowCount && y2 > freezeRowCount)) return ActiveSelectionAreaInstance.resetActiveSelectionArea();

      const { current: SheetInstance } = sheetGridRef;
      
      ActiveSelectionAreaInstance.setActiveSelectionAreaStyle(computeSelectionAreaStyle(SheetInstance, activeSelectionArea, freezeColumnCount, freezeRowCount, true));
    } else {
      ActiveSelectionAreaInstance.resetActiveSelectionArea();
    }
  });

  return (
    <ActiveSelectionArea
      ref={activeSelectionAreaRef}
    />
  );
};

ActiveSelectionAreaListener = connect(mapStateToProps)(ActiveSelectionAreaListener);

export default ActiveSelectionAreaListener;