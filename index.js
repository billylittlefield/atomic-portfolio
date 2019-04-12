(function() {
  const routes = {
    name: "Billy Littlefield",
    image: "portrait",
    children: [
      {
        name: "About",
        children: [{
          name: "Bio"
        },{
          name: "Resume"
        },{
          name: "Contact"
        }]
      },
      {
        name: "Coding",
        children: [{
          name: "Dragon Pop"
        },{
          name: "JogLog"
        },{
          name: "Addebeats"
        },{
          name: "Morado"
        }]
      },
      {
        name: "Non-coding",
        children: [{
          name: "Bread"
        },{
          name: "Beer"
        },{
          name: "Photos"
        }]
      }
    ]
  };

  const nodes = [];
  const links = [];

  function createNodes(node, depth, parent) {
    const index = nodes.length;
    nodes.push({
      name: node.name,
      image: node.image,
      depth,
      parent,
      index,
    });
    if (node.children && node.children.length > 0) {
      node.children.forEach(child => {
        createNodes(child, depth + 1, index);
      });
    }
  }

  function createLinks(nodes) {
    nodes.forEach(node => {
      if (node.parent == null) {
        return;
      }
      links.push({
        id: links.length,
        source: node.index,
        target: node.parent
      });
    });
  }
  createNodes(routes, 0, null);
  createLinks(nodes);

  const depthSettings = {
    0: {
      radius: 150,
      fontSize: "48px",
      fill: "#6959fd"
    },
    1: {
      radius: 80,
      fontSize: "24px",
      fill: "#42d3f1"
    },
    2: {
      radius: 50,
      fontSize: "16px",
      fill: "#65cc65"
    }
  }

  const svg = d3
    .select("#main")
    .append("svg")
    .attr('id', 'node-map-container');

  const simulation = d3
    .forceSimulation(nodes)
    .force("link", d3.forceLink(links))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(document.querySelector('html').clientWidth / 2, document.querySelector('html').clientHeight / 2))
    .force(
      "collision",
      d3.forceCollide().radius(d => depthSettings[d.depth].radius * 1.5)
    );

  const link = svg
    .append("g")
    .selectAll("line")
    .data(links)
    .join("line")

  function drag(simulation) {
    function dragstarted(d) {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function dragended(d) {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return d3
      .drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
  }

  const node = svg
    .append("g")
    .attr("class", "nodes")
    .selectAll(".node")
    .data(nodes)
    .enter()
    .append("g");


  node
    .append("circle")
    .attr('class', 'circle-cover')
    .attr("r", d => depthSettings[d.depth].radius)
    .attr('fill', d => depthSettings[d.depth].fill)
    .attr('opacity', '1')
    .attr('stroke-width', '4px')
    .attr('stroke', '#fff')
    .on("mouseover", function(d) {
      d3.select(this).attr('opacity', '0');
      d3.select(this).attr('stroke-width', '8px');
    })
    .on("mouseout", function(d) {
      d3.select(this).attr('stroke-width', '4px');
      d3.select(this).attr('opacity', '1');
    })
    .call(drag(simulation));

  node
    .append("circle")
    .attr('class', d => `node size-${d.depth}`)
    .attr("r", d => depthSettings[d.depth].radius)
    .attr('fill', d => d.image ? `url(#${d.image})` : '#fff')
    .attr('stroke-width', '4px')
    .attr('stroke', '#fff')
    .attr('opacity', '0')
    .on("mouseover", function(d) {
      // d3.select(this).attr('fill', 'url(#portrait)');
      d3.select(this).attr('stroke-width', '8px');
      d3.select(this).attr('opacity', '1');
      // d3.select(this).attr('stroke', '#fff');
      d3.select(this).select(() => this.nextElementSibling).attr('opacity', '0');
    })
    .on("mouseout", function(d) {
      // d3.select(this).attr('fill', depthSettings[d.depth].fill);
      d3.select(this).attr('stroke-width', '4px');
      d3.select(this).attr('opacity', '0');
      d3.select(this).attr('stroke', '#fff');
      d3.select(this).select(() => this.nextElementSibling).attr('opacity', '1');
    })
    .call(drag(simulation));
  node
    .append("text")
    .attr('z-index', '3')
    .attr('font-size', d => depthSettings[d.depth].fontSize)
    .attr("text-anchor", "middle")
    .attr("dy", ".3em")
    .text(d => d.name);

  simulation.on("tick", () => {
    link
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);

    node
      .selectAll("circle")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y);
    node
      .selectAll("text")
      .attr("x", d => d.x)
      .attr("y", d => d.y);
  });
})();
