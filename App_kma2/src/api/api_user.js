import client from './client'
import AsyncStorage from '@react-native-async-storage/async-storage';
const loginUser = async(inputs) => {
   try {
        
       const res = await client.post('/laihieu/user/sign_in',{...inputs}) 
       
       if(res.data.success){
         const token = res.data.token
         await AsyncStorage.setItem('token', token)
       }
      

      //  console.log(res.data);SSSSSS
        return await res.data     
    } catch (error) {
        console.log(error.message);    
    }
}

const loginUser2  = async(token)=>{
  const config = {
    headers: {
      Authorization: `jwt ${token}`
    },
   };
   try {
    const res = await client.post(`/laihieu/user/sign_in2/${token}`
    ,
    token
    ,
    config
    );
    if (res.data.success){
      console.log("dang nhap thanh cong 2222")
    }  
    return await res.data 
   // console.log(data3)
  } catch (error) {
    console.log("bi loi roi");
  }
}

const logoutUser = async() =>{
  try {
    const token = await AsyncStorage.getItem('token');
    if(token !== null) {
      const res = await client.get('/laihieu/user/sign_out',
      
      {
        headers:{
          Authorization: `jwt ${token}`
        }
      })

      if(res.data.success){
        await AsyncStorage.removeItem('token')
        return true;
      }
    }
    return false;
  } catch (error) {
    console.log(error.message);
    return false
  }
}

const registerUser = async(inputs)=>{
    try {
        const res = await client.post('/laihieu/user/add_user',{...inputs})
        return await res.data
    } catch (error) {
        console.log(error.message)
    }
}


const updateMember  = async(id,id_member,inputs)=>{
    const config = {
      headers: {
        Authorization: `jwt ${id}`
      },
     };
     try {
      const res = await client.put(`/laihieu/user/update/${id_member}`
      ,
      { email: inputs.email,
        name: inputs.name,
        phone: inputs.phone,
        password: inputs.password,
        avg: inputs.avg
      },
      config
      );
      if (res.data.success){
        console.log("update toan bo thong tin thanh cong")
      }  
      //return res.json;
    } catch (error) {
      console.log(error.message);
    }
    return true;
  }

  const searchUser  = async(id,nameuser)=>{
    const config = {
      headers: {
        Authorization: `jwt ${id}`
      },
     };
     try {
      const res = await client.get(`/laihieu/user/searchuser?search=${nameuser}`
      ,
      config
      );
      return await res.data
    } catch (error) {
      console.log(error.message);
    } 
  }
export {
    loginUser,
    registerUser,
    updateMember,
    loginUser2,
    logoutUser,
    searchUser,
}