
const url = "http://localhost:8080/project_backend/rest/categories/";
export async function createCategory(title, description, token) {

    const createRequest = url + "createCategory";

    try {
        const response = await fetch(createRequest, {
            method: "POST",
            headers: {
                'Accept': '*/*',
                "Content-Type": "application/json",
                token: token
            },
            body: JSON.stringify({
                title: title,
                description: description
            })
        });

        const result=response.status;
        console.log(result);
        return result;
    } catch (error) {
        return error.message;
    }
 }

 export async function deleteCategory(categoryId, tokenUser) {


        let deleteCategoryRequest = `http://localhost:8080/project_backend/rest/categories/delete/${categoryId}`;
    try {
        const response = await fetch(deleteCategoryRequest, {
            method: "DELETE",
            headers: {
                'Accept': '*/*',
                "Content-Type": "application/json",
                token: tokenUser
            }
          });

          if (response.ok) {
             return true;
           
          } else {
            const result = await  response.text(); 
            return result;
            
          }
    } catch (error) {
          console.error("Error deleting category:", error);
       }
 }

 export async function getAllCategories(tokenUser) {
      
    const categoriesRequest = "http://localhost:8080/project_backend/rest/categories/getAllCategories";
    try {
        const response = await fetch(categoriesRequest, {
            method: "GET",
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                token: tokenUser
            }
        });

        if (response.ok) {
             const categories = await response.json();
            return categories;
        } else {
          return null;
        }
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
 }

 export async function editCategory(categoryId, tokenUser, newtitle, newdescription) {
    let editCategoryRequest = `http://localhost:8080/project_backend/rest/categories/update/${categoryId}`;

    try {
        const response = await fetch(editCategoryRequest, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'token': tokenUser
            },
            body: JSON.stringify({
                title: newtitle,
                description: newdescription,
                idCategory: categoryId
            })
        });

        const result=response.status;
        console.log(result);
        return result;
    } catch (error) {
        console.error("Error editing category data:", error);
    }
}


export async function getCategoryById(categoryId, token) {

    let getCategoryRequest = `http://localhost:8080/project_backend/rest/categories/getCategoryById/${categoryId}`

    try {
        const response = await fetch(getCategoryRequest, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                token: token
            }
        });

        if (response.ok) {
            const category = await response.json();
            return category;

        } else {
            return null;
        }
    } catch (error) {
        return null;
    }

}


export async function getCategoryByTitle(tokenUser, categoryTitle) {
    try {
        const response = await fetch(`http://localhost:8080/project_backend/rest/categories/category/${categoryTitle}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                token: tokenUser
            }
        });

        if (response.ok) {
            const id = await response.json();
           
            return id;
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
}

