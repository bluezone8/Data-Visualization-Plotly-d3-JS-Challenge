
// Outside of the functions: Select the dropdown - listen for change - run the appropriate function based on status
var dropDown=d3.select('#selDataset');
dropDown.on("change", prep);
start();

function start(){
    // import the data and poulate the dropdown with the ids from data.names - run main data visualization function
    d3.json('data.json').then((data)=>{
        var ids=data.names;
        var idVals=Object.values(ids);
        idVals.forEach(val=>{
        dropDown.append('option').text(val);
        prep();
        })
    })
}


function prep() {
    // reimport data due to scope to re establish data var - get the value and index of the dropdown
    d3.json('data.json').then((data)=>{
        var dropVal=dropDown.node().value;
        names=data.names;
        var dropIndex=names.findIndex(name=>name===dropVal);
 

        // fill the panel with the metadata related to the current test subject index
        var panelDiv=d3.select('#sample-metadata');
        panelDiv.html('');
        var metadata=data.metadata[dropIndex];
        // console.log(metadata)
        Object.entries(metadata).forEach(([key,vlu])=> {
            panelDiv.append('p').text(`${key.toUpperCase()}:\n${vlu}`);
        })

        // create horizontal bar chart using the sample data of the current test subject index
        // get the sample data related to the current selected test subject 
        var samples=data.samples[dropIndex];
        // select the top 10 of each field and reverse the order so that the chart is greatest to least
        var otuIds=samples.otu_ids.slice(0,10).reverse();
        var sampleValues=samples.sample_values.slice(0,10).reverse();
        var otuLabels=samples.otu_labels.slice(0,10).reverse();
        //create the trace
        var trace1={
            x: sampleValues,
            y: otuIds.map(o=>`OTU ${o}`),
            text: otuLabels,
            type: 'bar',
            orientation: 'h'
        }
        // call the plot to the bar div in the page
        Plotly.newPlot('bar',[trace1]);

        // create bubble chart using the sample data of the current test subject index 
        var sampleValuesAll=samples.sample_values;
        var otuIdsAll=samples.otu_ids;
        var otuLabelsAll=samples.otu_labels;
        // create the trace
        var trace2={
            x: otuIdsAll,
            y: sampleValuesAll,
            text: otuLabelsAll,
            mode: 'markers',
            marker: {
                size: sampleValuesAll,
                color: otuIdsAll,
                sizemode: 'area'
            }
        }
        // create the plot data
        var data2=[trace2];
        // create the layout
        var layout2={
            xaxis: {
                autochange: true,
                height: 600,
                width: 1000,
                title: {
                    text: 'Operational Taxonomic Unit Samples'
                }
            }
        }
        // call the plot to the bubble div in the page
        Plotly.newPlot('bubble', data2, layout2);

        // Create Gauge chart using the sample data of the current test subject index
        // get the washing freqency value for the current selected test subject
        wFreq=metadata.wfreq
        // create the plot data using a range from 0 to 9 with steps of 2 between -include gauge indicator and value
        var data3=[
            {
                domain:{x: [0,1], y:[0,1] },
                value: wFreq,
                title:{ text: "Wash Frequency"},
                type: "indicator",
                mode: "gauge+number",
                gauge: { axis: {range:[null,9]},
                    bar:{color:'black'},    
                        steps: [
                            {range: [0,2], color: "rgb(215, 48,39)"},
                            {range: [2,3], color: "rgb(244,109,67)"},
                            {range: [3,4], color: "rgb(253,174,97)"},
                            {range: [4,5], color: "rgb(254,224,144)"},
                            {range: [5,6], color: "rgb(224,243,248)"},
                            {range: [6,7], color: "rgb(171,217,233)"},
                            {range: [7,8], color: "rgb(116,173,209)"},
                            {range: [8,9], color: "rgb(69,117,180)"}
                    ]
                }
            }
        ]
        // create the layout 
        var layout3={width: 600, height: 500};
        // call the plot to the gauge div in the page
        Plotly.newPlot('gauge', data3, layout3);
    })
}
