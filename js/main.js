
const tableContents = document.querySelector("#table-contents");
const links = [
  {
    label: "Week1 notes",
    url: "Week1/index.html"
  },
  {
    label: "Week2 notes",
    url: "Week2/index.html"
  },
  {
    label: "Week3 notes",
    url: "Week3/index.html"
  }


];

links.forEach((link) => {
  const list = document.createElement("li");
  const url = document.createElement("a");
  url.setAttribute("href", link.url);
  url.textContent = link.label;
  list.appendChild(url);
  tableContents.appendChild(list);
})