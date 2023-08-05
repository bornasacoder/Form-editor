import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, InputLabel, MenuItem, Radio, Select, TextField, Typography, styled } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addForm, updateForm } from '../../mocks/editor'
import { useNavigate } from 'react-router-dom'
const Container = styled(Box)(({theme})=>({

width:"100%",
display:"flex",
background:"#fff",
justifyContent:"center",
flexDirection:"column",
alignItems:"center"


}))
const Input  = styled("input")(({theme})=>({
  width:"100%",
  height:"40px",
  border:"none",
  outline:"none",
  fontSize:"24px",
  "&::placeholder":{
      color:"#878787",
  }
  }))
  
const Wrapper = styled(Box)(({theme})=>({
  width:"60%",
  display:"flex", 
  flexDirection:"column",
  // border:"2px solid black"


}))
const FormSetting = () => {
  const user = useSelector((state)=> state.user.currentCustomer)
  // console.log(user)
  const editor = useSelector((state)=>state.editor.editor)
  // console.log(editor)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [title, setTitle] = useState()
  const [desc, setDesc] = useState()


const [value, setValue] = useState()
const [textValue, setTextValue] = useState()
  const handleFieldChange = (value) =>{
   setValue(value)
  //  console.log(value)
  }
  const handleFieldChanges = (value) =>{
    setTextValue(value)
    // console.log(value)
   }
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    question: '',
    options: '',
    correctOptions: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentQuestion((prevQuestion) => ({
      ...prevQuestion,
      [name]: value
    }));
  };

  const [question, setQuestion] = useState([]);
  const [currentQuestions, setCurrentQuestions] = useState({
    id: null,
    question: '',
    options: '',
    correctOption: ''
  });

  const handleInputChanges = (e) => {
    const { name, value } = e.target;
    setCurrentQuestions((prevQuestion) => ({
      ...prevQuestion,
      [name]: value
    }));
    // console.log(currentQuestions)
  };

  const handleCorrectOptionChanges = (e) => {
    const { value } = e.target;
    setCurrentQuestions((prevQuestion) => ({
      ...prevQuestion,
      correctOption: value
    }));
    // console.log(currentQuestions.options.split(","))
    
  };

  const addQuestions = async() => {
    const {  question, options } = currentQuestion;
    if (question !=="" || options.length> 0) {
      alert('Please fill in all fields.');
      return;
    }
    const optionser = currentQuestions.options.split(",")
    // console.log(optionser)

    let data = {
      userId:user?.id,
      title:title,
      desc:desc,
      fields: [
        {
          question: currentQuestions?.question,
          type:value,
          options: optionser
        }
      ]
    }

    const res = await addForm(dispatch, data)
// console.log(res)
if(res.data.status === "SUCCESS"){
  alert("Question Added Successfully")
  navigate("/")
}
    // console.log(currentQuestions)
  }



  



  const handleCorrectOptionChange = (e) => {
    const { value, checked } = e.target;
    
    setCurrentQuestion((prevQuestion) => {
      return {
        ...prevQuestion,
        correctOptions: [...prevQuestion.correctOptions, value]
        
      };
    })
    // console.log(currentQuestion)
  };

  const addQuestion = async() => {

    const optionser = currentQuestion.options.split(",")
    // console.log(optionser)

    let data = {
      userId:user?.id,
      title:title,
      desc:desc,
      fields: [
        {
          question: currentQuestion?.question,
          type:value,
          options: optionser
        }
      ]
    }
    const res = await addForm(dispatch, data)
// console.log(res)
if(res.data.status === "SUCCESS"){
  alert("Question Added Successfully")
  navigate("/")
}

  };






  const handleTitle = (value) =>{
setTitle(value)
  }
  const handleDesc = (value) =>{
setDesc(value)
  }
const addquestionss = async() =>{
  let data = {
    userId:user?.id,
    title:title,
    desc:desc,
    fields: [
      {
        question: textValue,
        type:value,
      }
    ]
  }
  const res = await addForm(dispatch, data)
// console.log(res)
if(res.data.status === "SUCCESS"){
alert("Question Added Successfully")
navigate("/")
}
}
const updateQuestions = async()=>{
  const {  question, options } = currentQuestions;
 
  // console.log(currentQuestions)
  const optionser = currentQuestions.options.split(",")
  // console.log(optionser)

  let EditorData = 
    {
      question: currentQuestions?.question,
      type:value,
      options: optionser
    }

  // console.log(EditorData)
  const res = await updateForm(dispatch,editor?._id , EditorData)
// console.log(res)
if(res.data.status === "SUCCESS"){
alert("Question Added Successfully")
navigate("/")
}
}

const updateQuestion = async()=>{
  const {  question, options } = currentQuestion;
  // if (question !=="" || options!== "") {
  //   alert('Please fill in all fields.');
  //   return;
  // }
  // console.log(currentQuestion)
  const optionser = currentQuestion.options.split(",")
  // console.log(optionser)

  let EditorData = 
    {
      question: currentQuestion?.question,
      type:value,
      options: optionser
    }

  // console.log(EditorData)
  const res = await updateForm(dispatch,editor?._id , EditorData)
// console.log(res)
if(res.data.status === "SUCCESS"){
alert("Question Added Successfully")
navigate("/")
}
}

const updateQuestionss = async() =>{
  let EditorData = {
        question: textValue,
        type:value,
  }
  const res = await updateForm(dispatch, editor?._id ,EditorData)
// console.log(res)
if(res.data.status === "SUCCESS"){
alert("Question Added Successfully")
navigate("/")
}
}


  return (
    <Container>
      <Typography variant='h2'>Form Editing</Typography>
      <Wrapper>
      <Box sx={{width:"100%",paddingBottom:"30px", display:"flex", alignItems:"center", flexDirection:"column"}} >
        {editor && editor?.fields?.length > 0 ? 
        <Box></Box> :
        <Box sx={{width:"100%",paddingBottom:"30px", display:"flex", alignItems:"center", flexDirection:"column"}} >
      <Typography variant='h5' sx={{width:"100%", marginTop:"50px",textAlign:"left", letterSpacing:"1.3px"}} >Add your form Title</Typography>
      <Input type ="text" name='title' placeholder='Enter title here...' value={title} onChange={(e)=>{handleTitle(e.target.value)}} />
      <Typography variant='h5' sx={{width:"100%", marginTop:"20px",textAlign:"left", letterSpacing:"1.3px"}} >Add your form Description</Typography>
      <Input type ="text" name='desc' placeholder='Enter description here...' value={desc} onChange={(e)=>{handleDesc(e.target.value)}} />
        </Box>
      }
        <Typography variant='h6' sx={{width:"100%", marginTop:"20px",textAlign:"left"}} >Select your Input Field</Typography>
   <FormControl  sx={{width:"100%", marginTop:"20px"}} >
   <InputLabel id="demo-simple-select-helper-label">Select your field</InputLabel>
              <Select
                // value={field.type}
                value={value}
                name='field'
                label="Select your field"
                sx={{width:"50%",}}
                onChange={(e) => handleFieldChange( e.target.value)}
              >
                <MenuItem value="">
            <em>None</em>
          </MenuItem>
                {/* <MenuItem value="text" disabled>Select your field</MenuItem> */}
                <MenuItem value="text">Text</MenuItem>
                <MenuItem value="radio">Single Correct</MenuItem>
                <MenuItem value="checkbox">Multiple Correct</MenuItem>
                 {/* Add other field types here  */}
              </Select>
            </FormControl>
            <Divider sx={{marginTop:"20px"}} />
      </Box>

{value ==="text" && 
<Box>

<Input
            label="Label"
            placeholder='Enter your Question here?'
            value={textValue}
            onChange={(e) => handleFieldChanges(e.target.value)}
            />
           {editor && editor?.fields?.length > 0 ?<Button variant="contained" color="primary" onClick={updateQuestionss}  >
       Update Question 
      </Button> : <Button variant="contained" color="primary" onClick={addquestionss}  >
       Add Question 
      </Button>}
            </Box>

}
   {value=== "radio" && 
<Box sx={{display:"flex",flexDirection:"column", width:"100%",}} >
      <Box sx={{display:"flex", width:"100%", }} >
        <Input
          label="Question"
          placeholder='Enter your Question here'
          name="question"
          sx={{border:"none", outline:"0px", width:"50%"}}
          value={currentQuestions.question}
          onChange={handleInputChanges}
          />
      </Box>
      <Box sx={{width:"100%", display:"flex", marginTop:"10px"}} >
        <Input
          label="Options (comma-separated)"
          placeholder='Enter your options here (separated with comma)'
          name="options"
          value={currentQuestions.options}
          onChange={handleInputChanges}
          />
      </Box>
      <Box sx={{width:"100%", display:"flex", marginTop:"10px", flexDirection:"column"}} >
        {currentQuestions.options.split(',').map((option, index) => (
          <FormControlLabel
          key={index}
          control={
              <Radio
                name="correctOption"
                value={option.trim()}
                checked={currentQuestions.correctOption === option.trim()}
                onChange={handleCorrectOptionChanges}
              />
            }
            label={option.trim()}
            />
            ))}
      </Box>
      <Box sx={{width:"100%", display:"flex", marginTop:"10px", gap:"10px"}} >

      {editor && editor?.fields?.length > 0 ?<Button variant="contained" color="primary" onClick={updateQuestions}  >
       Update Question 
      </Button> : <Button variant="contained" color="primary" onClick={addQuestions}  >
       Add Question 
      </Button>}
      <Button variant="contained" color="secondary" onClick={() => setCurrentQuestions({
        id: null,
        question: '',
        options: '',
        correctOption: ''
      })}>
        Clear
      </Button>
          </Box>
      <br />
      <br />
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            {/* {question.question} | Correct Option: {question.correctOption} */}
            {/* <IconButton onClick={() => editQuestion(question.id)}>
              <DeleteIcon />
            </IconButton> */}
          </li>
        ))}
      </ul>
</Box>
}
  
      {value === "checkbox" &&
      <Box  sx={{display:"flex",flexDirection:"column", width:"100%",}}  >

      <Box sx={{display:"flex", width:"100%", }} >
        <Input
          label="Question"
          name="question"
          placeholder='Enter your Question here'
        
          value={currentQuestion.question}
          onChange={handleInputChange}
        />
      </Box>
      <Box>
        <Input
          label="Options (comma-separated)"
          name="options"
          placeholder='Enter your options here (separated with comma)'
          value={currentQuestion.options}
          onChange={handleInputChange}
        />
      </Box>
      <Box sx={{width:"100%", display:"flex", marginTop:"10px", flexDirection:"column"}} >
        {currentQuestion.options.split(',').map((option, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                name="correctOptions"
                value={option.trim()}
                // checked={currentQuestion.correctOptions.includes(option.trim())}
                onChange={handleCorrectOptionChange}
              />
            }
            label={option.trim()}
            />
        ))}
      </Box>
      <Box sx={{width:"100%", display:"flex", marginTop:"10px", gap:"10px"}} >
      {editor && editor?.fields?.length > 0 ?<Button variant="contained" color="primary" onClick={updateQuestion}  >
       Update Question 
      </Button> : <Button variant="contained" color="primary" onClick={addQuestions}  >
       Add Question 
      </Button>}
      <Button variant="contained" color="primary"  onClick={() => setCurrentQuestion({
        id: null,
        question: '',
        options: '',
        correctOption: ''
      })}>
        clear
      </Button>
      </Box>
            </Box>
    }
      

      </Wrapper>
    </Container>
  )
}

export default FormSetting