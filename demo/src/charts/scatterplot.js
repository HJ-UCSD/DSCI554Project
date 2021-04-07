import * as d3 from "d3";
import React, { Component } from "react";
import incomeState from "./data/median_hh_income_by_state.csv";
import incomeCounty from "./data/median_hh_income_by_county.csv";
import "./scatterplot.css";

class ScatterPlot extends Component {
  componentDidMount() {
    this.drawChart();
  }

  drawChart() {
    var margin = { top: 70, left: 150, bottom: 100, right: 600 };
    var width = 1200; //- margin.left;
    var height = 900; // - margin.top - margin.bottom;

    var y = d3.scaleLinear().range([height, 0]);

    var x = d3.scaleLinear().range([0, width]);
    var xAxis;

    var rScale = d3
      .scaleSqrt() // should be sqrt instead
      .domain([0, 1000000])
      .range([0, 10]);

    var rScaleCounty = d3.scaleLog().domain([10, 100000]).range([0, 10]);

    var keys = [
      800000,
      600000,
      400000,
      200000,
      0,
      -200000,
      -400000,
      -600000,
      -800000,
      -4000000,
    ];
    var colorScale = d3
      .scaleLinear()
      .domain(keys)
      .range([
        "#CC0000",
        "#FF0000",
        "#FF3333",
        "#FF6666",
        "#FFCCCC",
        "#9999FF",
        "#6666FF",
        "#3333FF",
        "#0000FF",
        "#0000CC",
      ]);

    var delay = function (d, i) {
      return i * 50;
    };

    var all;
    var counties = [];
    var current;
    var newKey = "counties";
    var newValMap;
    var result;

    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function responsivefy(svg) {
      const container = d3.select(svg.node().parentNode),
        width = parseInt(svg.style("width"), 10),
        height = parseInt(svg.style("height"), 10),
        aspect = width / height;

      svg
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("preserveAspectRatio", "xMinYMid")
        .call(resize);

      d3.select(window).on("resize." + container.attr("id"), resize);

      function resize() {
        const w = window.innerWidth;
        svg.attr("width", w / 1.7);
        svg.attr("height", Math.round(w / (aspect * 1.7)));
      }
    }

    //TOOLTIP INIT
    var div = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip-donut")
      .style("opacity", 0);

    //TOOLTIP TEXT FUNCTION
    function tooltipText(i, isCounty) {
      if (!isCounty) {
        // state level results for tooltip
        var beginningState =
          i.state +
          "\nMedian Household Income: " +
          "$" +
          numberWithCommas(parseFloat(i.state_median_hh_inc).toFixed(2));
        var clintonWinState =
          "\nHillary Clinton votes: " +
          numberWithCommas(i.clinton16) +
          " (" +
          parseFloat((i.clinton16 / i["State Vote Total"]) * 100).toFixed(2) +
          "%" +
          ")\nDonald Trump votes: " +
          numberWithCommas(i.trump16) +
          " (" +
          parseFloat(i.trump16_pct * 100).toFixed(2) +
          "%" +
          ")\nOther votes: " +
          numberWithCommas(i.other16) +
          " (" +
          parseFloat((i.other16 / i["State Vote Total"]) * 100).toFixed(2) +
          "%" +
          ")\nHillary Clinton won by " +
          numberWithCommas(Math.abs(i.difference)) +
          " votes";
        var trumpWinState =
          "\nDonald Trump votes: " +
          numberWithCommas(i.trump16) +
          " (" +
          parseFloat(i.trump16_pct * 100).toFixed(2) +
          "%" +
          ")\nHillary Clinton votes: " +
          numberWithCommas(i.clinton16) +
          " (" +
          parseFloat((i.clinton16 / i["State Vote Total"]) * 100).toFixed(2) +
          "%" +
          ")\nOther votes: " +
          numberWithCommas(i.other16) +
          " (" +
          parseFloat((i.other16 / i["State Vote Total"]) * 100).toFixed(2) +
          "%" +
          ")\nDonald Trump won by " +
          numberWithCommas(i.difference) +
          " votes";

        if (i.difference < 0) {
          // Clinton won
          return beginningState + clintonWinState;
        } else {
          // Trump won
          return beginningState + trumpWinState;
        }
      } else {
        // county level results for tooltip
        var beginningCounty =
          i.county +
          " County, " +
          i.state +
          "\nMedian Household Income: " +
          "$" +
          numberWithCommas(parseFloat(i.cmedian_hh_inc).toFixed(2));
        var clintonWinCounty =
          "\nHillary Clinton votes: " +
          numberWithCommas(i.cclinton16) +
          " (" +
          parseFloat((i.cclinton16 / i["County Vote Total"]) * 100).toFixed(2) +
          "%" +
          ")\nDonald Trump votes: " +
          numberWithCommas(i.ctrump16) +
          " (" +
          parseFloat(i.ctrump16_pct * 100).toFixed(2) +
          "%" +
          ")\nOther votes: " +
          numberWithCommas(i.cotherpres16) +
          " (" +
          parseFloat((i.cotherpres16 / i["County Vote Total"]) * 100).toFixed(
            2
          ) +
          "%" +
          ")\nHillary Clinton won by " +
          numberWithCommas(Math.abs(i.cdifference)) +
          " votes";
        var trumpWinCounty =
          "\nDonald Trump votes: " +
          numberWithCommas(i.ctrump16) +
          " (" +
          parseFloat(i.ctrump16_pct * 100).toFixed(2) +
          "%" +
          ")\nHillary Clinton votes: " +
          numberWithCommas(i.cclinton16) +
          " (" +
          parseFloat((i.cclinton16 / i["County Vote Total"]) * 100).toFixed(2) +
          "%" +
          ")\nOther votes: " +
          numberWithCommas(i.cotherpres16) +
          " (" +
          parseFloat((i.cotherpres16 / i["County Vote Total"]) * 100).toFixed(
            2
          ) +
          "%" +
          ")\nDonald Trump won by " +
          numberWithCommas(i.cdifference) +
          " votes";

        if (i.cdifference < 0) {
          // Clinton won
          return beginningCounty + clintonWinCounty;
        } else {
          // Trump won
          return beginningCounty + trumpWinCounty;
        }
      }
    }

    //SVG initialization
    var svg = d3
      .select("#scatterplot")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .call(responsivefy)
      .append("g")
      .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

    Promise.all([d3.csv(incomeState), d3.csv(incomeCounty)])
      .then(function (files) {
        all = files[0];
        counties = files[1];
        // convert string values into number values for all and counties
        for (var i = 0; i < all.length; i++) {
          var obj = all[i];
          for (var prop in obj) {
            if (
              obj.hasOwnProperty(prop) &&
              obj[prop] !== null &&
              !isNaN(obj[prop])
            ) {
              obj[prop] = +obj[prop];
            }
          }
        }

        for (var ndx = 0; ndx < counties.length; ndx++) {
          var countyObj = counties[ndx];
          for (var countyProp in countyObj) {
            if (
              countyObj.hasOwnProperty(countyProp) &&
              countyObj[countyProp] !== null &&
              !isNaN(countyObj[countyProp])
            ) {
              countyObj[countyProp] = +countyObj[countyProp];
            }
          }
        }
        // map key of name to list of objects of name
        result = counties.reduce(function (r, a) {
          r[a.state] = r[a.state] || [];
          r[a.state].push(a);
          return r;
        }, Object.create(null));

        // loop through result and get array of objects as value to all data and add to map
        newValMap = new Map();
        for (var key in result) {
          newValMap.set(key, result[key]);
        }

        // loop through all data and add new key and value to all data if name === map key
        all.forEach((state) => {
          if (newValMap.has(state.state)) {
            // add arr of counties to all data object with key of counties
            state[newKey] = newValMap.get(state.state);
          }
        });

        filter("#all");

        toggleFilter("#all");

        draw();

        // Legends
        svg
          .append("text")
          .attr("x", width + margin.right / 2)
          .attr("y", margin.bottom)
          .attr("text-anchor", "middle")
          .style("font-size", "30px")
          .text("Margin of Votes Won by Donald Trump");

        svg
          .append("text")
          .attr("x", width + margin.right / 2)
          .attr("y", margin.bottom + margin.bottom / 3)
          .attr("text-anchor", "middle")
          .style("font-size", "30px")
          .text("vs. Hillary Clinton");

        svg
          .selectAll("keys")
          .data(keys)
          .enter()
          .append("rect")
          .attr("x", width + margin.right / 3)
          .attr("y", (d, i) => {
            return margin.top + 85 + i * 1.3 * 30;
          })
          .attr("width", 30)
          .attr("height", 30)
          .attr("fill", (d) => colorScale(d));

        svg
          .selectAll("keys")
          .data(keys)
          .enter()
          .append("text")
          .attr("x", width + margin.right / 3 + 50)
          .attr("y", (d, i) => {
            return margin.top + 105 + i * 1.3 * 30;
          })
          .style("font-size", "30px")
          .attr("alignment-baseline", "middle")
          .text(function (d, i) {
            return numberWithCommas(d);
          });

        const legend = svg
          .append("g")
          .attr("fill", "#474747")
          .attr("transform", "translate(1465,740)")
          .attr("text-anchor", "middle")
          .style("font", "30px sans-serif")
          .selectAll("g")
          .data([1e6, 5e6, 1e7])
          .join("g");

        legend
          .append("circle")
          .attr("fill", "none")
          .attr("stroke", "#ccc")
          .attr("cy", (d) => -rScale(d))
          .attr("r", (d) => 1.25 * rScale(d));

        legend
          .append("text")
          .attr("y", (d) => -3.5 * rScale(d) + 40)
          .attr("x", (d) => 70)
          .style("font-size", "30px")
          .text(d3.format(".1s"));

        legend
          .append("text")
          .attr("dy", "-4em")
          .style("font", "30px sans-serif")
          .text("Total Number of Votes");
      })
      .catch(function (err) {
        // handle error here
        console.log("Files not found!");
      });

    //filter event handlers
    d3.select("#all").on("click", () => {
      filter("#all");
      toggleFilter("#all");

      redrawAll();
      var circles = svg.selectAll("circle").data(current, (d) => d.state);
      circles.on("click", function (d, i) {
        //current = [i];
        if (i.state !== "Alaska") {
          current = i.counties;
          redraw();
        } else {
          alert(
            "Alaska is not divided into counties, so county-level data is not available."
          );
        }
      });
    });

    function filter(mode) {
      if (mode === "#all") {
        current = JSON.parse(JSON.stringify(all));
      }
    }

    function filterOff(id) {
      d3.select(id).style("background-color", "#ddd");
    }

    function toggleFilter(id) {
      d3.select(id).style("background-color", "#e25a0077");
    }

    function redraw() {
      div.style("opacity", 0);
      filterOff("#all");
      // update x axis domain
      x.domain(
        d3.extent(current, function (d) {
          return d.cmedian_hh_inc;
        })
      ).nice();

      d3.select(".x_axis").transition().duration(500).call(xAxis);

      ////////////////////////////////
      // DATA JOIN FOR CIRCLES.
      var circles = svg.selectAll("circle").remove().exit().data(current);

      // UPDATE.
      circles
        .transition()
        .duration(500)
        .delay(delay)
        .attr("cx", (d) => x(d.cmedian_hh_inc))
        .attr("r", (d) => 1.25 * rScaleCounty(d["County Vote Total"]));

      // ENTER.
      var dots = circles
        .enter()
        .append("circle")
        .attr("cx", (d) => x(d.cmedian_hh_inc))
        .attr("cy", (d) => y(0))
        .attr("r", (d) => 1.25 * rScaleCounty(d["County Vote Total"]));

      dots
        .transition()
        .duration(500)
        .attr("cx", (d) => x(d.cmedian_hh_inc))
        .attr("cy", (d) => y(d.ctrump16_pct * 100))
        .attr("r", (d) => 1.25 * rScaleCounty(d["County Vote Total"]))
        .attr("fill", (d) => colorScale(d.cdifference));

      dots
        .on("mouseover", function (d, i) {
          d3.select(this)
            .transition()
            .duration(50)
            .attr("opacity", 0.7)
            .attr("stroke-width", 10);

          div
            .transition()
            .duration(50)
            .style("opacity", 1)
            .text(tooltipText(i, true));
        })
        .on("mousemove", function (d, i) {
          div
            .html(tooltipText(i, true))
            .style("top", d.pageY - 10 + "px")
            .style("left", d.pageX + 10 + "px");
        })
        .on("mouseout", function (d, i) {
          d3.select(this).transition().duration(50).attr("opacity", 0.95);

          div.transition().duration(0).style("opacity", 0);
        });

      const legend = svg
        .append("g")
        .attr("fill", "#474747")
        .attr("transform", "translate(1465,740)")
        .attr("text-anchor", "middle")
        .style("font", "30px sans-serif")
        .selectAll("g")
        .data([1e6, 5e6, 1e7])
        .join("g");

      legend
        .append("circle")
        .attr("fill", "none")
        .attr("stroke", "#ccc")
        .attr("cy", (d) => -rScaleCounty(d))
        .attr("r", (d) => 1.25 * rScaleCounty(d));
    }

    function redrawAll() {
      x.domain(
        d3.extent(current, function (d) {
          return d.state_median_hh_inc;
        })
      ).nice();

      d3.select(".x_axis").transition().duration(500).call(xAxis);

      ////////////////////////////////
      // DATA JOIN FOR CIRCLES.
      var circles = svg.selectAll("circle").remove().exit().data(current);

      // UPDATE.
      circles
        .transition()
        .duration(500)
        .delay(delay)
        .attr("cx", (d) => x(d.state_median_hh_inc))
        .attr("r", (d) => 1.25 * rScale(d["State Vote Total"]));

      // ENTER.
      var dots = circles
        .enter()
        .append("circle")
        .attr("cx", (d) => x(d.state_median_hh_inc))
        .attr("cy", (d) => y(0))
        .attr("r", (d) => 1.25 * rScale(d["State Vote Total"]));

      dots
        .transition()
        .duration(500)
        .attr("cx", (d) => x(d.state_median_hh_inc))
        .attr("cy", (d) => y(d.trump16_pct * 100))
        .attr("r", (d) => 1.25 * rScale(d["State Vote Total"]))
        .attr("fill", (d) => colorScale(d.difference));

      dots
        .on("mouseover", function (d, i) {
          d3.select(this)
            .transition()
            .duration(50)
            .attr("opacity", 0.7)
            .attr("stroke-width", 10);

          div
            .transition()
            .duration(50)
            .style("opacity", 1)
            .text(tooltipText(i, false));
        })
        .on("mousemove", function (d, i) {
          div
            .html(tooltipText(i, false))
            .style("top", d.pageY - 10 + "px")
            .style("left", d.pageX + 10 + "px");
        })
        .on("mouseout", function (d, i) {
          d3.select(this).transition().duration(50).attr("opacity", 0.95);

          div.transition().duration(0).style("opacity", 0);
        });

      const legend = svg
        .append("g")
        .attr("fill", "#474747")
        .attr("transform", "translate(1465,740)")
        .attr("text-anchor", "middle")
        .style("font", "30px sans-serif")
        .selectAll("g")
        .data([1e6, 5e6, 1e7])
        .join("g");

      legend
        .append("circle")
        .attr("fill", "none")
        .attr("stroke", "#ccc")
        .attr("cy", (d) => -rScale(d))
        .attr("r", (d) => 1.25 * rScale(d));
    }

    function draw() {
      // Add X axis date format
      x.domain(
        d3.extent(current, function (d) {
          return d.state_median_hh_inc;
        })
      ).nice();

      y.domain([0, 100]).nice();

      var circle = svg
        .selectAll("circle")
        .data(current)
        .enter()
        .append("circle")
        .attr("r", (d) => {
          return 1.25 * rScale(d["State Vote Total"]);
        })
        .attr("cx", function (d) {
          return x(d.state_median_hh_inc);
        })
        .attr("cy", function (d) {
          return y(d.trump16_pct * 100);
        })
        .attr("opacity", 0.95)
        .attr("fill", function (d) {
          return colorScale(d.difference);
        });

      xAxis = d3.axisBottom().scale(x).ticks(6, "d"); //ticks with format

      svg
        .append("g")
        .style("font-size", "30px")
        .attr("class", "x_axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

      var yAxis = d3.axisLeft().scale(y).ticks(5); //ticks with format

      svg
        .append("g")
        .style("font-size", "30px")
        .attr("class", "axis")
        .call(yAxis);

      circle
        .on("mouseover", function (d, i) {
          d3.select(this)
            .transition()
            .duration(50)
            .attr("opacity", 0.7)
            .attr("stroke-width", 10);

          div
            .transition()
            .duration(50)
            .style("opacity", 1)
            .text(tooltipText(i, false));
        })
        .on("mousemove", function (d, i) {
          div
            .html(tooltipText(i, false))
            .style("top", d.pageY - 10 + "px")
            .style("left", d.pageX + 10 + "px");
        })
        .on("mouseout", function (d, i) {
          d3.select(this).transition().duration(50).attr("opacity", 0.95);

          div.transition().duration(0).style("opacity", 0);
        });

      svg
        .append("text")
        .attr(
          "x",
          -(
            height +
            margin.top +
            margin.bottom +
            margin.left +
            margin.right / 4
          ) / 2
        )
        .attr("y", -margin.left * 0.7)
        .attr("transform", "rotate(-90)")
        .style("font-size", "40px")
        .append("tspan")
        .text("Percentage of Votes for Trump (%)");

      svg
        .append("text")
        .attr("x", width / 1.45)
        .attr("y", -margin.top / 10)
        .attr("text-anchor", "middle")
        .style("font-size", "40px")
        .style("font-family", "sans-serif")
        .text(
          "Percentage of Votes for Trump vs. Median Household Income by State and County"
        );

      svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom / 1.1)
        .attr("text-anchor", "middle")
        .style("font-size", "40px")
        .text("Median Household Income ($)");

      circle.on("click", function (d, i) {
        if (i.state !== "Alaska") {
          current = i.counties;
          redraw();
        } else {
          alert(
            "Alaska is not divided into counties, so county-level data is not available."
          );
        }
      });
    }
  }
  render() {
    return (
      <div id="scatter">
        <div className="commands">
          <span className="filter" id="all">
            Reset to Median Household Income by State
          </span>
        </div>
        <div id="scatterplot"></div>
      </div>
    );
  }
}

export default ScatterPlot;
