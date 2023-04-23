export function getHeader(step, title){
    return `
    <div class="wrapper__container_quiz__template__header">
        <h2 class="wrapper__container_quiz__template__header__question">${title}</h2>
        <p class="wrapper__container_quiz__template__header__count">Шаг ${step}/9</p>
    </div>`;
}
export function getAnswerBlock(answer, id, isActiveBlock){
    return `
    <div class="wrapper__container_quiz__template__answers_block__item" id="${id}">
    <p class="wrapper__container_quiz__template__answers_block__item-text">${answer}</p>
    <div class="wrapper__container_quiz__template__answers_block__item-radio ${isActiveBlock ? 'radio-active' : ""}"></div>
</div>`;
}

export function renderStep(step, activeStep){
    const {title, blocks, activeBlock} = step;
    const header = getHeader(activeStep, title);
    const block = getAllBlocks(blocks, activeBlock);
    const btnForward = renderForwardBtn();
    const btnBack = activeStep===1 ? "" : renderBackBtn();
    const footer = renderFooter(btnBack + btnForward, btnBack);
    return header + block + footer;
}

export function renderForwardBtn(){
    return `
    <button class="wrapper__container_quiz__template__footer__btn btn_forward">Далее</button>
`;
}



export function renderFooter(children, hasBackBtn){
    return `<div class="wrapper__container_quiz__template__footer ${hasBackBtn ? 'space-between' : ""}">
    ${children}</div>`;
}

export function renderBackBtn(){
    return `<button class="wrapper__contaier_quiz__template__footer__btn btn_back">Назад</button>`;
}

export function getAllBlocks(blocks, activeBlock){
    let childrens = "";
    function getWrapper(children){ return `<div class="wrapper__container_quiz__template__answers_block">${children}</div>`; }
    blocks.forEach((item, index) => {
        childrens+=getAnswerBlock(item, generateBlockId(index), activeBlock===index)
    })
    return getWrapper(childrens)
}

export function generateBlockId(index){
    return `r${index}`;
}

