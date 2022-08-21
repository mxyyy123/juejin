//存放一级到三级的标题元素
let title = [];
//存放标题元素的位置
let title_position = [];

//从文章部分中获取标题元素，并显示到目录栏中
function mount() {
  const article = document.getElementsByTagName("article")[0];
  const search_nodes = article.childNodes;
  const content = document.getElementById("content-real");
  let h1_cnt = 1;
  let h2_cnt = 1;
  let h3_cnt = 1;
  for (let i in search_nodes) {
    if (search_nodes[i].nodeName === "H1") {
      let tmp_id = h1_cnt + "";
      search_nodes[i].setAttribute("id", tmp_id);

      let tmp_a = document.createElement("a");
      tmp_a.setAttribute("class", "h1");
      tmp_a.setAttribute("href", "#" + tmp_id); //some errors
      tmp_a.innerHTML = search_nodes[i].innerHTML;
      h1_cnt += 1;

      content.appendChild(tmp_a);
      title.push(tmp_a);
    } else if (search_nodes[i].nodeName === "H2") {
      let tmp_id = h2_cnt + "";
      search_nodes[i].setAttribute("id", tmp_id);

      let tmp_a = document.createElement("a");
      tmp_a.setAttribute("class", "h2");
      tmp_a.setAttribute("href", "#" + tmp_id); 
      tmp_a.innerHTML = search_nodes[i].innerHTML;
      h2_cnt += 1;

      content.appendChild(tmp_a);
      title.push(tmp_a);
    } else if (search_nodes[i].nodeName === "H3") {
      let tmp_id = h3_cnt + "";
      search_nodes[i].setAttribute("id", tmp_id);

      let tmp_a = document.createElement("a");
      tmp_a.setAttribute("class", "h3");
      tmp_a.setAttribute("href", "#" + tmp_id); 
      tmp_a.innerHTML = search_nodes[i].innerHTML;
      h3_cnt += 1;

      content.appendChild(tmp_a);
      title.push(tmp_a);
    }
  }
}

//获取当前标题元素的位置
function getTitlePosition() {
  const search_nodes = document.getElementsByTagName("article")[0].childNodes;
  for (let i in search_nodes) {
    if (search_nodes[i].nodeName === "H1") {
        title_position.push(search_nodes[i].getBoundingClientRect().top);
    } else if (search_nodes[i].nodeName === "H2") {
        title_position.push(search_nodes[i].getBoundingClientRect().top);
    } else if (search_nodes[i].nodeName === "H3") {
        title_position.push(search_nodes[i].getBoundingClientRect().top);
    }
  }
}

//标题元素颜色初始化
function initialColor(){
    for(let i of title){
        i.style.color = "black";
    }
}

//当前阅读部分的标题高亮
function focusTitle(){
    let scrollLength = document.documentElement.scrollTop || document.body.scrollTop;
    getTitlePosition();
    for(let i in title_position){
        if(scrollLength+(window.innerHeight*0.6)<title_position[i]){
            initialColor();
            title[i].style.color = "blue";
            break;
        }
    }
}

//页面加载时便开始对文章内容进行获取标题元素的操作
window.addEventListener("load",()=>{
    mount();
    focusTitle();
});

//对滚动事件进行监听，达到当前阅读部分标题高亮的效果
window.addEventListener("scroll", focusTitle);


