
/*fetch("http://puzzle.mead.io/puzzle").then((response)=>{
    //將返回來的資料類型轉為json,易於閱讀
    response.json().then((response)=>{
        console.log(response);
    })
})*/

/*fetch("http://localhost:3000/weather?address=taipei").then(response=>{
    response.json().then((response)=>{
        if(response.error){
            console.log(response.error)
        }
        else{
            console.log(response.location);
            console.log(response.foredata);
        }
    })
});*/

const form=document.querySelector('form');
const address=document.querySelector('.address');
const content=document.querySelector('.content');
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    content.innerHTML="Loading..."
    const location=address.value;
    fetch(`http://localhost:3000/weather?address=${location}`).then(response=>{
    response.json().then((response)=>{
        if(response.error){
           content.innerHTML=response.error;
        }
        else{
            content.innerHTML=response.location+'<br/>'+response.foredata;
        }
    })
});
})