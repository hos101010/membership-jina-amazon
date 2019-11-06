const cards = document.querySelectorAll('.card');
var pass_time = 1;

cardClickHandler(0);

for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', () => { cardClickHandler(i) });
}





function cardClickHandler(idx) {
    makeAllSmall();
    changeSize(idx, SIZE_CHANGE, BIG_ONE_BACKGROUND_SIZE);
    makeBottomButton(idx);

    cards.forEach(element => {
        element.style.zIndex = "0";
    });
    cards[idx].style.zIndex = "1";

    makeShadow(idx);
}



function makeAllSmall() {
    for (let i = 0; i < cards.length; i++) {
        changeSize(i, 0, ORIGINAL_BACKGROUND_SIZE);
    };
}



function changeSize(idx, size_change, backgroundSize) {
    cards[idx].style.width = `${CARD_WIDTH + size_change}rem`;
    cards[idx].style.height = `${CARD_HEIGHT + size_change}rem`;
    cards[idx].style.backgroundSize = backgroundSize;

    cards[idx].style.left = `${(CARD_WIDTH + INTERVAL_BETWEEN_CARDS) * idx - size_change / 2}rem`;
    cards[idx].style.top = `${-size_change / 2}rem`;

    //childNode[1] : p
    cards[idx].childNodes[1].style.top = `${CARD_TITLE_TOP + size_change / 2}rem`
}



function makeShadow(idx) {
    cards.forEach(element => {
        element.style.boxShadow = '0 0';
    });

    if (idx == 0) {
        cards[idx + 1].style.boxShadow = RIGHT_SHADOW;
        return;
    }

    cards[idx - 1].style.boxShadow = LEFT_SHADOW;
    if (idx == cards.length - 1) return;
    cards[idx + 1].style.boxShadow = RIGHT_SHADOW;
}



function makeBottomButton(idx) {
    document.querySelectorAll('.card div').forEach(element => {
        element.innerHTML = '';
    });

    let html = ''
    let category = cards[idx].childNodes[1].innerText.toLowerCase();

    let previous_content = 0;
    let end_flag = false;
    let content_quantity = data.bottom_carousel.filter(function (element) {
        if (!end_flag && (element.category != category)){
            previous_content++;
        }else end_flag = true;
        return element.category == category;
    }).length;

    for (let i = 0; i < content_quantity; i++) {
        html += `<input type="button" id="card${previous_content+i}">`;
    }
    document.querySelectorAll('.card div')[idx].innerHTML += html;

    for (let i = 0; i < content_quantity; i++) {
        document.querySelector(`#card${previous_content+i}`).addEventListener('click', () => { moveToCarousel(previous_content+i) });
    }
}



function moveToCarousel(bottom_carousel_id) {
    let all_bottom_carousel = document.querySelector('.all_bottom_carousel');
    let title = document.querySelectorAll('.bottom_carousel_component')[1].childNodes[3].innerHTML;
    let present_carousel = data.bottom_carousel.filter(function (element) {
        return element.title == title;
    })
    all_bottom_carousel.style.transition = "all 3s";

    if (present_carousel[0].id < bottom_carousel_id){
        pass_time = bottom_carousel_id-present_carousel[0].id;
    }
    else{
        pass_time = data.bottom_carousel.length-present_carousel[0].id+bottom_carousel_id;
        all_bottom_carousel.style.transform = `translate(-${pass_time+1}00%)`
    }
    all_bottom_carousel.style.transform = `translate(-${pass_time+1}00%)`
}

