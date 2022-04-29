const express=require('express')
const app=express();
app.use(express.json())
const fs=require("fs")
const bodyParser = require('body-parser');
const PORT=7000
const axios=require("axios");
var data = require("./data.json")
// console.log(data)
// meraki_data=axios.get("https://api.merakilearn.org/courses")
// .then(api=>{
//     meraki_data=api.data
//     file=JSON.stringify(meraki_data,null,3)
//     a=fs.writeFileSync("data.json",file)#
// });
app.get('/get',(req,res)=>{
    res.send(data)
})

app.post('/post',(req,res)=>{
    const user={
        id:data.length+1,
        name:req.body.name,
        logo:req.body.logo,
        notes:req.body.notes,
        days_to_complete:req.body.days_to_complete,
        short_description:req.body.short_description,
        type:req.body.type,
        course_type:req.course_type,
        lang_available:req.body.lang_available,
    }
    
    
    data.push(user)
        a=fs.writeFileSync("data.json",JSON.stringify(data,null,4))
    res.send({message:"data post successfuly",data:user})
})




app.put('/post/:id',(req,res)=>{
    let id=req.params.id
    let name=req.body.name
    let logo=req.body.logo
    let notes=req.body.notes
    let days_to_complete=req.body.days_to_complete
    let short_description=req.body.short_description
    let type=req.body.type
    let course_type=req.body.course_type
    let lang_available=req.body.lang_available

    let index=data.findIndex((dataa)=>{
        return (dataa.id==Number.parseInt(id))
    })

    // console.log(id,req.body,index)

    if (index>=0){
        let std=data[index]
        std.name=name,
        std.logo=logo,
        std.notes=notes,
        std.days_to_complete=days_to_complete,
        std.short_description=short_description,
        std.type=type,
        std.course_type=course_type,
        std.lang_available=lang_available,
        res.send(std)

        a=fs.writeFileSync("data.json",JSON.stringify(data,null,4))
        res.json({message:"data update successfuly",data:user})
    }else{
       res.status(404)
    }
})


app.delete('/post/:id',(req,res)=>{
    let id=req.params.id;
    let index=data.findIndex((student)=>{
        return (student.id==Number.parseInt(id))
    });

    if (index>=0){
        let index1=data[index]
        data.splice(index,1)
        // res.send(std)
        a=fs.writeFileSync("data.json",JSON.stringify(data,null,4))
        res.send({message:"data delete successfuly",data:index1})
    }
    else{
        res.status(404)
    }
})
app.listen(PORT,()=>{
    console.log(`server running on port:http://localhost${PORT}`)
})
