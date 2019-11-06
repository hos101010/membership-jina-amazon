class BottomCarousel {
    constructor(carousel) {
        this.carousel = carousel;
    }

    render() {
        return `<div class="bottom_carousel_component"
                style="background-image: url(${this.carousel.img});">
                    <div class='${this.carousel.category}'>${this.carousel.keyword}</div>
                    <h1>${this.carousel.title}</h1>
                    <h3>${this.carousel.content}</h3>
                    <a href="${this.carousel.link_url}">${this.carousel.link_text}</a>
                </div>`;
    }
}





make_bottom_carousel();

document.querySelector('.left').addEventListener('click',clickLeftHandler);
document.querySelector('.right').addEventListener('click', clickRightHandler);
document.querySelector('.all_bottom_carousel').addEventListener('transitionend',afterClickLeftHandler);






function make_bottom_carousel() {
    let html = '';
    let bottom_carousel;


    for (let i = 0; i < data.bottom_carousel.length; i++) {
        bottom_carousel = new BottomCarousel(data.bottom_carousel[i]);
        html += bottom_carousel.render();
    }
    document.querySelector('.all_bottom_carousel').innerHTML = html;
}


let bottom_carousel_direction;
function clickLeftHandler(){
    bottom_carousel_direction = -1;
    let all_bottom_carousel = document.querySelector('.all_bottom_carousel');
    all_bottom_carousel.style.transition = "all 0.5s";
    all_bottom_carousel.style.transform = "translate(0%)"
}

function clickRightHandler(){
    bottom_carousel_direction = 1;
    let all_bottom_carousel = document.querySelector('.all_bottom_carousel');
    all_bottom_carousel.style.transition = "all 0.5s";
    all_bottom_carousel.style.transform = "translate(-200%)"
}

function afterClickLeftHandler(){
    let all_bottom_carousel = document.querySelector('.all_bottom_carousel');

    if (bottom_carousel_direction == -1){
        for(let i=0; i<pass_time; i++){
        all_bottom_carousel.prepend(all_bottom_carousel.lastElementChild);
        }
    }
    else{
    for(let i=0; i<pass_time; i++){

        all_bottom_carousel.appendChild(all_bottom_carousel.firstElementChild);
    }}
    all_bottom_carousel.style.transition = "none";
    all_bottom_carousel.style.transform="translate(-100%)"

    pass_time = 1;
}
