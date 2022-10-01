import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";

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
    if (enterID.value == "") {
        alert("ID girmeniz zorunludur");
    } else {
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
            $('.database-success').removeClass('text-danger').addClass('text-success').text("Veri Başarıyla Eklendi");
        }).catch((error)=>{
            alert(error);
        });
    }
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
    if (enterID.value == "") {
        alert("ID girmeniz zorunludur");
    } else{
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
            $('.database-success').removeClass('text-danger').addClass('text-success').text("Veri Başarıyla Güncellendi");
        })
        .catch((error)=>{
            alert(error)
        });
    }
}

function RemoveData() {
    var enterID = document.querySelector('#enterID');
    console.log(enterID.value);
    if (enterID.value == "") {
        alert("ID Girmeniz Zorunludur");
    } else {
        remove(ref(db, "movies/" + enterID.value))
        .then(()=>{
            $('.database-success').removeClass('text-success').addClass('text-danger').text("Veri Başarıyla Silindi");
        })
        .catch((error)=>{
            alert(error);
        })
    }
}


function getAllDataOnce() {
    const dbRef = ref(db);

    get(child(dbRef, "movies"))
    .then((snapshot)=>{
        var movies = [];

        snapshot.forEach(childSnapshot => {
            movies.push(childSnapshot.val());
        });
        movies.forEach(movie => {
            // Filmler Kısmı Render
            $('.new-movies').append(`
            <div class="movie-item" data-id="${movie.ID}">
                <a href="#" class="text-decoration-none">
                    <div class="movie-item-img">
                        <img src="${movie.image}" class="img-fluid">
                    </div>
                    <div class="movie-item-title p-2 px-3">
                        <h6 class="text-light text-truncate" id="movie-name">
                            ${movie.name}
                        </h6>
                        <div class="d-flex gap-2 text-truncate">
                            <span id="movie-date">${movie.date}</span>
                            <span id="movie-time" class="text-truncate">${movie.time} - dakika</span>
                        </div>
                    </div>
                </a>
            </div>
            `);

            // Slider Kısmı Render
            // $('.carousel-inner').append(`
            //     <div class="carousel-item" style="background: url(${movie.image}); background-repeat: no-repeat; background-size: 100%; 
            //     background-position: center;">
            //     <div class="slider-item d-flex flex-column flex-md-row justify-content-md-center align-items-center gap-3 gap-md-0 py-3 px-5">
            //         <div class="col-12 col-md-4 col-xxl-5 justify-content-center d-flex justify-content-md-end ps-md-4">
            //             <img src="${movie.image}" id="slider-item-image" class="img-fluid rounded">
            //         </div>
            //         <div class="col-12 col-md-8 pe-md-5 col-xxl-7 px-md-4 justify-content-center justify-content-md-center  d-flex gap-md-2 gap-1 flex-column">
            //             <div class="d-flex">
            //                 <h3 class="text-light text-truncate" id="movie-title">${movie.name}</h3>
            //             </div>
            //             <div class="d-flex gap-3">
            //                 <span class="text-light text-truncate" id="movie-year">${movie.date}</span>
            //                 <span class="text-light text-truncate" id="movie-time">${movie.time} - dakika</span>
            //                 <span class="text-light text-truncate" id="movie-rate">Imdb ${movie.rate}</span>
            //             </div>
            //             <div class="d-flex">
            //                 <p id="movie-subtitle">
            //                     ${movie.details}
            //                 </p>
            //             </div>
            //             <div class="watch-button-wrapper d-flex ">
            //                 <button class="btn sliderButtonWatch rounded-pill px-3 d-flex text-truncate gap-2 align-items-center" data-slider-id="${movie.ID}"><i class="fa-solid fa-play"></i><span>Şimdi İzle</span></button>
            //             </div>
            //         </div>
            //     </div>
            //     </div>
            // `);
            // $('.carousel-item:first').addClass('active');
        });
        for (let i = 0; i < 6; i++) {
            $('.carousel-inner').append(`
            <div class="carousel-item" style="background: url(${movies[i].image}); background-repeat: no-repeat; background-size: 100%; 
            background-position: center;">
            <div class="slider-item d-flex flex-column flex-md-row justify-content-md-center align-items-center gap-3 gap-md-0 py-3 px-5">
                <div class="col-12 col-md-4 col-xxl-5 justify-content-center d-flex justify-content-md-end ps-md-4">
                    <img src="${movies[i].image}" id="slider-item-image" class="img-fluid rounded">
                </div>
                <div class="col-12 col-md-8 pe-md-5 col-xxl-7 px-md-4 justify-content-center justify-content-md-center  d-flex gap-md-2 gap-1 flex-column">
                    <div class="d-flex">
                        <h3 class="text-light text-truncate" id="movie-title">${movies[i].name}</h3>
                    </div>
                    <div class="d-flex gap-3">
                        <span class="text-light text-truncate" id="movie-year">${movies[i].date}</span>
                        <span class="text-light text-truncate" id="movie-time">${movies[i].time} - dakika</span>
                        <span class="text-light text-truncate" id="movie-rate">Imdb ${movies[i].rate}</span>
                    </div>
                    <div class="d-flex">
                        <p id="movie-subtitle">
                            ${movies[i].details}
                        </p>
                    </div>
                    <div class="watch-button-wrapper d-flex ">
                        <button class="btn sliderButtonWatch rounded-pill px-3 d-flex text-truncate gap-2 align-items-center" data-slider-id="${movies[i].ID}"><i class="fa-solid fa-play"></i><span>Şimdi İzle</span></button>
                    </div>
                </div>
            </div>
            </div>
        `);
        $('.carousel-item:first').addClass('active');
        }
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
                $('#movie-player').attr('src', movieItem.link);
            }
        })
    });
});

$(document).on('click', '.sliderButtonWatch',function () {
    let data_slider_Id = this.getAttribute('data-slider-id');
    const dbRef = ref(db);
    get(child(dbRef, "movies"))
    .then((snapshot)=>{
        let movies = [];
        snapshot.forEach(childSnapshot =>{
            movies.push(childSnapshot.val());
        });
        movies.forEach(movieItem =>{
            if (data_slider_Id == movieItem.ID) {
                customMovieShow();
                $('#movie-player').attr('src', movieItem.link);
            }
        })
    });
});

$('#movie-close').click(function () { 
    customMovieHide();
    $('#movie-player').removeAttr('src');
});

