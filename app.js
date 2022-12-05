d3.csv("wins_members_list.csv").then(function (data) {
    console.log(data);
    // wins_members_list

  var members = data;

  var button = d3.select("#button");

  var form = d3.select("#form");

  button.on("click", runEnter);
  form.on("submit", runEnter);

  function runEnter() {
    d3.select("tbody").html("")
    d3.selectAll("p").classed('noresults', true).html("")
    d3.event.preventDefault();
    var inputElement = d3.select("#user-input");
    var inputValue = inputElement.property("value").toLowerCase().trim();

    console.log(inputValue.length);///
    console.log(members);
    // TODO: figure out terms that would lead to no results
    // if (inputValue.length < 6){
    //   d3.select("p").classed('noresults2', true).html("<center><strong>Please try using more than 5 characters to avoid too many results!</strong>")
    //   inputValue = "Something to give no results"
    // }
      var filteredData = members.filter(members => members.full_name.toLowerCase().trim().includes(inputValue));
    console.log("filteredData", filteredData);
    console.log(filteredData.length)
    if (filteredData.length === 0 && inputValue !== "Something to give no results"){
      d3.select("p").classed('noresults', true).html("<center><strong>No results. Please check your spelling!</strong>")
    }
    output = _.sortBy(filteredData, 'full_name')

    for (var i = 0; i < filteredData.length; i++) {
      // console.log(output[i]['original_title'])
      // console.log(output[i]['avg_vote'])
      // d3.select("tbody>tr>td").text(output[i]['original_title']);

      // TODO: calculate years since jioned
      console.log("timestamp", output[i]['timestamp'])
      
      d3.select("tbody").insert("tr").html("<td>" + output[i]['full_name'] + "</td>" +
        "<td>" + (output[i]['pronouns']) + "</td>" +
        "<td>" + (output[i]['affiliation_institution']) + "</td>" +
        "<td>" + (output[i]['timestamp']) + "</td>" +
        "<td>" + (output[i]['online_profiles']) + "</td>" +
        "<td>" + (output[i]['network_interests']) + "</td>")
    }
  };
  window.resizeTo(screen.width,screen.height)


});

                //   <!-- <th scope="col">#</th>
                //   <th scope="col">Movie</th>
                //   <th scope="col">Rating</th>
                //   <th scope="col">Year</th>
                //   <th scope="col">Director</th>
                //   <th scope="col">Description</th> -->

                //   <th scope="col">Name</th>
                //   <th scope="col">Pronouns</th>
                //   <th scope="col">Affiliation</th>
                //   <th scope="col">Year</th>
                //   <th scope="col">Website</th>
                //   <th scope="col">Research Keywords</th>