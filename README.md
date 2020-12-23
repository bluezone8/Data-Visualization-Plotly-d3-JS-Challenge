# DATA VISUALIZATION CHALLENGE
### Purpose
The purpose of this repository is to store files related to the user data visualiztion for the belly Button Biodiversity Analysis Project
_______
### Tool Choice and Rationale
The primary requirement for this effort was to provide a user with a tool that provided both user interactivity to allow selection of desired data as well as visualization that would provide meaningful insights into the data.  The presented product is an interactive website.  The tools used include:
1.  HTML as the structure of the site
2. CSS (Specifically the Bootstrap library)to provide the stylings for the site.
3. Javascript provides the interactivity functionality for the site.  The d3 library is used to import the JSON data and provide the connection of the HTML elelemnts to the Javascript code.
4. Plotly (Javscript implementation)is used to render the included data visualizations on the page.  
___________
### Approach   
Without a doubt, building this application demonstarted that a very significant challenge when developing interactive data driven websites using Javascript is that of variable scope management.  The functionality of certain parts of the application must be discrete from other parts so that when a given part is changed it dows not change another part which must remain static at that point.  The final structure of the application initializes the dropdown menu for the user selection and 'listens' for changes to that menu(i.e. a user selection) outside of the functions that render the page.  Next, the population of the dropdown is called in its own function .  The values for the menu are acquired, the menu option holders are created, and the menu values are placed in them. The next step is the calling of the function that renders the data visualizations on the page.  As the visualizations are user selection driven, the application first acquires the value of the current user test subject selection and its associated data index.  That index is then passed to the individual routines which are rendering each chart so that the charts reflect the data for the given test subject.  The data elements provided include: 1. An information panel containing the bigraphical data for the selected test subject 2. A bar chart depicting the top 10 OTUs for that subject. 3. A bubble chart which depicts all of the OTU data for the selected subject and 4. The optional gauge chart which shows the washing frequency for the subject.
________
 ### Included Items
 #### I. Site Files: 
 * index.html 
 * app.js 
 * data.json
 #### II. Information Files:
 *  Site Images - images of the site functionality in operation: Viz_Initial State.jpg, Viz_955 Selected.jpg, Viz_958 Selected.jpg
 * README.md
 
