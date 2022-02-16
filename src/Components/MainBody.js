import React, { useContext , useState } from "react";
import { Formik, Form, FieldArray, Field } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Typography, Button ,TextField} from "@material-ui/core";
import Textfield from "./Textfield";
import SubmitButton from "./Button";
import Alertitem from "./Alertitem";
import Select from "./Select";
import DeleteIcon from '@mui/icons-material/Delete';
import categoryOptions from "./Data/category.json";
import skillContext from "../Context/skillContext";

// Creating custom styles
const useStyles = makeStyles((theme) => ({
  formWrapper: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(8),
  },
  typoColor: {
    color: "#3f51b5",
  },

}));

//Declaring initial values
var INITIAL_FORM_STATE = {
  title: "",
  location: [],
  minExp: "",
  maxExp: "",
  description: "",
  category: "",
  funcArea: "",
  minGradYear: "",
  maxGradYear: "",
  tags: [],
};
// Adding validation
const FORM_VALIDATION = Yup.object().shape({
  title: Yup.string().required("Required"),
  location: Yup.array(),
  description: Yup.string().required("Required"),
  minExp: Yup.string().required("Required"),
  maxExp: Yup.string().required("Required"),
  category: Yup.string().required("Required"),
  funcArea: Yup.string().required("Required"),
  minGradYear: Yup.number().required("Required"),
  maxGradYear: Yup.number().required("Required"),
  tags: Yup.array(),
});

const MainBody = () => {
  
  const [alert, setAlert] = useState(null);
  // Function to show alert and dismiss it automatically after 15sec
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  // Using skill context to set options in the skill dropdown menu based on selected category 
  const context = useContext(skillContext);
  const { skill } = context;
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={12}>
        <Container maxWidth="md">
          <div className={classes.formWrapper}>
            <Formik
              initialValues={{
                ...INITIAL_FORM_STATE,
              }}
              validationSchema={FORM_VALIDATION}
              onSubmit={async (values, { resetForm }) => {
                
                console.log(values);
                showAlert('Form submitted')
                resetForm({values:''});
                // Code to send request to the backend api 
                const url = `http://localhost:8001//v1jobs/jobs`;
                const response = await fetch(url, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    val: values,
                  }),
                });
                const json = await response.json();
                console.log(json);
              }}
            >
              {(formikProps) => (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography
                        className={classes.typoColor}
                        variant="h4"
                        component="div"
                        gutterBottom
                      >
                        Basic Details
                      </Typography>
                    </Grid>

                    <Grid item xs={12}>
                      <Textfield
                        name="title"
                        label="Job Title*"
                        helperText="Write a title that appropriately describe this job"
                      />
                    </Grid>

                  

                    <Grid item xs={6}>
                      <Select
                        name="minExp"
                        label="Select Minimum Experiance"
                        options={{ 0: "0", 1: "1", "2 or Above": "2 or Above" }}
                      />{" "}
                    </Grid>
                    <Grid item xs={6}>
                      <Select
                        name="maxExp"
                        label="Select Maximum Experiance"
                        options={{ 5: "5", 6: "6", "6 or Above": "6 or Above" }}
                      />{" "}
                    </Grid>
                    <Grid item xs={12}>
                      <Textfield
                        name="description"
                        label="Job Description*"
                        multiline={true}
                        rows={4}
                        helperText="Describe the role and responsibilities ,skill required for the job and help the candidates understand the role better"
                      />
                    </Grid>
                    <Grid container spacing={2} item xs={12}>
                      <FieldArray name="location">
                        {(fieldArrayProps) => (
                          <>
                            <Grid item xs={12}>
                              <div style={{ margin: "12px 0px" }}>
                                <Button
                                  type="button"
                                  color="primary"
                                  variant="contained"
                                  onClick={() => fieldArrayProps.push("")}
                                >
                                  Add location
                                </Button>
                              </div>
                            </Grid>
                            {/* Mapping through every item of location array */}
                            {formikProps.values.location.map((loca,index) => (
                              <Field name={`location.${index}`} key={index}>
                                {(fieldProps) => (
                                  <>
                                    <Grid item xs={4}>
                                      <TextField
                                        label="Add Location"
                                        variant="outlined"
                                        {...fieldProps.field}
                                      />
                                      <div style={{ margin: "5px 0px" }}>
                                        <Button
                                          type="button"
                                          size="large"
                                          color="secondary"
                                        
                                          endIcon={<DeleteIcon />}
                                          onClick={() =>
                                            fieldArrayProps.remove(index)
                                          }
                                        >
                                      
                                         
                                        </Button>
                                      
                                      </div>
                                    </Grid>
                                  </>
                                )}
                              </Field>
                            ))}
                          </>
                        )}
                      </FieldArray>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        className={classes.typoColor}
                        variant="h4"
                        component="div"
                        gutterBottom
                      >
                        Targeting
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Select
                        name="category"
                        label="Select Category"
                        options={categoryOptions}
                      />{" "}
                    </Grid>

                    <Grid item xs={6}>
                      <Select
                        name="funcArea"
                        label="Select Functional Area "
                        options={skill}
                      />{" "}
                    </Grid>

                    <Grid item xs={6}>
                      <Select
                        name="minGradYear"
                        label="Min Graduating Year "
                        options={{ 2023: "2023", 2022: "2022", 2021: "2021" }}
                      />{" "}
                    </Grid>
                    <Grid item xs={6}>
                      <Select
                        name="maxGradYear"
                        label="Max Graduating Year "
                        options={{ 2015: "2015", 2014: "2014", 2013: "2013" }}
                      />{" "}
                    </Grid>

                    <Grid container spacing={2} item xs={12}>
                      <FieldArray name="tags">
                        {(fieldArrayProps) => (
                          <>
                            <Grid item xs={12}>
                              <div style={{ margin: "12px 0px" }}>
                                <Button
                                  type="button"
                                  color="primary"
                                  variant="contained"
                                  onClick={() => fieldArrayProps.push("")}
                                >
                                  Add Tag
                                </Button>
                              </div>
                            </Grid>
                            {/* Mapping through every item of tags array  */}
                            {formikProps.values.tags.map((tag, index) => (
                              <Field name={`tags.${index}`} key={index}>
                                {(fieldProps) => (
                                  <>
                                    <Grid item xs={4}>
                                      <TextField
                                       variant="outlined"
                                      label="Add tag"
                                        {...fieldProps.field}
                                      />
                                      <div style={{ margin: "5px 0px" }}>
                                        <Button
                                          type="button"
                                          size="large"
                                          color="secondary"
                                          endIcon={<DeleteIcon />}
                                          onClick={() =>
                                            fieldArrayProps.remove(index)
                                          }
                                        >
                                        
                                        </Button>
                                      </div>
                                    </Grid>
                                  </>
                                )}
                              </Field>
                            ))}
                          </>
                        )}
                      </FieldArray>
                    </Grid>

                    <Grid item xs={12}>
                      <SubmitButton>Post Job</SubmitButton>
                    </Grid>
                    <Grid item xs={4}>
                    {/* Displaying the alert after submitting the form */}
                      <Alertitem alert={alert} />
                     
                    </Grid>
                    
                  </Grid>
                </Form>
              )}
            </Formik>
          </div>
        </Container>
      </Grid>
    </Grid>
  );
};

export default MainBody;
