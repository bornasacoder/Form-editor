import React, { useState } from 'react';
import { Divider,styled, Select, MenuItem, FormControlLabel, Checkbox, Button, Box } from '@mui/material';
import { Settings } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Input  = styled("input")(({theme})=>({
width:"100%",
height:"40px",
border:"none",
outline:"none",
fontSize:"24px",
"&::placeholder":{
    color:"#333",
}
}))

const FormEditor = ({formFields, setFormFields}) => {
  const [open, setOpen] = useState(false)
const navigate = useNavigate()


  const addField = () => {
    const newField = {
      name: `field${formFields.length + 1}`,
      label: `What is your Question ? `,
      type: 'text',
      required: true,
    };

    setFormFields([...formFields, newField]);
  };

  const handleFieldChange = (index, fieldKey, value) => {
    const updatedFields = [...formFields];
    updatedFields[index] = {
      ...updatedFields[index],
      [fieldKey]: value,
    };
    setFormFields(updatedFields);
  };

  const removeField = (index) => {
    const updatedFields = [...formFields];
    updatedFields.splice(index, 1);
    setFormFields(updatedFields);
  };

  return (
    <Box sx={{  display:"flex", flexDirection:"column",alignItems:"center", width:"100%",gap:"40px" }} >
      <h2>Form Editor</h2>
      {formFields.map((field, index) => (
        <Box key={field.name} sx={{ margin: '10px 0', display:"flex", gap:"10px", alignItems:"center", width:"50%",}}>
          <Input
            label="Label"
            placeholder='Enter your Question here?'
            value={field.label}
            onChange={(e) => handleFieldChange(index, 'label', e.target.value)}
          />
          
          <br />
          {/* <FormControlLabel
            control={
              <Select
                value={field.type}
                size='small'
                onChange={(e) => handleFieldChange(index, 'type', e.target.value)}
              >
                <MenuItem value="text" disabled>Select your field</MenuItem>
                <MenuItem value="text">Text</MenuItem>
                <MenuItem value="number">Number</MenuItem>
                <MenuItem value="date">Date</MenuItem>
                <MenuItem value="checkbox">Checkbox</MenuItem>
                {/* Add other field types here */}
              {/* </Select> */}
            {/* // } */}
           
          {/* // /> */} 
          <br />
          {/* <FormControlLabel
            control={
              <Checkbox
                checked={field.required}
                onChange={(e) => handleFieldChange(index, 'required', e.target.checked)}
              />
            }
            label="Required"
          /> */}
          <br />
           <Button onClick={()=>navigate(`/formsetting/${index}`)} ><Settings/></Button>
          <Button variant="outlined" sx={{ fontSize:"20px", height:"35px", width:"30px", }} color="error" onClick={() => removeField(index)}>
            X
          </Button>
          <Divider/>
        </Box>

      ))}
      <Button variant="contained" onClick={addField} sx={{width:"20%"}}>
        Add Question
      </Button>
    </Box>
  );
};

export default FormEditor;