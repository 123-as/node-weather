const request=require("request");

//兩個參數:第二個為回呼函數,用來訪問結果
const geocode=(address,callback)=>{
    const geocoding=`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoic2NzNTU2NDc4NzUiLCJhIjoiY2t0cGo0OW9zMG4yNTJwcnoyNm15cWtoNiJ9.WQS21F_tTxHZDfq0Is73yQ&limit=1`;
    request({url:geocoding,json:true},(error,{body})=>{
        console.log(body);
        if(error){
            //讓呼叫者自己決定如何處理錯誤
           callback("Unable to connect to GeoCoding Service",undefined);
        }
        else if(body.message||body.features.length===0){
            callback("Not found GeoCoding.",undefined);
        }
        else{
            const lat=body.features[0].geometry.coordinates[1];
            const long=body.features[0].geometry.coordinates[0];
            const location=body.features[0].place_name;
            callback(undefined,{lat,long,location});
        }
    })
}
module.exports=geocode;