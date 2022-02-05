const geocode=require('./utities/geocode');
const forecast=require('./utities/forecast');

//建立express伺服器

const  path=require('path');
const  express=require("express");

//hbs中的partial可以使模板重複使用
const hbs=require('hbs');

//  ..   為上一個資料夾
console.log(path.join(__filename,".."));

const publicRoute=path.join(__dirname,"../public");
const templateRoute=path.join(__dirname,"../template/views");
const partial=path.join(__dirname,"../template/partial");

hbs.registerPartials(partial);

//express為function,不接受參數
const app=express();

//定義template的目錄路徑,預設是views
app.set('views',templateRoute);

app.use(express.static(publicRoute));

//set設置template engine
//利用hbs創建動態模板
//在專案目錄下,預設使用views資料夾,所有hbs檔案放這
app.set('view engine','hbs');
app.get('/',(req,res)=>{
    //render渲染模板引擎,名稱符合就好
    //模板引擎優點:單個模板提供多個頁面使用
    //第一個參數為template名稱,第二個參數為物件,包含傳給template使用的value
    res.render("index",{
        title:"weather",
        name:'paul'
    });
})

/*
//request:讀取資料,接受請求
//response:發出資料,有各種方法送資料給服務器
app.get('/',(req,res)=>{

    //回應(http)請求,當有人訪問該網址時,以Hello回應
    //回應的類型可以是字串,html('<h1>Hello</h1>'),json(以物件方式(可以是array或object)傳送,express會偵測並轉換成json)

    res.send('<h1>Hello</h1>');
})
*/

app.get('/help',(req,res)=>{
    res.render('help',{
        title:"help",
        name:"helper"
    })
})
app.get('/about',(req,res)=>{
    res.render("about",{
        title:"about page",
        name:'about'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"You must provide address."
        })
    }
    geocode(req.query.address,(error,{lat,long,location}={})=>{

        if(error){
            return res.send({
                error
            })
        }
        
        forecast(lat,long, (error, foredata) => {
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                location,
                foredata
            })
        })
    });
    
})

app.get('/product',(req,res)=>{
    //req可以獲取query string
    //req.query是物件,包含所有query string的訊息
    //return強制將此function結束
    if(!req.query.search){
        return res.send({
            meassge:"You must provide search term."
        })
    }

    res.send({
        product:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        errorMes:"Help article is not found."
    })
});

app.get('*',(req,res)=>{
    res.render('404',{
        errorMes:"Page is not found."
    })
});

//開啟伺服器監聽
//第二個參數為回呼函數,運行伺服器時會執行
app.listen(3000,()=>{
    console.log("server is running 3000");
});