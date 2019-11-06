class MiniCarousel {
    constructor(carousel){
        this.carousel = carousel;
    }

    render() {
        return `<a class="slider_component" 
                    href="${this.carousel.href}"
                    style="background-image: url(${this.carousel.imgsrc});"></a>
        `;
    }
}

function make_mini_carousel(){
    let html = '';
    let mini_carousel;

    for (let i = 0; i < data.mini_carousel.length; i++) {
        mini_carousel = new MiniCarousel(data.mini_carousel[i]);
        html += mini_carousel.render();
    }
    document.querySelector('.all_mini_carousel').innerHTML = html;
}

make_mini_carousel();






document.querySelector('.prev_btn').addEventListener('click', moveMiniLeftHandler);
document.querySelector('.next_btn').addEventListener('click', moveMiniRightHandler);
document.querySelector('.mini_carousel_viewport').addEventListener('transitionend', doAfterMiniMoveHandler);

setInterval(moveMiniRightHandler, 3000);









let all_mini_carousel = document.querySelector('.all_mini_carousel');
let direction;

function moveMiniLeftHandler(){
    direction = -1;
    all_mini_carousel.style.transition = 'all 0.5s';
    all_mini_carousel.style.transform = `translate(0)`;
}

function moveMiniRightHandler(){
    direction = 1;
    all_mini_carousel.style.transition = "all 0.5s";
    all_mini_carousel.style.transform = `translate(-${MINI_WIDTH*2}rem)`;
}

function doAfterMiniMoveHandler(){
    if (direction == -1)
        all_mini_carousel.prepend(all_mini_carousel.lastElementChild);
    else
        all_mini_carousel.appendChild(all_mini_carousel.firstElementChild);

    all_mini_carousel.style.transition = 'none';
    all_mini_carousel.style.transform = `translate(-${MINI_WIDTH*1}rem)`;
}


