import * as d3 from "d3";
import React, { Component } from "react";

class BubbleChart extends Component {
  componentDidMount() {
    this.drawChart();
  }

  drawChart() {
    var promise = [];
    let bubbleJson = require("./data/bubble.json");
    promise.push(bubbleJson);
    Promise.all(promise).then((dataTemp) => {
      let data = dataTemp[0];
      var width = 800;
      var height = 730;
      let pack = (data) =>
        d3.pack().size([width, height]).padding(3)(
          d3
            .hierarchy(data)
            .sum((d) => 2 * d.value)
            .sort((a, b) => b.value - a.value)
        );

      var root = pack(data);
      let focus = root;
      let view;

      var svg = d3
        .select("#bubble")
        .append("svg")
        .attr("width", 840)
        .attr("height", 800)
        .style("display", "inline")
        .style("margin", "0 -14px")
        .style("background", "white")
        .style("cursor", "pointer")
        .on("click", (event) => zoom(event, root));

      var node = svg
        .append("g")
        .selectAll("circle")
        .data(root.descendants().slice(1))
        .join("circle")
        .attr("cx", width / 2)
        .attr("cy", height / 2)
        .attr("fill", (d) => (d.children ? d.data.color : "white"))
        .attr("pointer-events", (d) => (!d.children ? "none" : null))
        .on("mouseover", function () {
          d3.select(this).attr("stroke", "#000");
        })
        .on("mouseout", function () {
          d3.select(this).attr("stroke", null);
        })
        .on(
          "click",
          (event, d) => focus !== d && (zoom(event, d), event.stopPropagation())
        );

      var label = svg
        .append("g")
        .style("font", "16px sans-serif")
        .style("font-weight", "bold")
        .attr("pointer-events", "none")
        .attr("text-anchor", "middle")
        .selectAll("text")
        .data(root.descendants())
        .join("text")
        .attr("x", width / 2)
        .attr("y", height / 2)
        .style("fill-opacity", (d) => (d.parent === root ? 1 : 0))
        .style("display", (d) => (d.parent === root ? "inline" : "none"))
        .text((d) => d.data.name);

      function zoomTo(v) {
        var k = width / v[2];

        view = v;

        label.attr(
          "transform",
          (d) => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`
        );
        node.attr(
          "transform",
          (d) => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`
        );
        node.attr("r", (d) => d.r * k);
      }
      zoomTo([root.x, root.y, root.r * 2]);

      function zoom(event, d) {
        focus = d;

        var transition = svg
          .transition()
          .duration(event.altKey ? 7500 : 750)
          .tween("zoom", (d) => {
            var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
            return (t) => zoomTo(i(t));
          });

        label
          .filter(function (d) {
            return d.parent === focus || this.style.display === "inline";
          })
          .transition(transition)
          .style("fill-opacity", (d) => (d.parent === focus ? 1 : 0))
          .on("start", function (d) {
            if (d.parent === focus) this.style.display = "inline";
          })
          .on("end", function (d) {
            if (d.parent !== focus) this.style.display = "none";
          });
      }
    });
  }
  render() {
    return (
      <div>
        <h2>Zoomable Circle Packing of Regional Voting</h2>
        <div style={{ marginLeft: "40px" }} id="bubble"></div>
      </div>
    );
  }
}

export default BubbleChart;
