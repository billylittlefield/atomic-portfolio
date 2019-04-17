import React, { useState } from 'react';

import NodeTree from 'components/NodeTree'
import NodePage from 'components/NodePage'

export default function() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [isNodePageHidden, setIsNodePageHidden] = useState(true);
  
  function selectNode(node) {
    if (selectedNode == null || isNodePageHidden) {
      setSelectedNode(node);
      setIsNodePageHidden(false);
    } else {
      setIsNodePageHidden(true);
    }
  }

  return (
    <>
      <NodeTree 
        selectNode={selectNode}
        isFocused={isNodePageHidden}
      />
      <NodePage node={selectedNode} isHidden={isNodePageHidden} />
    </>
  )
}
