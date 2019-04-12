import * as d3 from "d3";
import React from 'react';

import routeTree from "static/route-tree";

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
};

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

export default class NodeTree extends React.Component {
  constructor(props) {
    super(props)
    this.nodes = [];
    this.nodeElements = null;
    this.links = [];
    this.linkElements = null;
    this.svg = null;
    this.simulation = null;
  }

  componentWillMount() {
    this.setupNodesAndLinks();
    this.createContainerSVG();
    this.createForceSimulation();
    this.addLinksToSimulation();
    this.addNodesToSimulation();
    this.animateSimulation();
  }

  setupNodesAndLinks() {
    this.createNodes(routeTree, 0, null);
    this.createLinks()
  }

  createNodes(node, depth, parent) {
    const index = this.nodes.length;
    this.nodes.push({
      name: node.name,
      image: node.image,
      depth,
      parent,
      index
    });
    if (node.children && node.children.length > 0) {
      node.children.forEach(child => {
        this.createNodes(child, depth + 1, index);
      });
    }
  }

  createLinks() {
    this.nodes.forEach(node => {
      if (node.parent == null) {
        return;
      }
      this.links.push({
        id: this.links.length,
        source: node.index,
        target: node.parent
      });
    });
  }

  createContainerSVG() {
    this.svg = d3
      .select("#main")
      .append("svg")
      .attr("id", "node-map-container");
  }

  createForceSimulation() {
    this.simulation = d3
      .forceSimulation(this.nodes)
      .force("link", d3.forceLink(this.links))
      .force("charge", d3.forceManyBody())
      .force(
        "center",
        d3.forceCenter(
          document.querySelector("html").clientWidth / 2,
          document.querySelector("html").clientHeight / 2
        )
      )
      .force(
        "collision",
        d3.forceCollide().radius(d => depthSettings[d.depth].radius * 1.5)
      );
  }

  addLinksToSimulation() {
    this.linkElements = this.svg
      .append("g")
      .selectAll("line")
      .data(this.links)
      .join("line");
  }

  addNodesToSimulation() {
    // Create group element for each node
    this.nodeElements = this.svg
      .append("g")
      .attr("class", "nodes")
      .selectAll(".node")
      .data(this.nodes)
      .enter()
      .append("g");

    // Add first circle to show default state
    this.nodeElements
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
      .call(drag(this.simulation));
    
    // Add second circle to show hover state
    this.nodeElements
      .append("circle")
      .attr('class', d => `node size-${d.depth}`)
      .attr("r", d => depthSettings[d.depth].radius)
      .attr('fill', d => d.image ? `url(#${d.image})` : '#fff')
      .attr('stroke-width', '4px')
      .attr('stroke', '#fff')
      .attr('opacity', '0')
      .on("mouseover", function(d) {
        d3.select(this).attr('stroke-width', '8px');
        d3.select(this).attr('opacity', '1');
        d3.select(this).select(() => this.nextElementSibling).attr('opacity', '0');
      })
      .on("mouseout", function(d) {
        d3.select(this).attr('stroke-width', '4px');
        d3.select(this).attr('opacity', '0');
        d3.select(this).select(() => this.nextElementSibling).attr('opacity', '1');
      })
      .call(drag(this.simulation));

    // Add text labels in the circles
    this.nodeElements
      .append("text")
      .attr('z-index', '3')
      .attr('font-size', d => depthSettings[d.depth].fontSize)
      .attr("text-anchor", "middle")
      .attr("dy", ".3em")
      .text(d => d.name);
  }

  animateSimulation() {
    this.simulation.on("tick", () => {
      this.linkElements
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);
  
      this.nodeElements
        .selectAll("circle")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);
      this.nodeElements
        .selectAll("text")
        .attr("x", d => d.x)
        .attr("y", d => d.y);
    });
  }

  render() {}
}
