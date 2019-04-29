import React from 'react';
import nodeTree from "static/nodes";

export default function(props) {

  function renderLinks() {
    return (
      <div className="header-links flex">
        {props.node.links.map((link ,index) => {
          let node = props.lookupNode(link.payload);
          let isSelected = false;
          if ((node.children && node.children.map(n => n.name).includes(props.selectedNode.name)) || node.name === props.selectedNode.name) {
            isSelected = true
          }
          return (
            <a 
              onClick={() => link.payload ? props.selectNode(link.payload) : null}
              key={index}
              href={link.url}
              target="_blank"
              style={isSelected ? {fontWeight: "800"} : {}}
            >
              {link.text}
            </a>
          )
        })}
      </div>
    )
  }
  
  return (
    <div className={`header ${props.isHidden ? 'hidden' : ''}`}>
      <h1 onClick={props.focusNodeTree}>Billy Littlefield</h1>
      {renderLinks()}
    </div>
  )
}
