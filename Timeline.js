// LOAD DATA
d3.csv('./data/Timeline.csv').then( function(data) {

// SCALE
timelineScale = d3.scaleLinear()
    .domain([1950, 1970]) //data.map(d => d.Year))
    .range([0,width*1.8])

yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.Date)])
    .range([height*0.2, 0])

xAxis = d3.axisBottom(timelineScale)
yAxis = d3.axisLeft(yScale)

const Timeline_color = ["#3c7bcc",
"#d1232a",
"#6477b9",
"#ffa600",
"#0e0e0d",
"#cae165",
"#d67369",
"#ffa50a",
"#01b3b3"]

// COLOR SCALE
colorScale = d3.scaleOrdinal()
    .domain([9])
    .range(Timeline_color)

// append SVG for Timeline viz to body of page
const Timeline = d3.select("#Timeline")
    .append("svg")
    .attr("width", width*2.25)
    .attr("height", height*0.7)
   // .attr("viewBox",[50,-10,width,height])

// create a tooltip
const timeline_tooltip = d3.select("#Timeline")
    .append("div")
    .style("position", "absolute")
    .attr("class", "tooltip")
    .style("visibility", "hidden")
    .style("border", "solid")
    .style("border-color", "black")
    .style("border-width", "3px")
    .style("border-radius", "5px")

// DRAW AXES
Timeline.append("g")
    .attr("class", "xAxis")
    .attr("transform", `translate(${width*0.2}, ${height*0.6})`) // move to the bottom
    .call(xAxis
        .ticks(2)
        .tickSize(15)
        .tickFormat(d3.format("d"))
        .tickValues(["1950", "1970"]) // only show first and last ticks
        )
    .attr("font-size", "30")

// DRAW LINES
Timeline.append("g")
    .attr("transform",`translate(${width*0.22}, ${height*0.43})`)
    .selectAll("line")
    .data(data)
    .join("line")
    .attr("id","line")
    .attr("x1", d => timelineScale(d.Date)+30)
    .attr("x2", d => timelineScale(d.Date)+30)
    .attr("y2",d => yScale(d.Y_position)*0.08)
    .attr("y1",yScale(300))
    .attr("stroke", "white")
    .attr("stroke-width", 3)


// DRAW TIMELINE
Timeline.append("g")
    .attr("transform",`translate(${width*0.22}, ${height*0.43})`)
    .selectAll("timeline")
    .data(data)
    .join("circle")
    .attr("id","timeline")
    .attr("cy",d => yScale(d.Y_position))
    .attr("cx", d => timelineScale(d.Date)+30)
    .attr("r", 40)
    .attr("stroke-width",3.5)
    .attr("stroke", "white")
    .style("fill", "#ffa600")

    // INTERACTIVITY FOR TOOLTIP
    .on("mouseover", function (event,d){
    d3.select(this).attr("stroke-width", 1)
        timeline_tooltip.transition()
            .duration(200)
            .style("visibility","visible")

        d3.select(this)
        timeline_tooltip.html("<span style='color:black;'><h3>"+d.Year+"</h3><span style='color:black;'><h2>"+d.Event+"</h2><img src="+d.Media+" style='max-width:65%;height:auto; ></ahref></span><span style='color:black'><p>"+d.Description+"</p></span>" )                            
            .style("left",(event.x)+10+"px")
            .style("top",(event.y)-20+"px")
            
    })

    .on("mouseout",function (event,d){
        d3.select(this).attr("stroke-width",1)
        timeline_tooltip.transition().style("visibility","hidden") 
    }  )     



})