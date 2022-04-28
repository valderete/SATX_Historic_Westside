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

    
    // append SVG for Timeline viz to body of page
    const Desegregation_timeline = d3.select("#Desegregation_timeline")
        .append("svg")
        .attr("width", width*1.05)
        .attr("height", height*1.65)
    
    // create a tooltip
    const Desegregation_tooltip = d3.select("#Desegregation_tooltip")
        .append("div")
        .style("position", "absolute")
        .attr("class", "tooltip")
        .style("visibility", "hidden")
        .style("border", "solid")
        .style("border-color", "black")
        .style("border-width", "3px")
        .style("border-radius", "5px")
    
    // DRAW AXES
    Desegregation_timeline.append("g")
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
    Desegregation_timeline.append("g")
        .attr("transform",`translate(${width*0.22}, ${height*0.43})`)
        .selectAll("line")
        .data(data)
        .join("line")
        .attr("id","line")
        .attr("x1", d => timelineScale(d.Date)+30)
        .attr("x2", d => timelineScale(d.Date)+30)
        .attr("y2",d => yScale(d.Y_position)*0.15)
        .attr("y1",yScale(300))
        .attr("stroke", "white")
        .attr("stroke-width", 3)
    
    
    // DRAW TIMELINE
    Desegregation_timeline.append("g")
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
        
    
    
    })