  
// LOAD DATA
d3.csv('../data/Bexar_1960_Race.csv', d3.autoType)
.then(data => {
  console.log("Race data loaded", data)

xScale = d3.scaleBand()
  .domain(data.map(d => d.Race))
  .range([0, width*0.4]) // visual variable
  .paddingInner(0.1)

yScale = d3.scaleLinear()
  .domain([1, d3.max(data, d => d.Count)])
  .range([height, 0])

xAxis = d3.axisBottom(xScale)
yAxis = d3.axisLeft(yScale)

const Race_Chart = d3.select("#Race_Chart")
  .append("svg")
  .attr("width", width*0.55)
  .attr("height", height*1.12)


// + DRAW AXES
Race_Chart.append("g")
  .attr("class", "xAxis")
  .attr("transform", `translate(${width*0.1}, ${height})`) // move to the bottom
  .call(xAxis)
  .attr("font-size", "15")
  .append("text") // add xAxis label
    .attr("font-size", "18")
    .attr("transform", `translate(${width/5.5}, ${50})`)
    .attr("fill", "white")
    .text("Race")

Race_Chart.append("g")
  .attr("class", "yAxis")
  .attr("transform", `translate(${width/10}, ${0})`) // align with left margin
  .call(yAxis)
  .attr("font-size", "15")

  // DRAW BARS
Race_Chart.selectAll("rect")
  .data(data)
  .join("rect")
    .attr("x", d => xScale(d.Race)+width/9)
    .attr("y", d => yScale(d.Count))
    .attr("width", xScale.bandwidth() -20)
    .attr("height", d => height - yScale(d.Count))
    .attr("fill", d => {
        if(d.Race == "White") return "#cfdd93"
        else if(d.Race == "Black") return "#dfaf75"
        else return "#ce75df"})
   
    })