# DSCI 554 Project

## Team

Team name: Uncharted

---

## Artifacts

**🍿 Proposal presentation** [Transcript](presentations/proposal/TRANSCRIPT.md) | [PDF (optional)](presentations/proposal/presentation.pdf)

**🍿 Final presentation** [Transcript](presentations/final/TRANSCRIPT.md) | [PDF (optional)](presentations/final/presentation.pdf)

**📄 Paper** [Overleaf read only link](https://www.overleaf.com/read/qrqytpzrjmns) | [PDF](paper/Uncharted.pdf)

**🎥 Video** [Transcript (optional)](video/TRANSCRIPT.md) | [YouTube link](https://youtu.be/ZiyN-JQmZso)

**🚢 Demo** [Demo link](http://pdms.usc.edu/dsci-554-projects/project-uncharted/)

---

## Project Summary

For our project we will be visualizing the voting trends in US elections at a national and state level in the 2016 election while examining the socioeconomic factors that influence these trends.

---

## Contributions

## Proposal presentation

- Henry designed the presentation SVG and created the slides in Sozi and helped create the intro and timeline/outro
- Griffin researched similar visualizations and methods and included them in the transcript
- Avi helped create the intro and timeline/outro and researched background information for the transcript
- Josh researched visualizations/info we can create/use in our project and wrote them in the transcript

## Final presentation

- Henry designed the presentation SVG and created the slides in Sozi and explained the technologies and design process we used
- Griffin explained the data we collected and the research we did
- Avi explained the research we did and why it is original
- Josh explained the introduction to our project and who did what

## Paper

- Josh and Avi wrote the paper

## Demo

- Henry developed and deployed the React app, made the line chart and layout graph, and integrated all the visualizations
- Griffin made the mapbox and layout graphs, recorded the video, and uploaded it to YouTube
- Avi made the responsive scatterplot graph
- Josh made the dynamic choropleth map

### List of visualizations

| Requirement                          | Label       |
| ------------------------------------ | ----------- |
| responsive d3 chart                  | responsive  |
| interactive d3 chart                 | interactive |
| d3 chart with an animated transition | animated    |
| d3 layout                            | layout      |
| d3 map                               | map         |
| Mapbox map                           | mapbox      |

Table 1: Table of minimum requirements, 1 of each category is required.

In Table2, list all the charts and tables in your pages including minimum requirements labels when applicable.

| Page name      | Chart description                             | Libraries used | Requirement label                 |
| -------------- | --------------------------------------------- | -------------- | --------------------------------- |
| Stepper Step 1 | Voter Turnout Line Chart                      | d3             | interactive                       |
| Stepper Step 2 | Scatterplot of Voting Trends and Income       | d3             | interactive, responsive, animated |
| Stepper Step 3 | Choropleth of Geographical Data               | d3, topojson   | interactive, map                  |
| Stepper Step 4 | Circle Packing of votes by subregion          | d3             | animated, layout, interactive     |
| Stepper Step 5 | Map of counties that flipped in 2016 election | mapbox-gl      | mapbox, interactive               |

Table2: Table of visualizations
