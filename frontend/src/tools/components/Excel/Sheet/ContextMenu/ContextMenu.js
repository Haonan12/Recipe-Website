import React from "react";

import { ContextMenu, MenuItem, SubMenu } from "react-contextmenu";

import "./ContextMenu.scss";

const SheetContextSubMenu = ({ children }) => (
  <SubMenu>
    {children}
  </SubMenu>
);

const MenuIcon = ({ icon, mdiIcon }) => (
  <div className={`menuItem__icon ${mdiIcon ? mdiIcon : ""}`}>
    {!mdiIcon && icon}
  </div>
);

const MenuTextContent = ({
  text,
  command
}) => (
  <div className="menuItem__textContent">
    <div>{text}</div>
    <div>{command}</div>
  </div>
);

const SheetContextMenuItem = ({
  icon,
  mdiIcon,
  text,
  command,
  handleClick
}) => (
  <MenuItem
    className="menuItem"
    onClick={handleClick}
  >
    <MenuIcon 
      icon={icon}
      mdiIcon={mdiIcon}
    />
    <MenuTextContent
      text={text}
      command={command}
    />
  </MenuItem>
);

// ! HARD-CODED WIDTH!! 
const SheetContextMenu = () => {

  return (
    <ContextMenu
      id="sheetWindowContainer"
      className="contextMenu"
    >
      <SheetContextMenuItem
        mdiIcon="mdi mdi-content-cut"
        text="Cut"
        command="Ctrl+X"
      />
      <SheetContextMenuItem
        mdiIcon="mdi mdi-arrange-bring-forward"
        text="Copy"
        command="Ctrl+C"
      />
      <SheetContextMenuItem
        mdiIcon="mdi mdi-clipboard"
        text="Paste"
        command="Ctrl+V"
      />
      <hr className="menuDivider"/>
      <SheetContextMenuItem
        text="Insert row"
      />
      <SheetContextMenuItem
        text="Insert column"
      />
    </ContextMenu>
  );
};

export default SheetContextMenu;