// getting today's date
const d = new Date();
const year = d.getFullYear();
const month = d.getMonth() + 1;
const date = d.getDate();
const today = year + "-" + month + "-" + date;
// set the initial url to only show today's image
var start = today;
var end = today;
var url =
  "https://api.nasa.gov/planetary/apod?start_date=" +
  start +
  "&end_date=" +
  end +
  "&api_key=aJ2XEIZ802Yah5lwa1OYdCU8mr0YeAWvib5sCloH";

var first = true; // variable to check if it's the first time the loader is on screen

// function to set up the loader and images
function setup() {
  // have the loader visible and the images not visible when loading
  document.getElementById("bodyLoader").style.display = "flex";
  document.getElementById("imageSpace").style.display = "none";
  // get data from NASA API
  loadJSON(url, gotData);
}

function gotData(data) {
  // create a section for each of the images to be displayed
  for (var i = 0; i < data.length; i++) {
    var imageSection = document.createElement("section");
    var imageText = document.createElement("article");
    var feedImage = document.createElement("img");
    feedImage.src = data[i].hdurl;
    var feedTitle = document.createElement("h2");
    feedTitle.innerHTML = data[i].title;
    var feedDate = document.createElement("h3");
    feedDate.innerHTML = data[i].date;
    var feedExp = document.createElement("p");
    feedExp.innerHTML = data[i].explanation;
    imageText.append(feedTitle, feedDate, feedExp);
    var likeButton = document.createElement("button");
    likeButton.setAttribute("id", "button" + i); // set an individual id for each of the images
    likeButton.setAttribute("class", "like"); // apply the "like" class for the buttons
    imageSection.append(feedImage, imageText, likeButton);
    document.getElementById("imageSpace").appendChild(imageSection);

    // if this is the last iteration of the loop, apply a toggle method for each of the like buttons on click to like/unlike
    if (i === data.length - 1) {
      for (let i = 0; i < data.length; i++) {
        document.getElementById("button" + i).onclick = function () {
          document.getElementById("button" + i).classList.toggle("selected");
        };
      }
    }
  }
  // if this is the initial screen, set a 1.5s timer for the loader since the loader won't be shown for long enough for 1 image
  if (first === true) {
    setTimeout(() => {
      document.getElementById("bodyLoader").style.display = "none";
      document.getElementById("imageSpace").style.display = "block";
    }, 1500);

    first = false;
  } else {
    document.getElementById("bodyLoader").style.display = "none";
    document.getElementById("imageSpace").style.display = "block";
  }
}

$(function () {
  $(".dates #start")
    .datepicker({
      format: "yyyy-mm-dd",
      endDate: end,
      autoclose: true,
      todayHighlight: true,
    })
    .on("changeDate", Start);

  $(".dates #end")
    .datepicker({
      format: "yyyy-mm-dd",
      startDate: start,
      endDate: today,
      autoclose: true,
      todayHighlight: true,
    })
    .on("changeDate", End);

  // function for updating the url when the start date is changed and setting up images again
  function Start() {
    start = $("#start").val();
    url =
      "https://api.nasa.gov/planetary/apod?start_date=" +
      start +
      "&end_date=" +
      end +
      "&api_key=aJ2XEIZ802Yah5lwa1OYdCU8mr0YeAWvib5sCloH";
    $(".dates #end").datepicker("setStartDate", start);
    document.getElementById("imageSpace").innerHTML = "";
    setup();
  }

  // function for updating the url when the end date is changed and setting up images again
  function End() {
    end = $("#end").val();
    url =
      "https://api.nasa.gov/planetary/apod?start_date=" +
      start +
      "&end_date=" +
      end +
      "&api_key=aJ2XEIZ802Yah5lwa1OYdCU8mr0YeAWvib5sCloH";
    $(".dates #start").datepicker("setEndDate", end);
    document.getElementById("imageSpace").innerHTML = "";
    setup();
  }
});
