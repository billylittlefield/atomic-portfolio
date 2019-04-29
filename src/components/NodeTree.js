import { event as d3event, select as d3select } from "d3-selection";
import { drag as d3drag } from "d3-drag";
import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter,
  forceCollide
} from "d3-force";
import React from "react";

import nodeTree from "static/nodes";

const depthSettings = [
  {
    radius: 100,
    fontSize: "36px",
    // fill: "#6959fd"
    fill: "#d27bec"
  },
  {
    radius: 50,
    fontSize: "24px",
    fill: "#42d3f1"
  },
  {
    radius: 40,
    fontSize: "18px",
    fill: "#65cc65"
  }
];

function drag(simulation) {
  function dragstarted(d) {
    if (!d3event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(d) {
    d.fx = d3event.x;
    d.fy = d3event.y;
  }

  function dragended(d) {
    if (!d3event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  return d3drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended);
}

function getUniqueId() {
  return (
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 9) +
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
}

export default class NodeTree extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.createNodeTree();
    this.boundRedraw = this.redraw.bind(this);
    window.addEventListener("resize", this.boundRedraw);
  } 

  componentWillDestroy() {
    window.removeEventListener("resize", this.boundRedraw);
  }

  redraw() {
    this.simulation
      .force(
        "center",
        forceCenter(
          document.querySelector(".node-tree").clientWidth / 2,
          document.querySelector(".node-tree").clientHeight / 2
        )
      )
      .restart();
  }

  createNodeTree() {
    const svg = this.node;
    d3select(svg).on('click', () => {
      if (!this.props.isFocused) {
        this.props.focusNodeTree();
      }
    })
    const nodes = this.createNodes(nodeTree, 0, null);
    const links = this.createLinks(nodes);
    const simulation = this.createForceSimulation(nodes, links);
    const linkElements = this.addLinksToSimulation(svg, links);
    const nodeElements = this.addNodesToSimulation(svg, nodes, simulation);
    this.animateSimulation(simulation, linkElements, nodeElements);
    this.simulation = simulation;
  }

  createNodes(routeNode, depth, parent) {
    let nodes = [];
    let node = {
      ...routeNode,
      description: routeNode.description,
      depth,
      parent,
      id: getUniqueId()
    };
    nodes.push(node);
    if (routeNode.children && routeNode.children.length > 0) {
      routeNode.children.forEach(child => {
        nodes = nodes.concat(this.createNodes(child, depth + 1, node.id));
      });
    }
    return nodes;
  }

  createLinks(nodes) {
    let links = [];
    nodes.forEach(node => {
      if (node.parent == null) {
        return;
      }
      links.push({
        source: node.id,
        target: node.parent
      });
    });
    return links;
  }

  createForceSimulation(nodes, links) {
    return forceSimulation(nodes)
      .force("link", forceLink(links).id(d => d.id))
      .force("charge", forceManyBody())
      .force(
        "center",
        forceCenter(
          document.querySelector(".node-tree").clientWidth / 2,
          document.querySelector(".node-tree").clientHeight / 2
        )
      )
      .force(
        "collision",
        forceCollide().radius(d => depthSettings[d.depth].radius * 1.5)
      );
  }

  addLinksToSimulation(svg, links) {
    return d3select(svg)
      .append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(links)
      .join("line");
  }

  addNodesToSimulation(svg, nodes, simulation) {
    // Create group element for each node
    const nodeElements = d3select(svg)
      .append("g")
      .attr("class", "nodes")
      .selectAll(".node")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .on("mouseover", function(d) {
        d3select(this)
          .select("circle")
          .attr("stroke-width", "16px")
          .attr(
            "style",
            "transition: stroke-width 0.4s, fill-opacity 0.4s, opacity 0.4s;"
          );
          if (d.image) {
            d3select(this)
              .select('circle')
              .attr("fill-opacity", "0")
            d3select(this)
              .selectAll("text")
              .attr(
                "style",
                "transition: stroke-width 0.4s, fill 0.4s, opacity 0.4s;"
              )
              .attr("opacity", "0");
          }
      })
      .on("mouseout", function(d) {
        d3select(this)
          .select("circle")
          .attr("stroke-width", "4px")
          .attr("style", "transition: stroke-width 1s, fill-opacity 1s, opacity 1s;")
          .attr("fill-opacity", "1");
        d3select(this)
          .selectAll("text")
          .attr("style", "transition: stroke-width 1s, fill 1s, opacity 1s;")
          .attr("opacity", "1");
      })
      .on("click", d => {
        if (this.props.isFocused) {
          this.props.selectNode(d);
          d3event.stopPropagation();
        }
      })
      .call(drag(simulation));

    // Add background image that will be visible when hovered
    nodeElements
      .append("image")
      .attr("x", 0)
      .attr("y", 0)
      .attr("height", d => depthSettings[d.depth].radius * 2)
      .attr("width", d => depthSettings[d.depth].radius * 2)
      .attr("xlink:href", d => (d.image ? `images/${d.image}` : ""))
      .attr("href", d => (d.image ? `images/${d.image}` : ""))
      .attr("clip-path", d => `url(#circle-${d.depth}-clip)`)
      .attr(
        "transform",
        d =>
          `translate(-${depthSettings[d.depth].radius},-${
            depthSettings[d.depth].radius
          })`
      );

    // Add circle that will cover the image until hovered
    nodeElements
      .append("circle")
      .attr("class", "circle-cover")
      .attr("r", d => depthSettings[d.depth].radius)
      .attr("fill", d => depthSettings[d.depth].fill)
      .attr("stroke-width", "4px")
      .attr("stroke", "#fff");

    // Add text labels in the circles
    nodeElements
      .append("text")
      .attr("z-index", "3")
      .attr("font-size", d => depthSettings[d.depth].fontSize)
      .attr("text-anchor", "middle")
      .attr("dy", d => d.name.split(" ").length === 2 ? "-0.2em" : ".3em")
      .text(d => d.name.split(" ").length === 2 ? d.name.split(" ")[0] : d.name);

    nodeElements
      .filter(d => d.name.split(" ").length === 2)
      .append("text")
      .attr("z-index", "3")
      .attr("font-size", d => depthSettings[d.depth].fontSize)
      .attr("text-anchor", "middle")
      .attr("dy", "0.8em")
      .text(d => d.name.split(" ")[1]);
    return nodeElements;
  }

  animateSimulation(simulation, linkElements, nodeElements) {
    simulation.on("tick", () => {
      linkElements
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

      nodeElements.attr("transform", d => `translate(${d.x},${d.y})`);
    });
  }
  
  
  render() {
    const [ rad0, rad1, rad2 ] = depthSettings.map(d => d.radius);
    return (
      <div className={`node-tree ${this.props.isFocused ? "focused" : "unfocused"}`}>
        <div className="tree-overlay"></div>
        <svg>
          <g
            id="node-tree__grouping"
            className={this.props.isFocused ? "focused" : "unfocused"}
            ref={node => (this.node = node)}
            height="100%"
            width="100%">
            <defs>
              <clipPath id="circle-0-clip">
                <circle cx={rad0} cy={rad0} r={rad0} />
              </clipPath>
              <clipPath id="circle-1-clip">
                <circle cx={rad1} cy={rad1} r={rad1} />
              </clipPath>
              <clipPath id="circle-2-clip">
                <circle cx={rad2} cy={rad2} r={rad2} />
              </clipPath>
            </defs>
          </g>
        </svg>
      </div>
    );
  }
}
