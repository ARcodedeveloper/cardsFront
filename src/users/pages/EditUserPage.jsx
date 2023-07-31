import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router';
import UserForm from '../components/UserForm';
import { Container } from '@mui/material';
import normalizeUser from '../helpers/normalization/normalizeUser';
import initialSignupForm from '../helpers/initialForms/initialSignupForm';
import initialSignupSchema from '../models/joi-schema/signupSchema';
import ROUTES from '../../routes/routesModel';
import { useUser } from '../providers/UserProvider';
import mapUserToModel from '../helpers/normalization/mapToUserModel';
import useUsers from '../hooks/useUsers';
import useForm from '../../forms/hooks/useForm';


export default function EditUserPage() {
 
  const { id } = useParams();
  const {
    handleUpdateUser,
   handleGetUser
  } = useUsers();
  
  const { user } = useUser();

  //console.log(user);

  const { onSubmit,
    handleChange,
    handleReset,
    validateForm,
    setData, value: { errors,data } } = useForm(initialSignupForm, initialSignupSchema, (data) => {
     
        handleUpdateUser(data.id, {
          ...normalizeUser(data ),
        });
      }
    );


  useEffect(() => {
    if(user){
      handleGetUser(user.id).then((data) => {
        //console.log(data); 
        const modelUser = mapUserToModel(data);
        for (const key in modelUser) {
          setData(prev=>({...prev, [key]: modelUser[key]}));
        }
      });
    }
    
  }, [handleGetUser, user, setData]);
  if (!user) return <Navigate replace to={ROUTES.CARDS} />;

  return (
    <Container 
      sx={{
        paddingTop: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <UserForm
       
        onSubmit={onSubmit}
  onReset={handleReset}
  onFormChange={validateForm}
  title="edit user"
  errors={errors}
  data  ={data}
  onInputChange={handleChange}
  setData={setData}
      />
    </Container>
  );
}


