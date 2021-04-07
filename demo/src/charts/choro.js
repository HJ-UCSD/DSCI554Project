import * as d3 from "d3";
import * as topojson from "topojson";
import React, { Component } from "react";
import "./choro_style.css";
import countyV4 from "./data/2016county_v4.csv";

class Choro extends Component {
  componentDidMount() {
    this.drawChart();
  }

  drawChart() {
    var promises = [];
    let usJson = require("./data/us.json");
    promises.push(usJson);
    promises.push(d3.csv(countyV4));

    Promise.all(promises).then(function (values) {
      var us = values[0];
      var data = values[1];

      let formatPercent = d3.format(".1%");
      let formatDollars = d3.format("$,.0f");
      let formatAge = d3.format(".3n");

      let color = d3.scaleQuantize([0, 100], d3.schemeRdBu[8]);

      //console.log(data[0]);
      data = Object.assign(
        new Map(
          data.map(function (d) {
            return [
              d.id,
              [
                d.County, // 0
                d.ST,
                +d.Democrats2016,
                +d.Democrats2012,
                +d.Democrats2008,
                +d.LessThanHSDiploma, //5
                +d.AtLeastHSDiploma,
                +d.AtLeastBachelors,
                +d.GraduateDegree,
                +d.SchoolEnrollment,
                +d.MedianEarnings2010, // 10
                +d.ChildrenUnder6LivinginPoverty,
                +d.Adults65andOlderLivinginPoverty,
                +d.Poverty_Rate_below_federal_poverty_threshold,
                +d.WhiteCollar,
                +d.PinkCollar, // 15
                +d.BlueCollar,
                +d.White,
                +d.Black,
                +d.Hispanic,
                +d.Asian, //20
                +d.Amerindian,
                +d.MedianAge,
                +d.Children_Single_Parent,
              ],
            ];
          })
        )
      );

      // MAKE THE DROPDOWN MENU ---------------------------

      // dropdown choices correspond to indices in the data array
      var dropdown_choices = [
        {
          value: 2,
          text: "2016 Election Results",
          desc: "Votes for Dems in 2016 (%)",
          atype: "pol",
        },
        {
          value: 3,
          text: "2012 Election Results",
          desc: "Votes for Dems in 2012 (%)",
          atype: "pol",
        },
        {
          value: 4,
          text: "2008 Election Results",
          desc: "Votes for Dems in 2008 (%)",
          atype: "pol",
        },
        {
          value: 5,
          text: "% With Graduate Degree",
          desc: "Pop. with Graduate Degree (%)",
          atype: "per",
        },
        {
          value: 6,
          text: "% With < HS Diploma",
          desc: "Pop. with Less than HS Diploma (%)",
          atype: "per",
        },
        {
          value: 7,
          text: "% With At Least HS Diploma",
          desc: "Pop. with At Least HS Diploma (%)",
          atype: "per",
        },
        {
          value: 8,
          text: "% With At Least Bachelors",
          desc: "Pop. with At Least Bachelors (%)",
          atype: "per",
        },
        {
          value: 9,
          text: "% School Enrollment",
          desc: "Pop. Enrolled in School (%)",
          atype: "per",
        },
        {
          value: 10,
          text: "Median Earnings",
          desc: "Median Earnings ($)",
          atype: "num",
        },
        {
          value: 11,
          text: "% of Children Living in Poverty",
          desc: "Children Under 6 Living in Poverty (%)",
          atype: "per",
        },
        {
          value: 12,
          text: "% of Seniors Living in Poverty",
          desc: "Adults over 65 Living in Poverty (%)",
          atype: "per",
        },
        {
          value: 13,
          text: "% of Citizens in Poverty",
          desc: "Citizens Living in Poverty (%)",
          atype: "per",
        },
        {
          value: 14,
          text: "% Jobs: White Collar",
          desc: "White Collar Jobs (%)",
          atype: "per",
        },
        {
          value: 15,
          text: "% Jobs: Pink Collar",
          desc: "Pink Collar Jobs (%)",
          atype: "per",
        },
        {
          value: 16,
          text: "% Jobs: Blue Collar",
          desc: "Blue Collar Jobs (%)",
          atype: "per",
        },
        {
          value: 17,
          text: "% White",
          desc: "White Population (%)",
          atype: "per",
        },
        {
          value: 18,
          text: "% Black",
          desc: "Black Population (%)",
          atype: "per",
        },
        {
          value: 19,
          text: "% Hispanic",
          desc: "Hispanic Population (%)",
          atype: "per",
        },
        {
          value: 20,
          text: "% Asian",
          desc: "Asian Population (%)",
          atype: "per",
        },
        {
          value: 21,
          text: "% American Indian",
          desc: "American Indian Population (%)",
          atype: "per",
        },
        {
          value: 22,
          text: "Median Age",
          desc: "Median Age (years)",
          atype: "age",
        },
        {
          value: 23,
          text: "% Children Raised by Single Parent",
          desc: "Children Raised by Single Parent (%)",
          atype: "per",
        },
      ];

      // this is a `value` in `dropdown_choices`
      // initial selection is 2016 election results
      var selected_dataset = 2;

      // populate dropdown
      d3.select("#dropdown")
        .selectAll("option")
        .data(dropdown_choices)
        .enter()
        .append("option")
        .attr("value", function (option) {
          return option.value;
        })
        .text(function (option) {
          return option.text;
        })
        .attr("desc", (option) => option.desc);

      // dropdown changes trigger map changes
      d3.select("#dropdown").on("change", function () {
        // call the big update function
        updateMap(d3.select(this).property("value"));
      });

      // MAKE THE MAP ---------------------------

      // select the big svg
      var svg = d3
        .select("#choro")
        .append("svg")
        .attr("width", 1000)
        .attr("height", 650);

      // initialize the geoPath object
      let path = d3.geoPath();

      // add county shapes
      var counties = svg
        .selectAll(".county")
        .data(topojson.feature(us, us.objects.counties).features)
        .enter()
        .append("path")
        .attr("class", "county")
        .attr("d", path);

      // add lines for state boundaries
      svg
        .append("path")
        .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("stroke-linejoin", "round")
        .attr("d", path);

      // MAKE THE TOOLTIPS ---------------------------

      function getFormattedNumber(id) {
        var dtype = dropdown_choices.find(
          (element) => element.value === selected_dataset
        ).atype;
        if (dtype === "pol" || dtype === "per") {
          return formatPercent(data.get(id)[selected_dataset] / 100);
        } else if (dtype === "num") {
          return formatDollars(data.get(id)[selected_dataset]);
        } else if (dtype === "age") {
          return formatAge(data.get(id)[selected_dataset]) + " years";
        } else {
          // this should not happen
          return "-10000000";
        }
      }

      let tooltip = d3
        .select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

      // add tooltip to the counties
      counties
        .on("mouseover", function (m, d) {
          //console.log(dropdown_choices.find(element => element.value == selected_dataset).desc);
          // note that m is a MouseEvent, d is the data
          tooltip.transition().duration(250).style("opacity", 1);
          tooltip
            .html(
              // title row
              "<p><strong>" +
                data.get(d.id)[0] +
                " County, " +
                data.get(d.id)[1] +
                "</strong></p>" +
                // body section 1
                "<table><tbody><tr><td class='wide'>" +
                dropdown_choices.find(
                  (element) => element.value === selected_dataset
                ).desc +
                "</td><td>" +
                getFormattedNumber(d.id) +
                "</td></tr>"
            )
            .style("left", m.pageX + 15 + "px")
            .style("top", m.pageY - 28 + "px");
        })
        .on("mouseout", function (m, d) {
          tooltip.transition().duration(250).style("opacity", 0);
        });

      d3.select("body").on("keydown", function (eve) {
        if (eve.key === "j") {
          // show the election map for 2016
          //console.log("j")
          updateMap(2, 150);
        } else if (eve.key === "k") {
          //console.log(d3.select("#dropdown").property('value'));
          updateMap(d3.select("#dropdown").property("value"), 150);
        }
      });

      // fill the counties with color
      updateMap(selected_dataset);

      // update the map to show data at the given column index
      function updateMap(indexOfColumn, dur = 700) {
        selected_dataset = parseInt(indexOfColumn);
        var selected_info = dropdown_choices.find(
          (element) => element.value === selected_dataset
        );

        // change the color scheme based on the selected datatype
        var dtype = selected_info.atype;
        if (dtype === "pol") {
          // political data uses red/blue scheme
          color = d3.scaleQuantize([0, 100], d3.schemeRdBu[10]);
        } else if (dtype === "per" || dtype === "age") {
          // demographic percentage data uses green scheme
          color = d3.scaleQuantize([0, 100], d3.schemeGnBu[8]);
        } else if (dtype === "num") {
          // demographic numeric data (like income) uses green scheme
          //console.log(d3.max(data, d => d.id[selected_dataset]));
          color = d3.scaleQuantize([0, 60000], d3.schemeGnBu[8]);
        }

        // update the country map
        counties
          .transition()
          .duration(dur)
          .style("fill", function (d) {
            if (data.get(d.id) === undefined) {
              //console.log("undefined!!!!");
              return color(0);
            }
            return color(data.get(d.id)[selected_dataset]);
          });

        // delete existing color legend
        svg.selectAll("g.legend").remove();

        // add color legend with the right info
        var legtitle = selected_info.desc;

        svg
          .append("g")
          .attr("class", "legend")
          .attr("transform", "translate(610,20)")
          .append(() => legend({ color, title: legtitle, width: 260 }));
      }
    });
    function legend({
      color,
      title,
      tickSize = 6,
      width = 320,
      height = 44 + tickSize,
      marginTop = 18,
      marginRight = 0,
      marginBottom = 16 + tickSize,
      marginLeft = 0,
      ticks = width / 64,
      tickFormat,
      tickValues,
    } = {}) {
      const svg = d3
        .create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .style("overflow", "visible")
        .style("display", "block");

      let x;

      // Continuous
      if (color.interpolator) {
        x = Object.assign(
          color
            .copy()
            .interpolator(d3.interpolateRound(marginLeft, width - marginRight)),
          {
            range() {
              return [marginLeft, width - marginRight];
            },
          }
        );

        svg
          .append("image")
          .attr("x", marginLeft)
          .attr("y", marginTop)
          .attr("width", width - marginLeft - marginRight)
          .attr("height", height - marginTop - marginBottom)
          .attr("preserveAspectRatio", "none");

        // scaleSequentialQuantile doesn’t implement ticks or tickFormat.
        if (!x.ticks) {
          if (tickValues === undefined) {
            const n = Math.round(ticks + 1);
            tickValues = d3
              .range(n)
              .map((i) => d3.quantile(color.domain(), i / (n - 1)));
          }
          if (typeof tickFormat !== "function") {
            tickFormat = d3.format(
              tickFormat === undefined ? ",f" : tickFormat
            );
          }
        }
      }

      // Discrete
      else if (color.invertExtent) {
        const thresholds = color.thresholds
          ? color.thresholds() // scaleQuantize
          : color.quantiles
          ? color.quantiles() // scaleQuantile
          : color.domain(); // scaleThreshold

        const thresholdFormat =
          tickFormat === undefined
            ? (d) => d
            : typeof tickFormat === "string"
            ? d3.format(tickFormat)
            : tickFormat;

        x = d3
          .scaleLinear()
          .domain([-1, color.range().length - 1])
          .rangeRound([marginLeft, width - marginRight]);

        svg
          .append("g")
          .selectAll("rect")
          .data(color.range())
          .join("rect")
          .attr("x", (d, i) => x(i - 1))
          .attr("y", marginTop)
          .attr("width", (d, i) => x(i) - x(i - 1))
          .attr("height", height - marginTop - marginBottom)
          .attr("fill", (d) => d);

        tickValues = d3.range(thresholds.length);
        tickFormat = (i) => thresholdFormat(thresholds[i], i);
      }

      svg
        .append("g")
        .attr("transform", `translate(0, ${height - marginBottom})`)
        .call(
          d3
            .axisBottom(x)
            .ticks(
              ticks,
              typeof tickFormat === "string" ? tickFormat : undefined
            )
            .tickFormat(
              typeof tickFormat === "function" ? tickFormat : undefined
            )
            .tickSize(tickSize)
            .tickValues(tickValues)
        )
        .call((g) =>
          g
            .selectAll(".tick line")
            .attr("y1", marginTop + marginBottom - height)
        )
        .call((g) => g.select(".domain").remove())
        .call((g) =>
          g
            .append("text")
            .attr("y", marginTop + marginBottom - height - 6)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .attr("font-weight", "bold")
            .text(title)
        );

      return svg.node();
    }
  }
  render() {
    return (
      <div>
        <h2>Choropleth Map of:</h2>
        <select id="dropdown"></select>
        <div style={{ marginLeft: "-30px" }} id="choro"></div>
      </div>
    );
  }
}

export default Choro;
