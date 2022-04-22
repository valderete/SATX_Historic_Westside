// LEGEND
const legend = d3.select("#race_legend")
  .append("svg")
    .attr('width', width)
    .attr('height', height*0.05)

//LEGEND TEXT/DATA
const legendData = ["White", "Black", "Other", "American Indian"]

//LEGEND SCALE
const legendScale= d3.scaleOrdinal()
  .domain(legendData)
  .range(['#f5835d','#b7ce51','#4daf4a', '#723ee2'])

legend.append("g")
  .selectAll("circle")
  .data(legendData)
  .enter()
  .append("circle")
    .attr("cy", height*0.025)
    .attr("cx", function(d,i){ return width*0.25 + i*80})
    .attr("r", 5)
    .attr("fill", d => legendScale(d))
    //.attr("fill-opacity", "0.8")
    .attr("stroke", d => legendScale(d))
    .attr("stroke-width", 4)
    

//LEGEND TEXT/LABELS
    legend.selectAll("labels")
    .data(legendData)
    .enter()
    .append("text")
      .attr("y", height*0.036)
      .attr("x", function(d,i){ return width*0.265 + i*80})
      .text(function(d){ return d})
      .attr("font-size","14") 
      .attr("fill", "black")

// append SVG for Race viz to body of page
const Race_2 = d3.select("#Race_2")
    .append("svg")
    .attr("width", width*1.5)
    .attr("height", height*1.12)
    .append("g")
        .attr("transform",`translate(${margin.left*120},${margin.top})`)

// LOAD DATA
d3.csv('./data/Bexar_1950_1960_Race.csv').then( function(data) {

const subgroups = data.columns.slice(1)

const groups = data.map(d => d.Year)

console.log(groups)

xScale = d3.scaleBand()
    .domain(groups)
    .range([0, width*1.1])
    .padding([0.02])

yScale = d3.scaleLinear()
    .domain([0, 775000]) //d3.max(data, d => d.White)])
    .range([ height, 0 ]);

// Another scale for subgroup position?
const xSubgroup = d3.scaleBand()
    .domain(subgroups)
    .range([0, xScale.bandwidth()])
    .padding([0.05])

xAxis = d3.axisBottom(xScale)
yAxis = d3.axisLeft(yScale)


// create a tooltip
const Race_tooltip = d3.select("#Race_2_tooltip")
    .append("div")
    .style("position", "absolute")
    .style("visibility", "hidden")
    .style("background-color", "#49b8c5")
    .style("border", "solid")
    .style("border-color", "black")
    .style("border-width", "3px")
    .style("border-radius", "5px")
    .style("padding-left", "5px")
    .style("padding-right", "5px")
    .style("padding-top", "0px")
    .style("padding-bottom", "0px")


// DRAW AXES
Race_2.append("g")
    .attr("transform", "translate(0," + height + ")") // move to bottom
    .call(xAxis
        .tickSize(0))
    .selectAll("text")
    .attr("font-size", "16")
        .attr("transform", "translate(15,7)")
        .style("text-anchor", "end");

Race_2.append("g")
    .call(yAxis
        .tickSize(-innerWidth*0.46)
        .tickFormat(d3.format(".2s"))
        )
    .attr("font-size", "15")
    .selectAll('.tick line').attr('opacity', 0.3);


// color palette = one color per subgroup
color = d3.scaleOrdinal()
    .domain(subgroups)
    .range(['#f5835d','#b7ce51','#4daf4a', '#ffde59'])

// DRAW BARS
Race_2.append("g")
    .selectAll("g")
    // Enter in data = loop group per group
    .data(data)
    .join("g")
      .attr("transform", d => `translate(${xScale(d.Year)}, 0)`)
    .selectAll("rect")
    .data(function(d) { return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
    .join("rect")
      .attr("x", d => xSubgroup(d.key))
      .attr("y", d => yScale(d.value))
      .attr("width", xSubgroup.bandwidth())
      .attr("height", d => height - yScale(d.value))
      .attr("fill", d => color(d.key))
      .attr("stroke", "#49b8c5")
      .attr("stroke-width", 0) //;

    
     // INTERACTIVITY FOR TOOLTIP
     .on("mouseover", function (event,d){
        d3.select(this).attr("stroke-width", 4)
            Race_tooltip.transition()
                .duration(200)
                .style("visibility","visible")
    
            d3.select(this)
            Race_tooltip.html("<span style='color:black;'><p> Count: " + d.value + "</p></span>" )                            
                .style("left",(event.pageX)+20+"px")
                .style("top",(event.pageY)-50+"px")
                
        })
    
        .on("mouseout",function (event,d){
            d3.select(this).attr("stroke-width",0)
            Race_tooltip.transition().style("visibility","hidden") 
        }  )



// CREATE LABEL 1(annotation)

Race_2.append("line")
    .attr("x1", xScale(1950)*32)
    .attr("x2", xScale(1950)*32)
    .attr("y1", yScale(7000))
    .attr("y2", yScale(200000))
    .attr("stroke", "black")
    .attr("stroke-dasharray", "5")
    
Race_2.append("text")
    .attr("x", xScale(1950)*25)
    .attr("y", yScale(200000))
    .text("Other: 986") // annotation text
    .style("font-size", "13px")
    .attr("fill", "black")

// CREATE LABEL 2(annotation)
Race_2.append("line")
    .attr("x1", xScale(1960)*1.6)
    .attr("x2", xScale(1960)*1.6)
    .attr("y1", yScale(7000))
    .attr("y2", yScale(200000))
    .attr("stroke", "black")
    .attr("stroke-dasharray", "5")
    
Race_2.append("text")
    .attr("x", xScale(1960)*1.45)
    .attr("y", yScale(200000))
    .text("Other: 2,081") // annotation text
    .style("font-size", "13px")
    .attr("fill", "black")

// CREATE LABEL 3(annotation)
Race_2.append("line")
    .attr("x1", xScale(1970)*1.3)
    .attr("x2", xScale(1970)*1.3)
    .attr("y1", yScale(7000))
    .attr("y2", yScale(200000))
    .attr("stroke", "black")
    .attr("stroke-dasharray", "5")
    
Race_2.append("text")
    .attr("x", xScale(1970)*1.225)
    .attr("y", yScale(200000))
    .text("Other: 8,255") // annotation text
    .style("font-size", "13px")
    .attr("fill", "black")

// CREATE LABEL 4(annotation)
Race_2.append("line")
    .attr("x1", xScale(1970)*1.43)
    .attr("x2", xScale(1970)*1.43)
    .attr("y1", yScale(1000))
    .attr("y2", yScale(130000))
    .attr("stroke", "black")
    .attr("stroke-dasharray", "5")
    
Race_2.append("text")
    .attr("x", xScale(1970)*1.32)
    .attr("y", yScale(140000))
    .text("American Indian: 954") // annotation text
    .style("font-size", "13px")
    .attr("fill", "black")


})