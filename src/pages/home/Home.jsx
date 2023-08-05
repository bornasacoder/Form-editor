import { Box, Button, Checkbox, Divider, FormControlLabel, Radio, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getUser } from '../../mocks/auth'
import { useNavigate } from 'react-router-dom'
import { DeleteForm } from '../../mocks/editor'
import { logOut } from '../../redux/userRedux'
const Home = () => {
    const user = useSelector((state) => state?.user)
    const editor = useSelector((state) => state?.editor?.editor)
    // console.log(editor)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        getUser(dispatch)
        
    }, [dispatch])

    const handleClick = () => {
        navigate("/formsetting")
    }
    const handleDelete = async(id)=>{
        console.log(id)
    const res = await DeleteForm(dispatch, id)
    console.log(res)
    if(res){
        alert("Deleted Successfully")
    }else{
        alert("try again")
    }

    }
    const handleLogout = async()=>{
    localStorage.removeItem("auth-token")
    await logOut(dispatch)
    navigate("/login")
    getUser(dispatch)
    window.location.reload()

    
    }

    return (
        <Box sx={{position:"relative"}} >
            <Box sx={{position:"absolute", top:"10px", right:"10px",}} >
                {user && user?.currentCustomer===null ?

                    <Button onClick={()=>navigate("/login")} >Login</Button> :
<Button onClick={handleLogout} variant='contained' color='error' >Logout</Button>
                }
            </Box>
            {editor && editor?.fields?.length > 0 ?
                <Box sx={{ display: "flex",  alignItems: "center", width: "100%", height: "100vh", flexDirection: "column", gap: "15px", marginTop:"50px" }}>
                    <Typography variant="h4" >Hi <span style={{ color: "blue" }}>{user?.currentCustomer?.name} </span> , Welcome to Form Editor</Typography>
                    <Box sx={{ display: "flex", justifyContent: "flex-start", width: "50%", flexDirection: "column", alignItems: "center", gap:"10px",marginTop:"50px" }} >
                        <Typography variant='h4'  >{editor?.title}</Typography>
                        <Typography variant='body' >{editor?.desc}</Typography>
                        <Divider/>
                        {editor && editor?.fields.map((item, index) => (
                            <Box sx={{display:"flex", width:"100%", justifyContent:"flex-start", marginTop:"30px"}} >
                                {item.type === "text" &&
                                    <Box sx={{display:"flex",flexDirection:"column", alignItems:"flex-start", width:"100%"}} >
                                        <Typography variant='h6' >{item.question}</Typography>
                                        <TextField type='text' placeholder={`${item.label ? item.label : "Enter your name" }`} sx={{width:"100%", marginTop:"10px"}} > </TextField>
                                        <Box sx={{display:"flex", justifyContent:"flex-end",gap:"10px", width:"100%", marginTop:"20px"}} >
                                        <Button variant='outlined' onClick={()=>navigate("/formsetting")} >Add More Questions</Button>
                                        <Button variant='outlined' color='error' onClick={()=> handleDelete(item.index)}  >Delete </Button>
                                        </Box>
                                    </Box>}
                                {item.type === "radio" &&
                                    <Box sx={{display:"flex", width:"100%", justifyContent:"flex-start",alignItems:"flex-start", marginTop:"30px", flexDirection:"column"}} >
                                        <Typography variant='h5' >{item.question}</Typography>
                                        {item.options.map((element,index)=>(
                                            <FormControlLabel
                                            key={index}
                                            control={
                                                <Radio
                                                name="correctOption"
                                                value={element.trim()}
                                                />
                                            }
                                            label={element.trim()}
                                            />
                                            ))}
            <Box sx={{display:"flex", justifyContent:"flex-end",gap:"10px", width:"100%", marginTop:"20px"}} >
                                        <Button variant='outlined' onClick={()=>navigate("/formsetting")} >Add More Questions</Button>
                                        <Button variant='outlined' color='error' onClick={()=> handleDelete(item.index)}  >Delete </Button>
                                        </Box>
                                    </Box>}
                                    {item.type === "checkbox" &&
                                    <Box sx={{display:"flex", width:"100%", justifyContent:"flex-start",alignItems:"flex-start", marginTop:"30px", flexDirection:"column"}} >
                                        <Typography variant='h5' >{item.question}</Typography>
                                        {item.options.map((element,index)=>(
                                            <FormControlLabel
                                            key={index}
                                            control={
                                                <Checkbox
                                                name="correctOption"
                                                value={element.trim()}
                                                />
                                            }
                                            label={element.trim()}
                                            />
                                            ))}
                                                <Box sx={{display:"flex", justifyContent:"flex-end",gap:"10px", width:"100%", marginTop:"20px"}} >
                                        <Button variant='outlined' onClick={()=>navigate("/formsetting")} >Add More Questions</Button>
                                        <Button variant='outlined' color='error' onClick={()=> handleDelete(item.index)} >Delete </Button>
                                        </Box>
                                    </Box>}
                                
                            </Box>
                        ))}
                    </Box>

                </Box>
                :
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100vh", flexDirection: "column", gap: "15px" }}>
                    <Typography variant="h2" >Hi <span style={{ color: "blue" }}>{user?.currentCustomer?.name} </span> , Welcome to Form Editor</Typography>
                    <Typography variant="h5" >Click below button to create your form</Typography>
                    <Typography onClick={handleClick} sx={{ color: "blue", cursor: "pointer", fontWeight: "700", fontSize: "20px" }} >Try Free here</Typography>
                </Box>
            }
        </Box>
    )
}

export default Home