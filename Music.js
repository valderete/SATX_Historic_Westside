// LOAD DATA
d3.csv('./data/Music.csv').then( function(data) {

// SCALE
xScale = d3.scaleLinear()
    .domain([1950, 1966]) 
    .range([0,width*0.95])
    

yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.X)])
    .range([height*0.2, 0])

xAxis = d3.axisBottom(xScale)
yAxis = d3.axisLeft(yScale)
    
const colors = ["#3c7bcc",
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
    .range(colors)

// append SVG for Timeline viz to body of page
const Music_viz = d3.select("#Music_viz")
    .append("svg")
    .attr("width", width*1.2)
    .attr("height", height*1.15)
    // .attr("viewBox",[50,-10,width,height])

// create a tooltip
const Music_tooltip = d3.select("#Music_tooltip")
    .append("div")
    .style("position", "absolute")
    .attr("class", "music_tooltip")
    .style("visibility", "hidden")
    .style("border", "solid")
    .style("border-color", "black")
    .style("border-width", "3px")
    .style("border-radius", "5px")

// DRAW AXES
//Music_viz.append("g")
 //   .attr("class", "xAxis")
  //  .attr("transform", `translate(${width*0.8}, ${height*0.4})`) // move to the bottom
  //  .call(xAxis
  //      .ticks(2)
//      .tickSize(15)
    //    .tickFormat(d3.format("d"))
   //     .tickValues(["1950", "1970"]) // only show first and last ticks
  //      )
    //.attr("font-size", "30")


// DRAW TIMELINE
Music_viz.append("g")
    .attr("transform",`translate(${width*0.2}, ${height*0.5})`)
    .selectAll("timeline")
    .data(data)
    .join("circle")
    .attr("id","circle")
    .attr("cy",d => yScale(d.Y)*3)
    .attr("cx", d => xScale(d.X)*1.2)
    .attr("r",85)
    .attr("stroke", "black")
    .attr("stroke-width",2)
    .style("fill", "#afbd32")

// ADD INTERACTIVITY
.on("mouseover", function (event,d){
  d3.select(this).attr("stroke-width", 5)
    Music_viz.transition()
    .duration(200)
    })
.on("mouseout",function (event,d){
    d3.select(this).attr("stroke-width",2)
    })

// Why isn't this working?!?!?!
.on("mouseup",function (event,d){
    d3.select(this).attr("opacity",0.5)
    })

.on("click", (event, d) => {
    d3.select("#Music_tooltip")
    .data(data)
        .attr('class', 'music_tooltip')
        .html(
        '<b><p style="font-size: 25px; line-height: 40px;">' + d.Title + '</b> </p>' 
        + '<p style="font-size: 18px; line-height: 30px; padding-left:25%; padding-right: 25%; text-align: center">' + d.Artist + '</p> ' 
        + '<p style="font-size: 22px; line-height: 30px; padding-left:25%; padding-right: 25%; text-align: left">' + d.Description + '</p> ' 
        + '<p style="color: white; font-size: 18px; line-height: 30px;"> <a href= '+ d.Source +'> Source </p> '
        )
        .append("div")
        
        .attr('class', 'audio')
        // .html('<iframe src=" ' + d.Video + ' " title="YouTube video player" ; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>')
        .html('<p>' +d.Video+ '</p>')
        })


        
// ADD TITLES
Titles = Music_viz.append("g")
    .attr("transform",`translate(${width*0.2}, ${height*0.5})`)    
    .selectAll("text")
    .data(data)
    .enter()
    .append("text")
        .text(d => d.Title)
        .attr('y', d => yScale(d.Y)*3)//positions text towards the left of the center of the circle
        .attr('x', d => xScale(d.X)*1.2) // function(d) { return yScale(d.Y_position); })
        .attr("fill", "black")
        .style("text-anchor", "middle")
        .attr("font-size", "14")


})