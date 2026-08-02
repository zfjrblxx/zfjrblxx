/* ==========================================
   PIXEL EXPLORER
========================================== */

document.addEventListener(

"DOMContentLoaded",

()=>{

const folders=

document.querySelectorAll(

".folder"

);



folders.forEach(folder=>{

folder.addEventListener(

"toggle",

()=>{

if(!folder.open){

return;

}



folders.forEach(item=>{

if(item!==folder){

item.open=false;

}

});

});

});

});
