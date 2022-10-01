// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC9TcKYgK-mLtEYsckJ3RQZuCxR-YPWKmQ",
    authDomain: "koalla-6916a.firebaseapp.com",
    databaseURL: "https://koalla-6916a-default-rtdb.firebaseio.com",
    projectId: "koalla-6916a",
    storageBucket: "koalla-6916a.appspot.com",
    messagingSenderId: "474291551590",
    appId: "1:474291551590:web:48d0336f286d0098cadca7",
    measurementId: "G-VR8PZF596W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


import {getDatabase, set, get, update, remove, ref, child,} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";

const db = getDatabase();

// Enter

// Find


function insertData() {
    var enterID = document.querySelector('#enterID');
    var enterDate = document.querySelector('#enterMovieDate');
    var enterDetails = document.querySelector('#enterMovieDetails');
    var enterImg = document.querySelector('#enterMovieImg');
    var enterLink = document.querySelector('#enterMovieLink');
    var enterName = document.querySelector('#enterMovieName');
    var enterRate = document.querySelector('#enterMovieRate');
    var enterTime = document.querySelector('#enterMovieTime');
    set(ref(db, "movies/" + enterID.value), {
        name : enterName.value,
        ID : enterID.value,
        date : enterDate.value,
        details : enterDetails.value,
        image : enterImg.value,
        link : enterLink.value,
        rate : enterRate.value,
        time : enterTime.value
    }).then(()=>{
        $('.database-success').text("Veri Başarıyla Eklendi");
    }).catch((error)=>{
        alert(error);
    });
}





function UpdateData() {
    var enterID = document.querySelector('#enterID');
    var enterDate = document.querySelector('#enterMovieDate');
    var enterDetails = document.querySelector('#enterMovieDetails');
    var enterImg = document.querySelector('#enterMovieImg');
    var enterLink = document.querySelector('#enterMovieLink');
    var enterName = document.querySelector('#enterMovieName');
    var enterRate = document.querySelector('#enterMovieRate');
    var enterTime = document.querySelector('#enterMovieTime');
    update(ref(db, "movies/" + enterID.value),{
        name : enterName.value,
        ID : enterID.value,
        date : enterDate.value,
        details : enterDetails.value,
        image : enterImg.value,
        link : enterLink.value,
        rate : enterRate.value,
        time : enterTime.value
    })
    .then(()=>{
        $('.database-success').text("Veri Başarıyla Güncellendi");
    })
    .catch((error)=>{
        alert(error)
    });
}

function RemoveData() {
    var enterID = document.querySelector('#enterID');
    remove(ref(db, "movies/" + enterID.value))
    .then(()=>{
        $('.database-success').text("Veri Başarıyla Silindi");
    })
    .catch((error)=>{
        alert(error);
    })
}


function getAllDataOnce() {
    const dbRef = ref(db);

    get(child(dbRef, "movies"))
    .then((snapshot)=>{
        var movies = [];

        snapshot.forEach(childSnapshot => {
            movies.push(childSnapshot.val());
        });
        movies.forEach(element => {
            $('.new-movies').append(`
            <div class="movie-item" data-id="${element.ID}">
                <a href="#" class="text-decoration-none">
                    <div class="movie-item-img">
                        <img src="${element.image}" class="img-fluid">
                    </div>
                    <div class="movie-item-title p-2 px-3">
                        <h6 class="text-light text-truncate" id="movie-name">
                            ${element.name}
                        </h6>
                        <div class="d-flex gap-2 text-truncate">
                            <span id="movie-date">${element.date}</span>
                            <span id="movie-time" class="text-truncate">${element.time} - dakika</span>
                        </div>
                    </div>
                </a>
            </div>
        `);
        });
    })
}




getAllDataOnce();

$(document).on('click', '#insert', insertData);
$(document).on('click', '#update', UpdateData);
$(document).on('click', '#remove', RemoveData);



let movieContainer = $('.movie-fs-player');
movieContainer.addClass('animate__animated');
let customMovieShow = () => {
    movieContainer.show().addClass('animate__zoomIn');
    setTimeout(() => {
            movieContainer.removeClass('animate__zoomIn');
    }, 800);
}
let customMovieHide = () =>{
    movieContainer.addClass('animate__backOutLeft');
    setTimeout(() => {
        movieContainer.removeClass('animate__backOutLeft').hide();
    }, 500);
}

$(document).on('click', '.movie-item',function () {
    let data_Id = this.getAttribute('data-id');
    console.log(data_Id);
    const dbRef = ref(db);
    get(child(dbRef, "movies"))
    .then((snapshot)=>{
        let movies = [];
        snapshot.forEach(childSnapshot =>{
            movies.push(childSnapshot.val());
        });
        movies.forEach(movieItem =>{
            if (data_Id == movieItem.ID) {
                customMovieShow();
                console.log(movieItem.link);
                $('#movie-player').attr('src', movieItem.link);
            }
        })
    });
    
});

$('#movie-close').click(function () { 
    customMovieHide();
    $('#movie-player').removeAttr('src');
});