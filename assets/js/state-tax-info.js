
const dropdown = document.getElementById("ddlstates");

// add a change event listener to the dropdown menu
dropdown.addEventListener("change", function() {

  // get the value of selected dropdown
  const selectedOption = dropdown.value;

  // get all the div elements with the hidden class
  const hideableDivs = document.querySelectorAll(".hidden-items");

  // loop through and find the div id matching with drop down selection, if match found display it, otherwise, hide it
  hideableDivs.forEach(function(div) {

    if (div.id === selectedOption) {
      div.style.display = "block";
    } else {
      div.style.display = "none";
    }
    
  });

});