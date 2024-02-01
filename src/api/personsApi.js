import axios from 'axios';

const personsApi = axios.create({
    baseURL: 'http://localhost:3000'
})

export const getpersons = async()=>{
  const response = await personsApi.get('/Persons')
  console.log(response)
  return response.data 
}

export const addpersons = (persons)=>{
    console.log(persons)
    personsApi.post('/Persons',persons)
}

export const deletepersons = (id) =>{
  
 try {
  console.log(id)
  personsApi.delete(`/Persons/${id}`)
 } catch (error) {
  console.log(error)
 }
  
}
export const updateperson = (person)=>{
 try {
  console.log(person)
   personsApi.put(`/Persons/${person.id}`,person)
 } catch (error) {
  console.error(error)
 }
}