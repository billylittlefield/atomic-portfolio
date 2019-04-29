import React, { useState } from "react";

import Header from "components/Header";
import NodeTree from "components/NodeTree";
import NodePage from "components/NodePage";
import nodeTree from "static/nodes";

export default function() {
  const [selectedNode, setSelectedNode] = useState(lookupNode("Billy Littlefield"));
  const [isNodePageHidden, setIsNodePageHidden] = useState(false);
  const [isFadeTransitioning, setIsFadeTransitioning] = useState(false);
  const [futureSelectedNode, setFutureSelectedNode] = useState(selectedNode);

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

    if (node.name === "Résumé") {
      window.open('src/littlefield-resume.pdf');
      return;
    }

    if (selectedNode && node.name === selectedNode.name && !isNodePageHidden) {
      return;
    }

    setFutureSelectedNode(node);
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
    setIsFadeTransitioning(true);
    setTimeout(() => {
      setSelectedNode(null);
      setIsFadeTransitioning(false);
    }, 500);
  }

  return (
    <>
      <Header 
        node={lookupNode("Billy Littlefield")}
        isHidden={isNodePageHidden}
        isFadeTransitioning={isFadeTransitioning}
        selectNode={selectNode}
        focusNodeTree={focusNodeTree}
        selectedNode={futureSelectedNode}
        lookupNode={lookupNode}
      />
      <NodePage
        node={selectedNode}
        selectNode={selectNode}
        isHidden={isNodePageHidden || isFadeTransitioning}
      />
      <NodeTree
        selectNode={selectNode}
        focusNodeTree={focusNodeTree}
        isFocused={isNodePageHidden}
      />
    </>
  );
}
