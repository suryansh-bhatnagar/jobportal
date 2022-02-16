import React, { useContext } from 'react';
import { TextField, MenuItem } from '@material-ui/core';
import { useField, useFormikContext } from 'formik';
import skillContext from '../../Context/skillContext'
const SelectWrapper = ({
  name,
  options,
  ...otherProps
}) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  
  const a = useContext(skillContext)
  const handleChange = evt => {
    const { value } = evt.target;
    setFieldValue(name, value);
    if(evt.target.name==='category'){
      // Setting values of skill dropdown based on chosen category
      if (evt.target.value === "category1") {
        a.setSkill({ "skill1":" C1 Skill 1",
        "skill2":" C1 Skill 2",
        "skill3":" C1 Skill 3"});
      } else if (evt.target.value  === "category2") {
        a.setSkill({ "skill1":" C2 Skill 1",
        "skill2":" C2 Skill 2",
        "skill3":" C2 Skill 3"});
      } else if (evt.target.value  === "category3") {
        a.setSkill({ "skill1":" C3 Skill 1",
        "skill2":" C3 Skill 2",
        "skill3":" C3 Skill 3"});
      }
    }
    
   
  };

  const configSelect = {
    ...field,
    ...otherProps,
    select: true,
    variant: 'outlined',
    fullWidth: true,
    onChange: handleChange,
    
  };

  if (meta && meta.touched && meta.error) {
    configSelect.error = true;
    configSelect.helperText = meta.error;
  }
  // what to show in skill  dropdown if user have not choose the category yet 
  if(options === null){
    return (
      <TextField {...configSelect}>
      <MenuItem key={'empty'} value={'empty'} disabled>
      Please select category first
    </MenuItem> </TextField>
    )
  }

  return (
    <TextField {...configSelect}>
      
      {Object.keys(options).map((item, pos) => {
        return (
          <MenuItem key={pos} value={item}>
            {options[item]}
          </MenuItem>
        )
      })}
    </TextField>
  );
};

export default SelectWrapper;
