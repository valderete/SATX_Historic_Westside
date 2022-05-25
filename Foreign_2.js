// LOAD DATA
d3.csv('./data/Bexar_1970_Foreign_Born.csv', d3.autoType)
.then(data => {
  console.log("Foreign data loaded", data)

xScale = d3.scaleLinear()
  .domain([0, 120000])
  .range([0, width*0.8])

yScale = d3.scaleBand()
  .domain(data.map(d => d.Birth_Place))
  .range([0, height*0.5])
  .paddingInner(0.15)

xAxis = d3.axisBottom(xScale)
yAxis = d3.axisLeft(yScale)

const Foreign_Chart2 = d3.select("#Foreign_Chart2")
  .append("svg")
  .attr("width", width*1.05)
  .attr("height", height*0.65)
  .attr("transform",`translate(${margin.left-50},${margin.top})`)


// Format numbers for tooltip
formater =  d3.format(',d')

// create a tooltip
const Foreign_tooltip2 = d3.select("#Foreign_tooltip2")
    .append("div")
    .style("position", "absolute")
    .style("visibility", "hidden")
    .style("background-color", "rgba(0, 0, 0, 0.8)")
    //.style("border", "solid")
    //.style("border-color", "black")
    //.style("border-width", "3px")
    .style("border-radius", "3px")
    .style("padding", "6px")
    .style("box-shadow", "-3px 3px 15px #888")
    .style("font-size", "12px")



// + DRAW AXES
Foreign_Chart2.append("g")
  .attr("class", "xAxis2")
  .attr("transform", `translate(${width*0.2}, ${height*0.52})`) // move to the bottom
  .call(xAxis
    .tickSize(-innerWidth)
    .tickFormat(d3.format(".2s"))
    )
  .selectAll('.tick line').attr('opacity', 0.1)
  .attr("font-size", "12")

Foreign_Chart2.append("g")
  .attr("class", "yAxis2")
  .attr("transform", `translate(${width*0.2}, ${height*0.016})`) // align with left margin
  .call(yAxis)
  .attr("font-size", "14")
    .append("text") // add xAxis label
    .text("Country of Origin")
    .attr("font-size", "14")
    .attr("x",-height*0.15)
    .attr("y",-width/5.5)
    .attr("fill", "white")
    .attr("transform","rotate(-90)")
    

  // DRAW BARS
Foreign_Chart2.selectAll("rect")
  .data(data)
  .join("rect")
    .attr("x",width*0.202)
    .attr("y", d => yScale(d.Birth_Place)+height*0.016)
    .attr("width", d => xScale(d.Count))
    .attr("height", yScale.bandwidth())
    .attr("fill", "#6477b9")
    .attr("stroke", "#afbd32")
    .attr("stroke-width", 0)

    // INTERACTIVITY FOR TOOLTIP
    .on("mouseover", function (event,d){
      d3.select(this).attr("stroke-width", 2)
        Foreign_tooltip2.transition()
              .duration(200)
              .style("visibility","visible")
  
          d3.select(this)
          Foreign_tooltip2.html("<span style='color:white;'><p> Count: " + formater(d.Count) + "</p></span>" )                            
              .style("left",(event.pageX)+20+"px")
              .style("top",(event.pageY)-50+"px")
              
      })
  
      .on("mouseout",function (event,d){
          d3.select(this).attr("stroke-width",0)
          Foreign_tooltip2.transition().style("visibility","hidden") 
      }  )



    })