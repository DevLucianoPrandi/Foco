import axios from "axios";

const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;
const storageUrl = import.meta.env.VITE_APP_PUBLIC_STORAGE || "";

export function urlArchivo(ruta) {
  return `${storageUrl.replace(/\/+$/, "")}/${String(ruta).replace(/^\/+/, "")}`;
}

export function usarImagenPorDefecto(event) {
  const porDefecto = urlArchivo("imagen/default.jpg");
  if (event.currentTarget.src !== porDefecto) {
    event.currentTarget.src = porDefecto;
  }
}

export async function getProyectos() {
  return axios.get(`${baseUrl}/proyectos/`);
}

export async function getProyectoUnico(_id) {
  return axios.get(`${baseUrl}/proyectos/${_id}`);
}

export async function saveProyectos(datosProyecto) {
  return axios.post(`${baseUrl}/proyectos/`, datosProyecto, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
