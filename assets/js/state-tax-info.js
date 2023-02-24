function showstate()
{
  const dropdown = document.getElementById("ddlstates");
  const selectedOption = dropdown.value;

  // get all the div elements with the hidden class
  const hideableDivs = document.querySelectorAll(".hidden-items");
  hideableDivs.forEach(function(div) {

    if (div.id === selectedOption) {
      div.style.display = "block";
    } else {
      div.style.display = "none";
    }
    
  });

}
