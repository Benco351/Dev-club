import axios from "axios";
const googleApiKey = "AIzaSyBykliIFB74OAAb3V8N0Py9REHLKqLDskM";
const serverUrl = `https://www.googleapis.com/books/v1/volumes/q=`;
const getDatagoogle = async (props) => {
  try {
    return await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${props}`
    );
  } catch {
    console.log("error getting");
  }
};
export { googleApiKey, serverUrl, getDatagoogle };
