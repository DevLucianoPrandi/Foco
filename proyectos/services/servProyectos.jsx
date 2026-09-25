import axios from "axios";

const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

export async function getProyectos(formData) {
 try {
    const response = await axios({
      url: `${baseUrl}/proyectos/`,
      method: "GET",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
 } catch (e) {
    console.error(e);
    throw e;
 }
}

export async function getProyectoUnico(_id) {
  try {
     const response = await axios({
       url: `${baseUrl}/proyectos/${_id}`,
       method: "GET",
       data: _id,
       headers: {
         "Content-Type": "multipart/form-data",
       },
     });
     return response;
  } catch (e) {
     console.log(e);
  }
 }

export async function saveProyectos(datosProyecto) {
 try {
    const response = await axios({
      method: "POST",
      url: `${baseUrl}/proyectos/`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: datosProyecto,
    });
    return response;
 } catch (e) {
    console.error(e);
    throw e;
 }
}