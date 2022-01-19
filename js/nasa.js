const d = new Date();
const year = d.getFullYear();
const month = d.getMonth() + 1;
const date = d.getDate();
const today = year + '-' + month + '-' + date;

var start = today;
var end = today;

var url = "https://api.nasa.gov/planetary/apod?start_date=" + start + "&end_date=" + end + "&api_key=aJ2XEIZ802Yah5lwa1OYdCU8mr0YeAWvib5sCloH";

var first = true;
var loaded = false;
var dataLength;

function setup() {
    // noCanvas();

    document.getElementById('bodyLoader').style.display = 'flex';
    document.getElementById('imageSpace').style.display = 'none';

    loadJSON(url, gotData);
}

function gotData(data) {
    for (var i = 0; i < data.length; i++) {
        var imageSection = document.createElement('section');
        var imageText = document.createElement('article');
        var feedImage = document.createElement('img');
        feedImage.src = data[i].hdurl;
        var feedTitle = document.createElement('h2');
        feedTitle.innerHTML = data[i].title;
        var feedDate = document.createElement('h3');
        feedDate.innerHTML = data[i].date;
        var feedExp = document.createElement('p');
        feedExp.innerHTML = data[i].explanation;
        imageText.append(feedTitle, feedDate, feedExp)
        var likeButton = document.createElement('button');
        likeButton.setAttribute('id', 'button'+i);
        likeButton.setAttribute('class', 'like');


        imageSection.append(feedImage, imageText, likeButton);
        document.getElementById("imageSpace").appendChild(imageSection);

        if (i===data.length-1) {
            loaded = true;
            dataLength = data.length;
            for (let i=0; i<dataLength; i++) {
                document.getElementById('button'+i).onclick = function () {
                    document.getElementById('button'+i).classList.toggle('selected');
                };
            }
        }
    }

    if (first===true) {
        setTimeout(() => {
            document.getElementById('bodyLoader').style.display = 'none';
            document.getElementById('imageSpace').style.display = 'block';
        }, 1500);

        first = false;
        
    } else {
        document.getElementById('bodyLoader').style.display = 'none';
        document.getElementById('imageSpace').style.display = 'block';
    }
}

mobiscroll.setOptions({
    theme: 'ios',
    themeVariant: 'light'
});

$(function () {

    $('#demo-start-end').mobiscroll().datepicker({
        controls: ['calendar'],
        select: 'range',
        display: 'anchored',
        startInput: '#demo-init-start',
        endInput: '#demo-init-end',
        max: today,
        dateFormat: 'YYYY-MM-DD',
    });

    $('#start').on('change', function() {
        start = $('#demo-init-start').val()
      })

      $('#end').on('change', function() {
        end = $('#demo-init-end').val()
        url = "https://api.nasa.gov/planetary/apod?start_date=" + start + "&end_date=" + end + "&api_key=aJ2XEIZ802Yah5lwa1OYdCU8mr0YeAWvib5sCloH"
        document.getElementById("imageSpace").innerHTML = ""
        setup()
      })
});

