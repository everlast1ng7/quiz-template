import '../index.css'
import searchImage from './assets/images/imgQ.png'
import {getHeader, renderStep} from './components/templates.js'
import {stepsData} from './utils/index.js'

let activeIndexStep = 0;

let a = `<img src="${searchImage}" class="wrapper__container_about__img" />`;
document.querySelector('.wrapper__container_about').insertAdjacentHTML("beforeEnd", a);

const wrapperTemplate = document.querySelector('.wrapper__container_quiz__template');
wrapperTemplate.insertAdjacentHTML('beforeend', renderStep(stepsData[activeIndexStep],activeIndexStep + 1));

let answerBlock = null;
let btnNext = null;
let btnBack = null;
subscribe();

function handleBlockClick(e){

    const targetId = e.target.id;
    const node = targetId ? e.target : e.target.parentNode;

    stepsData[activeIndexStep].activeBlock = +node.id[1];
    const radio = findRadio(node);

    radio.classList.toggle('radio-active'); 
    addActiveBtnClass();
    goNext();
}

function addActiveBtnClass(){
    btnNext.classList.add('button_next-active');
}

function findRadio(node){
    return node.querySelector('.wrapper__container_quiz__template__answers_block__item-radio');
}

function goNext(){
    unSubscribe();
    activeIndexStep++;
    wrapperTemplate.innerHTML = renderStep(stepsData[activeIndexStep],activeIndexStep + 1);
    subscribe();
}

function goBack(){
    unSubscribe();
    activeIndexStep--;
    wrapperTemplate.innerHTML = renderStep(stepsData[activeIndexStep],activeIndexStep + 1);
    subscribe();
}

function subscribe(){
    answerBlock = document.querySelector('.wrapper__container_quiz__template__answers_block');
    btnNext = document.querySelector('.btn_forward');
    btnBack = document.querySelector('.btn_back');
    if(btnBack){
        btnBack.addEventListener('click', goBack);
    }
    btnNext.addEventListener('click', goNext);
    answerBlock.addEventListener('click', handleBlockClick);
}

function unSubscribe(){
    btnNext.removeEventListener('click', goNext);
    btnNext = null;
    if(btnBack){
        btnBack.addEventListener('click', goBack);
        btnBack = null;
    }
    answerBlock.removeEventListener('click', handleBlockClick);
    answerBlock = null;
}


