import React, { useState } from "react";

import NodeTree from "components/NodeTree";
import NodePage from "components/NodePage";
import nodeTree from "static/nodes";

export default function() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [isNodePageHidden, setIsNodePageHidden] = useState(true);
  const [isFadeTransitioning, setIsFadeTransitioning] = useState(false);

  function lookupNode(nodeName) {
    function lookupHelper(node, name) {
      if (node.name === name) {
        return node;
      }
      if (node.children) {
        for (let child of node.children) {
          let lookupAnswer = lookupHelper(child, name);
          if (lookupAnswer) {
            return lookupAnswer;
          }
        }
      }
      return false;
    }
    return lookupHelper(nodeTree, nodeName);
  }

  function selectNode(node) {
    // If coming from link instead of node
    if (typeof node === "string") {
      node = lookupNode(node);
    }

    if (isNodePageHidden) {
      setSelectedNode(node);
      setIsNodePageHidden(false);
    } else {
      setIsFadeTransitioning(true);
      setTimeout(() => {
        setSelectedNode(node);
        setIsFadeTransitioning(false)
      }, 500);
    }
  }

  function focusNodeTree() {
    setIsNodePageHidden(true);
    setTimeout(() => {
      setSelectedNode(null);
    }, 500);
  }

  return (
    <>
      <NodeTree
        selectNode={selectNode}
        focusNodeTree={focusNodeTree}
        isFocused={isNodePageHidden}
      />
      <NodePage
        node={selectedNode}
        selectNode={selectNode}
        isHidden={isNodePageHidden || isFadeTransitioning}
      />
    </>
  );
}
