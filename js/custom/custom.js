$(function () {
    
    let screenSize = $(window).width();
    function animations(item,time,showTime,animationName) {
        setTimeout(() => {
            $(item).
            show(showTime).
            css('display','flex').
            addClass('animate__animated '+ animationName);
        }, time);
    }
    animations('.search-bar',600,300,' animate__backInDown');
    animations('.carousel-wrapper',1200,300,'animate__backInLeft');
    animations('.new-movies-wrapper',1800,300,'animate__backInLeft');
    animations('.footer',2400,300,'animate__backInLeft');
    
    if (screenSize <= 768) {
        animations('.navbar',300,null,'animate__fadeInDown');
    } else {
        $('.navbar').show().css('display','flex').addClass('animate__animated animate__fadeInLeftBig')
    }
    // movieItems.forEach(element => {
    //     $('.new-movies').append(`
    //         <div class="movie-item" data-id="${element.Id}">
    //             <a href="#" class="text-decoration-none">
    //                 <div class="movie-item-img">
    //                     <img src="${element.Resim}" class="img-fluid">
    //                 </div>
    //                 <div class="movie-item-title p-2 px-3">
    //                     <h6 class="text-light text-truncate" id="movie-name">
    //                         ${element.Baslik}
    //                     </h6>
    //                     <div class="d-flex gap-2 text-truncate">
    //                         <span id="movie-date">${element.Tarih}</span>
    //                         <span id="movie-time" class="text-truncate">${element.Sure} - dakika</span>
    //                     </div>
    //                 </div>
    //             </a>
    //         </div>
    //     `);
    // });

    // let movieContainer = $('.movie-fs-player');
    // movieContainer.addClass('animate__animated');
    // let customMovieShow = () => {
    //     movieContainer.show().addClass('animate__zoomIn');
    //     setTimeout(() => {
    //          movieContainer.removeClass('animate__zoomIn');
    //     }, 800);
    // }
    // let customMovieHide = () =>{
    //     movieContainer.addClass('animate__backOutLeft');
    //     setTimeout(() => {
    //         movieContainer.removeClass('animate__backOutLeft').hide();
    //     }, 500);
    // }

    // bir filme tıklandığında film oynatma kısmını aç
    // $('.movie-item').click(function () {
    //     let data_Id = this.getAttribute('data-id');
    //     movieItems.forEach(element => {
    //         if (data_Id == element.Id) {
    //            customMovieShow();
               
    //         }
    //     });
        
    // });
    
    // filmi kapatma buttonunu gizle
    function fadeUpButton() {
        $('.movie-close-section').css('background','none');
        $('#movie-close').addClass('animate__fadeOutUp');
            $('#movie-close').removeClass('animate__fadeOutUp').hide();
    }
    
    $(document).on('click', '.movie-item',function (){
        setTimeout(() => {
            fadeUpButton();
        }, 6000);
    });

    $('.movie-close-section').on('mouseenter', function () {
        $('#movie-close').addClass('animate__fadeInDown').show();
            $('#movie-close').removeClass('animate__fadeInDown');    
        $('.movie-close-section').removeAttr('style');
    });

    $('.movie-close-section').mouseleave(function () { 
        setTimeout(() => {
            fadeUpButton();
        }, 0);
    });
    
    

    // $('#movie-close').click(function () { 
    //     customMovieHide();
    // });

    $('.mobile-menu-button').click(function () { 
        $('.mobile-menu-wrapper').show().addClass('animate__fadeInDown');
        setTimeout(() => {
            $('.mobile-menu-wrapper').removeClass('animate__fadeInDown');
        }, 700);
    });

    $('.mobile-menu-close-button').click(function () { 
        $('.mobile-menu-wrapper').addClass('animate__fadeOutUp');
        setTimeout(() => {
            $('.mobile-menu-wrapper').hide().removeClass('animate__fadeOutUp');
        }, 700);
    });

    
});


// const isMobile = navigator.userAgentData.mobile;

// if (isMobile) {
//     if ($(window).width() < 520) {
//         $('#movie-player').css('height','90%');
//     } else if ($(window).width() > 520) {
//         $('#movie-player').css('height','80%');
//     }
// }

// $(window).resize(function () {
//     if (isMobile) {
//         if ($(window).width() > 520) {
//             $('#movie-player').css('height','80%');
//         } else if ($(window).width() < 520) {
//             $('#movie-player').css('height','90%');
//         }
//     }
// })