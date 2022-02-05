const request=require("request");

const forecast=(lat,long,callback)=>{
    const url=`http://api.weatherstack.com/current?access_key=688acda27e6d740c352d9e054d3500d5&query=${lat},${long}`;
    request({url,json:true},(error,response)=>{
        if(error){
            callback("Unable to connect to weather service",undefined);
        }
        else if(response.body.error){
            callback("Unable to find.",undefined);
        }
        else{
            const data=response.body.current;
            callback(undefined,data.weather_descriptions[0]+". It is currently "+ data.temperature+" degree.It feel likes "+data.feelslike+" degree.");
        }
    })
}

module.exports=forecast;