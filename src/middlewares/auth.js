const authAdmin=(req,res,next)=>{
    console.log('admin auth checking')
    const token='xyzjgk'
    if(token==='xyz'){
        next()
    }
    else{
        res.status(401).send('unathorized')
    }
}

const authUser= (req,res,next)=>{
    console.log('user auth checking')

    const token='xyzhjh'
    if(token==='xyz'){
        next()
    }
    else{
        res.status(401).send('unathorized')
    }
}
module.exports={
    authAdmin,authUser
}