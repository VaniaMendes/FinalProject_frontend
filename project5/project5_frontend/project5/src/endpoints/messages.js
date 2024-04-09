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

export async function getMessagesBetweenUsers(tokenUser, username){
    try {
        const response = await fetch(`http://localhost:8080/project_backend/rest/messages/${username}`, {
            method: "GET",
            headers: {
                'Accept': '*/*',
                "Content-Type": "application/json",
                'token': tokenUser
            }
        });

        if(response.ok){
            const messages = await response.json();
            console.log(messages);
            return messages;
        } else {
            console.log(response.status);
            return null;
        }
    } catch (error) {
        console.error('Error:', error.message);
        return false;
    }
}
