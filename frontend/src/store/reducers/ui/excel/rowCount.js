import { createReducer } from "store/tools/setup";

import { DEFAULT_EXCEL_ROWS } from "constants/excel";

const updateRowCount = (_state, { rowCount }) => rowCount;

const resetRowCount = () => DEFAULT_EXCEL_ROWS;

const rowCountReducer = createReducer(DEFAULT_EXCEL_ROWS, { UPDATE_ROW_COUNT: updateRowCount, RESET_ROW_COUNT: resetRowCount });

export default rowCountReducer;