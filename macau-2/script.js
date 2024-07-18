//메인 슬라이드 
document.addEventListener('DOMContentLoaded', function () {
    new Swiper('.indexSwiperBox', {
        direction: 'horizontal',
        loop: true,
        speed: 800,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        on: {
            slideChangeTransitionStart: function () {
                const activeSlide = this.slides[this.activeIndex];
                const animatedElements = activeSlide.querySelectorAll('.animate__animated');
                animatedElements.forEach(el => {
                    el.classList.remove('animate__fadeInDown', 'animate__fadeInUp');
                    void el.offsetWidth; // 리플로우 트리거
                    el.classList.add(el.classList.contains('animate__fadeInDown') ? 'animate__fadeInDown' : 'animate__fadeInUp');
                });
            }
        }
    });
});

//모바일 사이드 메뉴
document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('searchButton');
    if (searchButton) {
        searchButton.addEventListener('click', () => {
            setSearchView();
            loadPage(1);
        });
    } else {
        console.error("'searchButton' element not found");
    }

    // ... 나머지 코드 ...
});

//메인 슬라이드
document.addEventListener('DOMContentLoaded', function () {
    const swiper = new Swiper('.mvSlider', {
        direction: 'horizontal',
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        on: {
            slideChangeTransitionStart: function () {
                const activeSlide = this.slides[this.activeIndex];
                const animatedElements = activeSlide.querySelectorAll('.animate__animated');
                animatedElements.forEach(el => {
                    const animation = el.dataset.animation;
                    el.classList.remove(animation);
                    void el.offsetWidth; // 리플로우 트리거
                    el.classList.add(animation);
                });
            }
        }
    });
});

//이벤트 배너
document.addEventListener('DOMContentLoaded', function () {
    // 기존의 Swiper 초기화 코드...

    // 이벤트 배너 Swiper
    const eBannerSwiper = new Swiper('.e-banner-swiper', {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            // 576px 이상일 때
            576: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            // 768px 이상일 때
            768: {
                slidesPerView: 1,
                spaceBetween: 15,
            },
            // 992px 이상일 때
            992: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            // 1200px 이상일 때
            1200: {
                slidesPerView: 3,
                spaceBetween: 20,
            }
        }
    });
});

//이메일 전화 팝업
function openEmailPopup(event) {
    event.preventDefault();
    window.open('email.html', 'EmailPopup', 'width=600,height=600');
}

function handlePhoneClick(event) {
    if (!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
        event.preventDefault();
        alert('휴대전화기기에서만 전화 연결이 가능합니다.');
    }
}