
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
  },
  {
    label: "Week4 notes",
    url: "Week4/index.html"
  },
  {
    label: "Week5 notes",
    url: "Week5/index.html"
  },
  {
    label: "Week6 notes",
    url: "Week6/index.html"
  },
  {
    label: "Week7 notes",
    url: "Week7/index.html"
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