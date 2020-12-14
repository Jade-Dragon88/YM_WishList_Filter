"use strict";

let prodactsForDel, // товары под удаление
    splitInnerText, // массив со словами внутр. текста
    monitorProductArray, // массив с товарами Мониторами
    numVerificationChildren, // количество проверенных детей
    numVerificationWord, // количество проверенных слов
    myProdSelector, // селектор, по которому выбираем товары
    allProdacts, // массив из всех товаров
    wordToSearch, // это слово должно быть в искомом товаре
    favorites, filter, arrows, vertTitle, horTitle, 
    filterSubmit, filterText, filterReset;


// блок для добавления формы поиска и определния её стилей
        ([...(document.querySelector('body')).querySelectorAll('*')]).forEach((item)=>{
            if(((item.nodeName)==='H1') && ((item.innerText) === 'Избранное')){favorites = item;}
        });
        // console.log(favorites)
        // favorites.style.display = 'inline-block'
        // favorites.style.width = '50%'

        favorites.insertAdjacentHTML("afterend", '<div class="filter">' +
            '<div class="arrows">' +
                '<span class="vert_title">фильтр</span>' +
            '</div>' +
            // '<div class="vert_title">фильтр</div>' +
            // '<div class="hor_title">фильтр</div>' +
            '<form>' +
                '<div>' +
                    '<input type="text">' +
                '</div>' +
                // '<input type="submit" value="ПРИМЕНИТЬ" onclick="event.stopImmediatePropagation()">' +
                '<input type="button" submit value="ПРИМЕНИТЬ">' +
                '<input type="button" reset value="ОТМЕНИТЬ">' +
            '</form>' +
            '</div>');



setTimeout(setStyles,100);
function setStyles() {
    filter = document.querySelector('.filter');
    arrows = document.querySelector('.arrows');
    vertTitle = document.querySelector('.vert_title');
    horTitle = document.querySelector('.hor_title');
    filterText = filter.querySelector('input[type="text"]');
    filterSubmit = filter.querySelector('input[submit]');
    filterReset = filter.querySelector('input[reset]');


    filter.style.display = 'flex';
    filter.style.flexDirection = 'column';
    filter.style.flexWrap = 'wrap';
    filter.style.position = 'fixed';
    filter.style.top = '30%';
    // filter.style.left = '0'
    // filter.style.right = '0'

    filter.style.zIndex = '1000000';
    filter.style.fontFamilyamily = `"YS Text", Arial, Helvetica, sans-serif`;
    filter.style.color = '#202020';
    filter.style.fontSize = '13px';
    filter.style.background = '#e8e8e8';
    filter.style.alignContent = 'flex-start';
    // filter.style.border = '10px solid #e8e8e8'
    // filter.style.borderLeft = '20px solid #e8e8e8'
    // filter.style.borderTopLeftRadius = filter.style.borderBottomLeftRadius = '15px'
    filter.style.justifyContent = 'space-evenly';

    filter.style.width = '350px';
    // filter.children[1].style.marginRight = filter.children[1].style.marginLeft = '1rem'
    filterSubmit.style.cursor = filterReset.style.cursor = 'pointer';
    filter.style.borderTopLeftRadius = filter.style.borderBottomLeftRadius = '16px';


    arrows.style.flexBasis = '100%';
    arrows.style.background = '#ffd426';
    arrows.style.borderTopLeftRadius = arrows.style.borderBottomLeftRadius = '15px';
    arrows.style.width = '20px';
    arrows.style.cursor = 'pointer';

    // arrows.style.flexBasis = '100%'
    // arrows.style.border = '1px solid red'
    //


    // vertTitle.style.border = '1px solid green'
    // vertTitle.style.flexBasis = '100%'
    // vertTitle.style.writingMode = 'vertical-rl'
    //
    // vertTitle.style.width = '20px'
    // vertTitle.style.flexGrow = '1'
    // horTitle.style.flexGrow = '1'
    // filterText.style.flexGrow = '1'
    // filterSubmit.style.flexGrow = '1'


// arrows.style.alignSelf = 'stretch'
//
//
// vertTitle.style.alignSelf = 'stretch'
//
//
// horTitle.style.flexBasis = 'calc(100% - 40px)'
// filterText.style.flexBasis = 'calc(100% - 40px)'
// horTitle.style.alignSelf = 'flex-start'
// horTitle.style.border = '1px solid blue'

    vertTitle.style.writingMode = 'vertical-rl';
    vertTitle.style.textOrientation = 'upright';
    vertTitle.style.flexBasis = '100%';
    vertTitle.style.textTransform = 'lowercase';
    vertTitle.style.color = '#202020';
    vertTitle.style.margin = '10px 0';
    vertTitle.style.letterSpacing = '-2px';
    vertTitle.style.width = '20px';
    vertTitle.style.cursor = 'pointer';


// horTitle.style.width = 'calc(100% - 40px)'
// horTitle.style.textTransform = 'uppercase'


//
//
//     // vertTitle.style.letterSpacing = '0px'
    vertTitle.style.textTransform = 'uppercase';
//     // arrows.style.width = '20px'
//     // vertTitle.style.width = '20px'
//     // horTitle.style.width = 'calc(100% - 40px)'
// }
    filter.style.height = arrows.clientHeight + 'px';
    // filter.style.right = -(filter.clientWidth - arrows.clientWidth)+'px'
    filter.style.right = '0px';
} // конец функции setStyles







setTimeout(AAA,200);

function AAA() {
// console.dir(filterSubmit)


    filterSubmit.addEventListener('click', toFiltering); // слушатель на кнопку фильтр-ции для запуска фильтрации
    filterText.addEventListener('keydown', catchingEnter); // слушатель на текст. поле для запуска фильтрации

    function catchingEnter(e){
        if (e.keyCode === 13){
            toFiltering(e);
        }
    }

    function toFiltering(e) {

        e.preventDefault();
        wordToSearch = filterText.value;
        // wordToSearch = 'монитор'
        // wordToSearch = prompt('Введите слово для поиска')
        // wordToSearch = 'Клавиатура'
        wordToSearch = wordToSearch.toLowerCase();
        // console.log(`введёное слово ${wordToSearch}`)
        prodactsForDel = [];
        splitInnerText = [];
        monitorProductArray = [];
        numVerificationChildren = 0;
        numVerificationWord = 0;
        myProdSelector = null;
        allProdacts = [];


        myProdSelector = '_1_IxNTwqll cia-vs cia-cs'; // создаем селектор
        allProdacts = [...document.getElementsByClassName(myProdSelector)]; // выбираем все элементы myProdSelector и формируем из них массив
        allProdacts.forEach((itemAllProdacts) => { // у каждого элемента в массиве товаров (конкретый товар)
            var childrenAllProdacts = [...itemAllProdacts.querySelectorAll('*')]; // формируем массив из детей
            //let numChildrenSpreadedAllProdacts = childrenSpreadedAllProdacts.length; // высчитываем их количество
            //let counter // объявляем счетчик для дальнейших задач
            // let splitInnerText, numVerificationWord
            // let numVerificationChildren = 0
            childrenAllProdacts.forEach((item) => {  // и для каждого ребёнка
                numVerificationWord = 0;
                // item.innerText && console.log(item.innerText) // выводим в консоль внутр. текст ребёнка
                item.innerText && (splitInnerText = item.innerText.split(' ')); // проверяем, есть ли внутренний текст, и в положит. случае разделяем его на слова (делитель пробел)
                // console.log(`Ребёнок :`); console.log(item)
                // console.log(`Его текст в массиве : ${splitInnerText}`)
                // console.log(`Длина массива из слов = ${splitInnerText.length}`)
                //console.log(splitInnerText) // ${splitInnerText.length}`) // выдаст массив из слов

                for (let word of splitInnerText) { // для каждого слова из внутр. текста проверяем
                    // console.log(`слово товара ${(word.toLowerCase())}`)
                    if ((word.toLowerCase()) === wordToSearch) { // если это слово равно поиск.запросу,
                        monitorProductArray.push(itemAllProdacts); // то помещаем это слово в массив monitorProductArray
                        break; // завершаем цикл для этого ребёнка и переходим к коду после цикла
                    } else {
                        numVerificationWord++;
                        // console.log(word)
                        continue;
                    }
                }
                if (numVerificationWord === splitInnerText.length) { // если счетчик проверенных слов равен количеству слов во внутр. тексте,
                    numVerificationChildren++; // то текст не содержит слово Монитор и кол-во проверенных детей ++
                    // console.log(`ребёнок, в котором нет слова Монитор`); console.log(item);
                }
            });
            if (numVerificationChildren === childrenAllProdacts.length) { // если кол-во проверенных детей равно их общему кол-ву в конкретном товаре,
                prodactsForDel.push(itemAllProdacts);// то товар не содержит слово "Монитор", добавляем этот товар в массив prodactsForDel
            }
        });

        // алгоритм выделения уникальных элементов в массиве
        function unique(arr) {
            let result = [];
            for (let str of arr) {
                if (!result.includes(str)) {
                    result.push(str);
                }
            }
            return result;
        }

        monitorProductArray = unique(monitorProductArray); // фильтруем Search_Word_Array, оставляя уникальные элементы


        // алгоритм формирования массива ненужных товаров
        // из массива со всеми товарами удаляем массив с нужными товарами
        allProdacts.forEach(itemAllProdacts => {
            let n = 0;
            for (let i = 0; i < monitorProductArray.length; i++) {
                // console.log(`allProdacts = ${itemAllProdacts} ; monitorProductArray = ${monitorProductArray[i]}`)
                if (monitorProductArray[i] === itemAllProdacts) {
                    // console.log(`!!! break !!!`)
                    break;
                } else {
                    n++; /*console.log(`n = ${n}`)*/
                }
            }
            if (n === monitorProductArray.length) {
                prodactsForDel.push(itemAllProdacts);
            }
        });
        //console.log(`prodactsForDel = ${prodactsForDel}`)

        prodactsForDel.forEach((itemProdactsForDel) => {
            itemProdactsForDel.remove();
        }); // удаляем со странички каждый товар, входящий в массив prodactsForDel

    } // конец function toFiltering
} // конец function AAA













