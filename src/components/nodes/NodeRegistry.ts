// import { renderHeader } from './HeaderNode';
import { renderText } from "./html/TextNode";
// import { renderDiv } from './DivNode';
// import SectionNode from './SectionNode';
// import { renderUL } from './ULNode'; // Import the new render function
import renderUL from "./html/ULNode";
import renderHeader from "./html/HeaderNode";
import renderDiv from "./html/DivNode";

export const nodeRegistry = {
  //   header: renderHeader,
  TextNode: renderText,
  ULNode: renderUL,
  HeaderNode: renderHeader,
  DivNode: renderDiv,
  //   div: renderDiv,
  //   section: SectionNode,
  //   ul: renderUL, // Add the new node type to the registry

  // Add other node types and their render functions here
};
