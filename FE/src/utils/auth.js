// src/utils/auth.js
import { jwtDecode } from "jwt-decode";

export const saveToken = (token) => {
    console.log("Inside saveToken function");
    localStorage.setItem("token", token);
    console.log("Token saved:", token);
  };
  

export const getToken = () => {
    const token = localStorage.getItem("token");
    console.log("Token retrieved:", token); // Log the token when it is retrieved
    return token;
  };


  export const removeToken = () => {
    localStorage.removeItem("token");
      console.log("Token removed");
  };

  export const getUserFromToken = () => {
    const token = getToken();  // Get token from localStorage
    if (token) {
      console.log("Token to decode:", token);  // Log the token to check it's correct
      try {
        const decoded = jwtDecode(token);  // Decode the token using jwt-decode
        console.log("Decoded:", decoded); 
       /*  saveToken(token);  */ // Save the token back to localStorage
        return decoded;  // Return the decoded user data
      } catch (error) {
        console.error("Error decoding token:", error.message);  // Catch and log any decoding errors
        removeToken();  // Remove the token if decoding fails
      }
    } else {
      console.log("No token found, returning null.");
      return null;  // Return null if no token is found
    }
  };
  

export const isAuthenticated = () => !!getToken();
