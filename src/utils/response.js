
const successRes=(msg, body, data)=>{
    return{
        success:true,
        message:msg,
        body,
        data
    }
}

const failRes=(msg, body)=>{
    return{
        success:false,
        message:msg,
        error:body!==undefined?body.message:null
    }
}

module.exports={successRes, failRes}