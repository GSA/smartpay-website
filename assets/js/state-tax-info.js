function showstate()
{
  const dropdown = document.getElementById("ddlstates");
  const selectedStatePath = dropdown.value;
  if (selectedStatePath) {
    const target = window.location.protocol + "//" + window.location.host + selectedStatePath;
    window.location.href = target;
  }
}
