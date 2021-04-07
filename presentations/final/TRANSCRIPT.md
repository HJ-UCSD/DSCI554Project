# TRANSCRIPT

Topic: Demographics as predictors of voting behavior in the 2016 presidential election

Team name: Uncharted

Team members:

- Henry Jiao <henrygji@usc.edu>
- Griffin Weinhold <gweinhol@usc.edu>
- Josh Haug <jhaug@usc.edu>
- Avinash Sharma <sharmaav@usc.edu>

---

## Slide 1 Introduction leading with 10 words on what your visualization is about (Josh)

To summarize our project in 10 words: Demographics as predictors of voting behavior in the 2016 election. Non-political information about a voter (e.g. their education level, socioeconomic status, race, etc.) is a good predictor of voting behavior. We have attempted to show this phenomenon in our dashboard using geographical, area, and linear encodings.

## Slide 2 Explain who did what (Josh)

In regards to dividing responsibility, we have largely stuck to our project development plan. After reaching a consensus on what to graph, we separated out the responsibilities for making the dashboard. Avi, Griffin, and Josh created the visualizations, and Henry was responsible for creating the React app to integrate all the graphics.

## Slide 3 Explain who is it addressed to, why it is interesting, original, useful (Josh)

Voting behavior on an individual level is difficult to predict, but on a massive scale it is largely predictable by voter demographics. Factors like education level, geographical location, socioeconomic status, and race are in many ways just as predictive of voting behavior as party preference.

## Slide 4 Explain the data and topic as needed to understand the project. (Griffin)

Our data is collected from a variety of sources, from multiple state and federal agencies. Nevertheless, it is imperative to understand each dataset we chose to incorporate into our project paints a picture of the american voter, and the demographics that seem to compose the majority of each political party.

## Slide 5 Explain the research you have done, what others have done in the same topic, other topics that are relevant. (Griffin)

The socioeconomic, cultural and geographic factors that dictate an american voter’s affiliation has forever been a topic of interest. Still, we found how someone votes is not a random act at all, but rather a result of confounding factors - such as wealth, education and location. Therefore, we looked deeper in an attempt to visualize and convey this paradigm further.

## Slide 6 Explain the research you have done, what others have done in the same topic, other topics that are relevant. (Avi)

The New York Times created an interactive map that shows voting results by region, size of lead, and change from 2012. They created stacked bar charts to show the differences in voting trends of these demographics and scatterplots over time of the share of Republican votes and income per person. Many others have created visualizations on the same topic.

## Slide 7 Explain how your work is original in general. (Avi)

However, we made our work original by showing specific correlations and adding interactivity not seen in other charts. Some of our visualizations include a d3 pack layout showing percentage of state population with a Bachelor’s degree of those between the age of 25 and 44 and a scatterplot by state and county to show the distribution of votes from median household income, which we have not seen before.

## Slide 8 Explain your design process, rationale for the layout, story, choice of forms, how you optimized the visual queries and user interaction (Henry)

Moving on to the design process, we storyboarded the app in Figma before coding it in React to ensure the user experience was optimal. We decided to keep the layout simple as we wanted to focus on the actual story and visualizations; our app has buttons on the top for the user to step through our story sequentially while text accompanies our graphs to tell the story.

## Slide 9 Explain what technology you have used including for processing the data (e.g., node, d3 Bootstrap, vue, ...) (Henry)

In terms of the technologies used, the app was built in react using Create React App in order to create a simple frontend build pipeline without complex backend logic. The app itself uses components from Chakra-UI and Material-UI and the data was directly processed and visualized with D3.

## Slide 10 Explain what you would have done differently and/or future work (Henry)

In terms of future work, we considered breaking down voter demographics in Los Angeles by neighborhood to find interesting local voting trends. In addition, we also considered analyzing how the 2020 presidential election results would’ve changed if a split electoral college system was used but the Georgia recount had not finished by the time we finished planning.
