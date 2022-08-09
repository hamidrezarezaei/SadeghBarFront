export const  FormatNumber=(x)=>{
    try{
return x.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") ;
    }catch{
        return "";
    }
}