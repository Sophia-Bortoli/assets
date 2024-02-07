let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
}


document.querySelector('#search-btn').onclick = () =>{
    navbar.classList.remove('active');
}


document.querySelector('#cart-btn').onclick = () =>{
    navbar.classList.remove('active');
}

window.onscroll = () => {
    navbar.classList.remove('active');
}
    