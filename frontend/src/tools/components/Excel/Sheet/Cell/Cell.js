import React, { useState } from "react";

import { columnNumberToName } from "xlsx-populate/lib/addressConverter";

import { arrowKeyRegex } from "tools/regex";

import "./Cell.scss";

const HeaderCell = ({ style, value, isActiveHeader }) => {
  const className = `cell cell--positionIndicator ${isActiveHeader ? "cell--positionIndicator-active" : "cell--positionIndicator-inactive"}`;

  return (
    <div className={className} style={style}>
      {value}
    </div>
  );
};

const DataCell = ({ 
  style, 
  value, 
  column, 
  row, 

  columnCount,
  rowCount,

  isSelectionMode,

  activeCell,
  isActiveCell, 
  handleSetActiveCell, 
  handleSetActiveCellEdit,
  handleActiveCellArrowEvent,

  handleSelectionStart,
  handleSelectionOver,
  handleSelectionEnd
}) => {
  let className = "cell";

  if(isActiveCell) className += " cell--active";
  
  const handleDoubleClick = () => {
    if(!isActiveCell) handleSetActiveCell({ row, column });
    handleSetActiveCellEdit();
  };

  const handleClick = () => {
    handleSetActiveCell({ row, column });
  };

  const handleKeyDown = ({ key }) => {
    if(arrowKeyRegex.test(key)) {
      event.preventDefault();

      let { row, column } = activeCell;
      if(key === "ArrowUp") {
        if(row > 1) row--;
      } else if(key === "ArrowDown") {
        if(row < rowCount) row++;
      } else if(key === "ArrowLeft") {
        if(column > 1) column--;
      } else {
        if(column < columnCount) column++;
      }
      
      // TODO : Consider edges in the future.. Right now do not consider edges
      if(row !== activeCell.row || column !== activeCell.column) {
        handleSetActiveCell({ row, column })
      }
    }
  };

  const handleMouseDown = () => {
    handleSelectionStart(row, column);
  };

  const handleMouseOver = () => {
    if(isSelectionMode) handleSelectionOver(row, column);
  };

  const handleMouseUp = () => {
    if(isSelectionMode) handleSelectionEnd();
  };

  return (
    <div 
      className={className} 
      style={style} 
      tabIndex="0"
      onClick={handleClick} 
      onDoubleClick={handleDoubleClick}
      onKeyDown={handleKeyDown}
      onKeyPress={handleKeyDown}
      onMouseDown={handleMouseDown}
      onMouseOut={handleMouseOver}
      onMouseUp={handleMouseUp}
    >
      {value}
    </div>
  );
};

const EditCell = ({ 
  style, 
  value, 
  column, 
  row, 
  handleChangeCellValue, 
  handleSetActiveCell,
  handleSetActiveCellNormal
}) => {
  const [ inputValue, setInputValue ] = useState(value ? value : "");

  const handleInputChange = ({ target: { value } }) => setInputValue(value);

  const handleBlur = () => {
    handleSetActiveCell({ row, column });
  };

  const handleKeyDown = ({ key, target }) => {
    if(key === "Enter") {
      handleChangeCellValue(row, column, inputValue);
      handleSetActiveCellNormal();
    } else if(key === "Tab") {
      // handleSetActiveCellNormal();
    } else if(key === "Escape") {
      handleSetActiveCellNormal();
    }
  };

  return (
    <input
      className="cell cell--edit" 
      style={style} 
      type="text" 
      value={inputValue} 
      autoFocus 
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
    />
  );
};

const EditableCell = ({ 
  style, 
  value, 
  activeCell, 
  isActiveCellEditMode,
  isSelectionMode,

  columnIndex, 
  rowIndex, 

  columnCount,
  rowCount,

  handleChangeCellValue,
  handleSetActiveCellEdit, 
  handleSetActiveCell,
  handleSetActiveCellNormal,
  handleActiveCellArrowEvent,

  handleSelectionStart,
  handleSelectionOver,
  handleSelectionEnd
}) => {
  const { row, column } = activeCell;

  const isActiveCell = columnIndex === column && rowIndex === row;
  const isEditMode = isActiveCell && isActiveCellEditMode;

  return (
    isEditMode 
    ? (
      <EditCell 
        style={style} 
        value={value} 
        column={columnIndex} 
        row={rowIndex} 
        handleChangeCellValue={handleChangeCellValue} 
        handleSetActiveCell={handleSetActiveCell}
        handleSetActiveCellNormal={handleSetActiveCellNormal}
      />
    )
    : (
      <DataCell 
        style={style} 
        value={value} 
        column={columnIndex} 
        activeCell={activeCell}
        isSelectionMode={isSelectionMode}
        row={rowIndex} 
        columnCount={columnCount}
        rowCount={rowCount}
        isActiveCell={isActiveCell}
        handleSetActiveCell={handleSetActiveCell} 
        handleSetActiveCellEdit={handleSetActiveCellEdit}
        handleActiveCellArrowEvent={handleActiveCellArrowEvent}
        handleSelectionStart={handleSelectionStart}
        handleSelectionOver={handleSelectionOver}
        handleSelectionEnd={handleSelectionEnd}
      />
    )
  );
};

const Cell = ({ style, data, columnIndex, rowIndex }) => {
  const { 
    sheet, 
    activeCell, 
    isActiveCellEditMode,

    columnCount,
    rowCount,
    isSelectionMode,

    handleChangeCellValue, 
    handleSetActiveCellEdit, 
    handleSetActiveCell,
    handleSetActiveCellNormal,
    handleActiveCellArrowEvent,

    handleSelectionStart,
    handleSelectionOver,
    handleSelectionEnd
  } = data;

  let value;
  let Component;

  if(columnIndex > 0 && rowIndex > 0){
    value = sheet.row(rowIndex).cell(columnIndex).value();

    Component = (
      <EditableCell 
        style={style} 
        value={value} 
        columnIndex={columnIndex} 
        rowIndex={rowIndex} 
        activeCell={activeCell} 
        isActiveCellEditMode={isActiveCellEditMode}
        isSelectionMode={isSelectionMode}
        columnCount={columnCount}
        rowCount={rowCount}
        handleSetActiveCell={handleSetActiveCell}
        handleChangeCellValue={handleChangeCellValue}
        handleSetActiveCellEdit={handleSetActiveCellEdit}
        handleSetActiveCell={handleSetActiveCell}
        handleSetActiveCellNormal={handleSetActiveCellNormal}
        handleActiveCellArrowEvent={handleActiveCellArrowEvent}
        handleSelectionStart={handleSelectionStart}
        handleSelectionOver={handleSelectionOver}
        handleSelectionEnd={handleSelectionEnd}
      />
    );
  } else {
    const { column, row } = activeCell;
    const isActiveHeader = columnIndex === column || rowIndex === row;

    if(columnIndex > 0 && rowIndex === 0) {
      value = columnNumberToName(columnIndex);
    } else if(columnIndex === 0 && rowIndex > 0) {
      value = rowIndex;
    }


    Component = (
      <HeaderCell 
        style={style} 
        value={value}
        isActiveHeader={isActiveHeader}
      />
    );
  }

  return Component;
};

export default Cell;