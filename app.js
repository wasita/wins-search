d3.csv("wins_members_list.csv").then(function (data) {
  // console.log(data);

  var members = data;

  var button = d3.select("#button");

  var form = d3.select("#form");

  const runEnter = () => {
    d3.select("tbody").html("")
    d3.selectAll("p").classed('noresults', true).html("")
    d3.event.preventDefault();
    var inputElement = d3.select("#user-input");
    var inputValue = inputElement.property("value").toLowerCase().trim();

    // FUTURE TODO IF NEEED: figure out terms that would lead to no results
    // if (inputValue.length < 6){
    //   d3.select("p").classed('noresults2', true).html("<center><strong>Please try using more than 5 characters to avoid too many results!</strong>")
    //   inputValue = "Something to give no results"
    // }

    // this filters based on full_name col
    const nameFilteredData = members.filter(members => members.full_name.toLowerCase().trim().includes(inputValue));
    const affilitationFilteredData = members.filter(members => members.affiliation_institution.toLowerCase().trim().includes(inputValue));
    const researchKeywordsFilteredData = members.filter(members => members.network_interests.toLowerCase().trim().includes(inputValue));

    // check which col filtered data to use
    if (nameFilteredData.length > 0) {
      var filteredData = nameFilteredData;
    } else if (affilitationFilteredData.length > 0) {
      var filteredData = affilitationFilteredData;
    } else if (researchKeywordsFilteredData.length > 0) {
      var filteredData = researchKeywordsFilteredData;
    }
    else if (nameFilteredData.length === 0 && affilitationFilteredData.length === 0 && researchKeywordsFilteredData.length === 0 && inputValue !== "Something to give no results"){
      d3.select("p").classed('noresults', true).html("<center><strong>No results. Check your spelling or try a different search term</strong>")
    }

    const filteredLength = filteredData?.length || 0;

    if (filteredLength !== 0) {
      output = _.sortBy(filteredData, 'full_name')
      for (var i = 0; i < filteredData.length; i++) {

        // calculate years since jioned
        const joinDate = new Date(output[i]['timestamp']);
        const todayDate = new Date();
        const dateDiff = calcDate(todayDate, joinDate);

        // TODO: render output[i]['online_profiles'] as href links
        // likely requires to iterate through online_profiles
        
        d3.select("tbody").insert("tr").html("<td>" + output[i]['full_name'] + "</td>" +
          "<td>" + (output[i]['pronouns']) + "</td>" +
          "<td>" + (output[i]['affiliation_institution']) + "</td>" +
          "<td>" + (dateDiff) + "</td>" +
          "<td>" + (convertLinks(output[i]['online_profiles'])) + "</td>" +
          "<td>" + (output[i]['network_interests']) + "</td>")
      }
      }
  }
  window.resizeTo(screen.width, screen.height)
  
  button.on("click", runEnter);
  form.on("submit", runEnter);
});

