import client from './client'
import AsyncStorage from '@react-native-async-storage/async-storage';

const tt  = async(id,id_member,inputs)=>{
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
    //   if (res.data.success){
    //     console.log("tim kiem thong tin")
    //   }  
      //return res.json;
    } catch (error) {
      console.log(error.message);
    }
    return res.data;
  }
export {
   tt
}