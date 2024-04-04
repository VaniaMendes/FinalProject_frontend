
export async function logout(token) {
  try {
    const response = await fetch(
      "http://localhost:8080/project_backend/rest/users/logout",
      {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          token: token,
        },
      }
    );

    if (response.ok) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

export async function deleteUserForever(tokenUser, username) {
  try {
    const response = await fetch(
      "http://localhost:8080/project_backend/rest/users/removeUser",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          token: tokenUser,
          username: username,
        },
      }
    );

    if (response.ok) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    return false;
  }
}

export async function deleteUser(tokenUser, username) {
  try {
    const response = await fetch(
      "http://localhost:8080/project_backend/rest/users/deleteUser",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          token: tokenUser,
          username: username,
        },
      }
    );

    if (response.ok) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    return false;
  }
}

export async function restoreUser(tokenUser, username) {
  try {
    const response = await fetch(
      `http://localhost:8080/project_backend/rest/users/restoreUser/${username}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          token: tokenUser,
        },
      }
    );

    if (response.ok) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error restoring user:", error);
    return false;
  }
}

export async function getUserByToken(tokenUser) {
  try {
    const response = await fetch(
      "http://localhost:8080/project_backend/rest/users",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: tokenUser,
        },
      }
    );

    if (response.ok) {
      const user = await response.json();
      return user;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}



export async function registerUserByPO(tokenUser, newUser) {
  try {
    const response = await fetch(
      "http://localhost:8080/project_backend/rest/users/addUserByPO",
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'token': tokenUser
        },
        body: JSON.stringify(newUser),
      }
    );

    if (response.ok) {
        return 200;
   
    } else {
    
          const errorData = await response.text();
          return errorData;
    }
  } catch (error) {
   
  }
}

export async function registerUser(newUser) {
  try {
    const response = await fetch(
      "http://localhost:8080/project_backend/rest/users/addUserDB",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          
        },
        body: JSON.stringify(newUser),
      }
    );

    if (response.ok) {
        return true;
   
    } else {
    
          const errorData = await response.text();
          return errorData;
    }
  } catch (error) {
   
  }
}


export async function getInactiveUsers(tokenUser) {
  try {
      const response = await fetch("http://localhost:8080/project_backend/rest/users/inactiveUsers", {
          method: "GET",
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              token:tokenUser
          }
      });

      if (response.ok) {
          const users = await response.json();
          return users;
          
          
      } else {
          console.error("Failed to fetch user data");
          return null;
      }
  } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
  }
}

export async function getActiveUsers(token) {
  try {
      const response = await fetch("http://localhost:8080/project_backend/rest/users/activeUsers", {
          method: "GET",
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              token:token
          }
      });

      if (response.ok) {
          const users = await response.json();
          return users;
          
          
      } else {
          console.error("Failed to fetch user data");
          return null;
      }
  } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
  }
}

export async function updateProfileByPO(tokenUser,username, updatedUserData) {

  try {
      const response = await fetch("http://localhost:8080/project_backend/rest/users/updateProfilePO", {
          method: 'PUT',
          headers: {
           'Content-Type': 'application/json',
           'Accept': '*/*',
           token:tokenUser,
           username:username
          },
          body: JSON.stringify(updatedUserData)
      });

      if (response.ok) {
          return 200;
      }else{
        const result = await response.text();
        return result;
     }
   
  }catch(error){
     
  }
}

export async function validateAccount(token) {
  try {
    const response = await fetch(`http://localhost:8080/project_backend/rest/users/confirmationAccount?token=${token}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*'
      },
    });

    if (response.ok) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Ocorreu um erro ao validar a conta:', error);
    return false;
  }
}

export async function getUserByUsername(tokenUser, username) {
  try {

      const response = await fetch("http://localhost:8080/project_backend/rest/users/user", {

      method: "GET",
      headers: {
          'Content-Type': 'application/json',
          'Accept':   '*/*',
          "token":tokenUser,
          'username': username
      },

      });

      if (response.ok) {
          const user = await response.json();
          return user;
          
      } else {
          console.error("Failed to fetch user data");
          return null;
      }
  } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
  }
}


export async function recoveryPAssword(email) {
  try {
    const response = await fetch(
      `http://localhost:8080/project_backend/rest/users/passwordRecovery?email=${email}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
         
        }
      }
    );

    if (response.ok) {
     return true;
      } else {
        return false;
      }
      
    
  } catch (error) {
    console.error( error);
    return false;
  }
}

export async function changePassword(email, password1, password2) {
  try {
    const response = await fetch(
      `http://localhost:8080/project_backend/rest/users/changePassword?password1=${password1}&password2=${password2}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          email:email,
         
        }
      }
    );

    if (response.ok) {
     return true;
      } else {
        const result = await response.text();
        return result;
      }
      
    
  } catch (error) {
    console.error( error);
    return false;
  }
}

export async function getUsersByName(tokenUser, prefix) {
  try {
    const response = await fetch(
      `http://localhost:8080/project_backend/rest/users/filterByName?prefix=${prefix}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: tokenUser,
        },
      }
    );

    if (response.ok) {
      const users = await response.json();
      console.log(users);
      return users;
    } else {
      const error = await response.text();
      return error;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getUsersByEmail(tokenUser, prefix) {
  try {
    const response = await fetch(
      `http://localhost:8080/project_backend/rest/users/filterByEmail?prefix=${prefix}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: tokenUser,
        },
      }
    );

    if (response.ok) {
      const users = await response.json();
      console.log(users);
      return users;
    } else {
      const error = await response.text();
      return error;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}