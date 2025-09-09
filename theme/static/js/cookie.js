document.addEventListener('DOMContentLoaded', function (){
    const cookiePopup = document.querySelector('.fixed.bottom-0');
    const closeButton = cookiePopup.querySelector('button');

    closeButton.addEventListener('click', function (){
        cookiePopup.style.display = 'none';
        localStorage.setItem('cookiesAccepted', 'dismissed');
    });

    if(localStorage.getItem('cookiesAccepted') === 'dismissed') {
        cookiePopup.style.display = 'none';
    }
});