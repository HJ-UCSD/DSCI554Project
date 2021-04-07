import React from "react";
import { Flex, ThemeProvider, Text } from "@chakra-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

import LineChart from "./charts/line";
import Scatterplot from "./charts/scatterplot";
import Choro from "./charts/choro";
import Bubble from "./charts/bubble";
import MapBox from "./charts/mapbox";
import "./charts/mapbox.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  icon: {
    color: "#76777B",
    "&$activeIcon": {
      color: "#E60000",
    },
    "&$completedIcon": {
      color: "#009900",
    },
  },
  activeIcon: {},
  completedIcon: {},
  steper: {
    width: "80%",
    alignItems: "center",
    justify: "center",
  },
  LeftNavButton: {
    marginTop: theme.spacing(-22),
    marginLeft: "2%",
    "& svg": {
      fontSize: 60,
      fill: "#E60000",
    },
  },
  RightNavButton: {
    marginTop: theme.spacing(-27),
    marginLeft: "93%",
    "& svg": {
      fontSize: 60,
      fill: "#E60000",
    },
  },
  ResetButton: {
    marginTop: theme.spacing(-27),
    marginLeft: "93%",
  },
}));

function getSteps() {
  return [
    "Voter Turnout",
    "Income Trends",
    "Geographical Trends",
    "Geographical Subregions",
    "Flipped Counties",
  ];
}

function App() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <ThemeProvider>
      <Flex direction="column">
        <Flex background="#990000" mb={3}>
          <Text fontSize="3xl" color="#FFC72C" ml={3}>
            DSCI 554 Final Project - Group Uncharted
          </Text>
        </Flex>
        <Stepper
          className={classes.stepper}
          activeStep={activeStep}
          alternativeLabel
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel
                StepIconProps={{
                  classes: {
                    root: classes.icon,
                    active: classes.activeIcon,
                    completed: classes.completedIcon,
                  },
                }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          <IconButton
            aria-label="left"
            onClick={activeStep !== 0 ? handleBack : null}
            className={classes.LeftNavButton}
          >
            <ArrowBackIcon />
          </IconButton>
          {activeStep !== 4 && (
            <IconButton
              aria-label="right"
              onClick={activeStep !== 4 ? handleNext : null}
              className={classes.RightNavButton}
            >
              <ArrowForwardIcon />
            </IconButton>
          )}
          {activeStep === 4 && (
            <Button
              className={classes.ResetButton}
              onClick={handleReset}
              style={{
                backgroundColor: "#EC4040",
              }}
            >
              Reset
            </Button>
          )}
        </div>

        {activeStep === 0 && (
          <Flex mr={120} ml={120} mt={-4}>
            <Flex w="30%" mr={10}>
              <Text>
                With the recent historic 2020 presidential election having the
                largest voter turn out ever (over 156 million total votes) we
                wanted to lay the ground work to quickly analyze all the data
                from this novel sample size, once available, to determine how
                socioeconomic and geographical factors impact voting trends.
                <br></br>
                <br></br>This line chart shows the percentage of{" "}
                <b>voter-eligible</b> people that voted in each election. Hover
                over the red dots to see the voter turnout percentage of each
                year. The data is obtained from the{" "}
                <a href="http://www.electproject.org/home/voter-turnout/voter-turnout-data">
                  United States Elections Project
                </a>
                .
              </Text>
            </Flex>
            <Flex w="70%">
              <LineChart></LineChart>
            </Flex>
          </Flex>
        )}
        {activeStep === 1 && (
          <Flex mr={120} ml={120} mt={-4}>
            <Flex w="30%" mr={10}>
              <Text>
                First, we visualized the impact economic status has on current
                voting trends. According to the New York Times, in the 1990's
                there was no strong correlation between the economic standing of
                a region and the partisan preference of its voters. However, by
                2016, the GOP won almost twice the share of votes in the
                nation's poorest counties than it won in the richest.
                <br></br>
                <br></br>This scatterplot corroborates this correlation of
                percentage of votes for Donald Trump versus median household
                income by <b>state</b>. Each bubble is sized by the total number
                of votes in the state (using a square root scale) and a linear
                color scale based on which candidate won the state by how much
                of a margin. The larger the margin, the darker the hue of red or
                blue (Donald Trump win or Hillary Clinton win, respectively).
                Hover over a state bubble to see the state name as well as its
                median household income value and voting statistics.
                <br></br>
                <br></br>Click on a state bubble to transition into the
                percentage of Trump votes versus median household income by{" "}
                <b>county</b> of the clicked state; the presentation of the data
                is the same as the state-wide bubbles except we used a log scale
                to represent number of votes by county to better visualize the
                data. Clicking the button at the top will transition the county
                scatterplot to the original state scatterplot. Finally, this
                responsive chart resizes based on the size of the window. The
                data used was obtained from the{" "}
                <a href="https://electionlab.mit.edu/data">
                  MIT Election Data and Science Lab
                </a>
                .
              </Text>
            </Flex>
            <Flex w="70%">
              <Scatterplot></Scatterplot>
            </Flex>
          </Flex>
        )}
        {activeStep === 2 && (
          <Flex mr={120} ml={120} mt={-4}>
            <Flex w="30%" mr={10}>
              <Text>
                Next, we wanted to showcase some more relationships between 2016
                voting trends and other variables. This choropleth map shows
                both vote outcomes by county (as obtained from the{" "}
                <a href="https://electionlab.mit.edu/data">
                  MIT Election Data and Science Lab
                </a>
                ) as well as county-level demographics (obtained from the 2010
                dataset released by the{" "}
                <a href="https://www.census.gov/data/datasets.html">
                  US Census Bureau
                </a>
                ). <br></br> <br></br>Simply select a dataset in the dropdown to
                view it on the map. By pressing <b>j</b> on the keyboard, you
                can switch to the 2016 election results, and by pressing{" "}
                <b>k</b>, you can switch back to viewing your selection in the
                dropdown. By switching between the 2008, 2012, and 2016 election
                results, it becomes plainly evident that the cultural divide is
                worsening -- red areas are becoming redder and blue areas are
                becoming bluer. In addition, our data shows counties with a
                majority black population all voted Democrat in the 2016
                election, as did most majority hispanic counties.
                <br></br> <br></br>
                Note that county-level voting outcomes are not available for
                Alaska, as these are not reported in the MIT dataset.
              </Text>
            </Flex>
            <Flex w="70%" ml={-2}>
              <Choro></Choro>
            </Flex>
          </Flex>
        )}
        {activeStep === 3 && (
          <Flex mr={120} ml={120} mt={-4}>
            <Flex w="30%" mr={10}>
              <Text>
                Furthermore, we wanted to analyze the impact geographical
                regions and subregions have on voting trends. The large beige
                bubbles represent subregions of the United States while clicking
                on each bubble reveals the states within the subregion. The
                state bubbles are colored accordingly based on which candidate
                (Red for Trump, Blue for Clinton) received the electoral votes
                of the state. Clicking on each state shows a comparison of the
                number of counties that had a majority of Trump supporters vs
                Hillary supporters. This data is obtained from{" "}
                <a href="https://townhall.com/election/2016/president/">
                  Townhall
                </a>
                .<br></br>
                <br></br>
                Naturally, there are more red counties than blue counties for
                most states as most democrat-leaning cities are all encompased
                in a single county. However, geographically small states such as
                Hawaii break this trend. Moreover, this graph demonstrates
                concentration of voters in each state. For example, Minnesota, a
                traditionally blue state, has mostly red counties, indicating
                most of the blue votes come from the counties that have
                Minneapolis and St. Paul. On the other hand, California has an
                almost 50/50 split of red and blue counties, indicating the
                distribution of red and blue voters is much more dispersed
                across the state than Minnesota.
              </Text>
            </Flex>
            <Flex w="70%" ml={-5}>
              <Bubble></Bubble>
            </Flex>
          </Flex>
        )}
        {activeStep === 4 && (
          <Flex mr={120} ml={120} mt={-4}>
            <Flex w="30%" mr={10}>
              <Text>
                Finally, we could've used the information from the last three
                graphs to predict the county flipping that happened in the 2016
                election results. However, we did not have the time and
                resources for this but we still wanted to visualize the counties
                that flipped in the 2016 election compared to the 2012 election.
                <br></br>
                <br></br>
                Light salmon counties are ones that flipped from blue to red
                while blue and red counties are counties that stayed Democrat
                and Republican, respectively, or flipped red to blue. We only
                plotted blue to red counties as we wanted to highlight how Trump
                took away the presidency by focusing on certain areas, such as
                the Rust Belt. We obtained this data from the{" "}
                <a href="https://www.mapbox.com/elections/tilesets">
                  Mapbox tilesets
                </a>
                .
              </Text>
            </Flex>

            <Flex w="70%">
              <MapBox></MapBox>
              <div id="state-legend" class="legend">
                <h4>2012 & 2016 Voting</h4>
                <div>
                  <span style={{ backgroundColor: "#e20808" }}></span>Red in
                  2012 & 2016
                </div>
                <div>
                  <span style={{ backgroundColor: "#0574eb" }}></span>Blue in
                  2012 & 2016 or
                </div>
                <div>Red in 2012 and Blue in 2016</div>
                <div>
                  <span style={{ backgroundColor: "#f4a582" }}></span>Blue in
                  2012, Red in 2016
                </div>
              </div>
            </Flex>
          </Flex>
        )}
      </Flex>
    </ThemeProvider>
  );
}

export default App;
