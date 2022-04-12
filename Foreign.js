// LOAD DATA
d3.csv('./data/Bexar_1960_Foreign_Born.csv', d3.autoType)
.then(data => {
  console.log("Foreign data loaded", data)

xScale2 = d3.scaleLinear()
  .domain([0, 120000])
  .range([0, width*0.8])

yScale2 = d3.scaleBand()
  .domain(data.map(d => d.Birth_Place))
  .range([0, height*0.5])
  .paddingInner(0.15)

xAxis2 = d3.axisBottom(xScale2)
yAxis2 = d3.axisLeft(yScale2)

const Foreign_Chart = d3.select("#Foreign_Chart")
  .append("svg")
  .attr("width", width*1.05)
  .attr("height", height*0.65)
  .attr("transform",`translate(${margin.left-50},${margin.top})`)

// + DRAW AXES
Foreign_Chart.append("g")
  .attr("class", "xAxis2")
  .attr("transform", `translate(${width*0.2}, ${height*0.52})`) // move to the bottom
  .call(xAxis2
    .tickSize(-innerWidth)
    .tickFormat(d3.format(".2s"))
    )
  .selectAll('.tick line').attr('opacity', 0.1)
  .attr("font-size", "12")

Foreign_Chart.append("g")
  .attr("class", "yAxis2")
  .attr("transform", `translate(${width*0.2}, ${height*0.016})`) // align with left margin
  .call(yAxis2)
  .attr("font-size", "14")
    .append("text") // add xAxis label
    .text("Country of Origin")
    .attr("font-size", "14")
    .attr("x",-height*0.15)
    .attr("y",-width/5.5)
    .attr("fill", "white")
    .attr("transform","rotate(-90)")
    

  // DRAW BARS
Foreign_Chart.selectAll("rect")
  .data(data)
  .join("rect")
    .attr("x",width*0.202)
    .attr("y", d => yScale2(d.Birth_Place)+height*0.016)
    .attr("width", d => xScale2(d.Count))
    .attr("height", yScale2.bandwidth())
    .attr("fill", "#ebbf0e")

    })