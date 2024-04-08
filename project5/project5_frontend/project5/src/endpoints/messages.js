export async function sendMessage(tokenUser, message){
    try {
        const response = await fetch(`http://localhost:8080/project_backend/rest/messages/send`, {
            method: "POST",
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                token:tokenUser
            },
            body: JSON.stringify(message)
        });

        if(response.ok)
        return true;
    } catch (error) {
        console.error('Error:', error.message);
        return false;
    }
}