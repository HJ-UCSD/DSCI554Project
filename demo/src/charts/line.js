import * as d3 from "d3";
import React, { Component } from "react";
import voterTurnout from "./data/voter_turnout.csv";

class LineChart extends Component {
  componentDidMount() {
    this.drawChart();
  }

  drawChart() {
    var parseTime = d3.timeParse("%Y");

    d3.csv(voterTurnout, function (d) {
      d.Year = parseTime(d.Year);
      return d;
    }).then(function (data) {
      var svg = d3
          .select("#linechart")
          .append("svg")
          .attr("width", 900)
          .attr("height", 500),
        margin = {
          top: 10,
          right: 20,
          bottom: 30,
          left: 50,
        },
        width = 800,
        height = 400,
        g = svg
          .append("g")
          .attr(
            "transform",
            "translate(" + margin.left + "," + margin.top + ")"
          );

      var x = d3.scaleTime().rangeRound([0, width]);

      var y = d3.scaleLinear().rangeRound([height, 0]);

      var line = d3
        .line()
        .x(function (d) {
          return x(d.Year);
        })
        .y(function (d) {
          return y(d.Turnout);
        });

      x.domain(
        d3.extent(data, function (d) {
          return d.Year;
        })
      );
      y.domain([
        48,
        d3.max(data, function (d) {
          return d.Turnout;
        }),
      ]);

      g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

      g.append("g")
        .call(d3.axisLeft(y))
        .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Turnout Percentage")
        .style("font-size", "14px");

      g.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", line);

      svg
        .selectAll("circles")
        .data(data)
        .enter()
        .append("circle")
        .attr("fill", "red")
        .attr("stroke", "none")
        .attr("cx", function (d) {
          return x(d.Year) + margin.left;
        })
        .attr("cy", function (d) {
          return y(d.Turnout) + margin.top;
        })
        .attr("r", 9)
        .on("mouseover", function (d, i) {
          d3.select(this).transition().duration("50").attr("stroke", "black");
        })
        .on("mouseout", function (d, i) {
          d3.select(this).transition().duration("50").attr("stroke", "none");
        })
        .append("svg:title")
        .text(function (d) {
          return d.Turnout + "%";
        });

      svg
        .append("text")
        .attr("x", 900 / 2)
        .attr("y", -margin.top / 2 + 20)
        .attr("text-anchor", "middle")
        .attr("class", "scatterplot-title")
        .text("Voter Turnout for US Presidential Elections ");

      svg
        .append("text")
        .attr("x", 900 / 2)
        .attr("y", height + margin.bottom + 10)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Year");
    });
  }
  render() {
    return <div id="linechart"></div>;
  }
}

export default LineChart;
