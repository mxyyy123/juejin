const container = document.getElementById('m-listContainer');
const lis = document.querySelectorAll('#m-listContainer li');

// const dbData = Array.from(new Array(20)).map((item, idx) => idx);

function numAdd()
{
    var num=document.getElementById('adda');
    num.innerHTML++;
}

var icon1=document.getElementById('icon1');
var num1=document.getElementById('num1');
var f1=0;
icon1.onclick=function(){
    if(f1%2==0)
    {
        num1.innerHTML++;
        num1.style.color='#87CEFA';
       
    }
    else
    {
        num1.innerHTML--;
        num1.style.color='#000000';
    }
    f1++;
}

const renderPage = (firstIndex) => {
    lis.forEach((item, idx) => {
        const li = item;
        
    });
};

// const updateDb = (offset, limit = 10) => {
//     for (let i = 0; i < limit; i++) {
//         dbData.push(offset + i);
//     }
// };

renderPage(0);

const renderFunction = (firstIndex) => {
    renderPage(firstIndex);
};

const listScrollIns = new ListScroll({
    firstItemId: 'item-first',
    lastItemId: 'item-last',
    container,
    listSize: 21,
    itemHeight: 150,
    renderFunction
});

listScrollIns.startObserver();
