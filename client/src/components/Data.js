export default class Data {
    // api handler to set up Fetch data. 
    api(path, method, body = null, requiresAuth = false, credentials = null){
        const url = 'http://localhost:5000/api' + path;

        const options = {
            method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            }
        }

        if (body !== null) {
        options.body = JSON.stringify(body);
        }

        // Check if auth is required
        if (requiresAuth) {    
            const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);;
            options.headers['Authorization'] = `Basic ${encodedCredentials}`;
        }
        return fetch(url,options)
    }

    // gets the user with the help of api()
    async getUser(emailAddress, password) {
        const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password });
        if (response.status === 200) {
          return response.json().then(data => data);
        }
        else if (response.status === 401) {
          return null;
        }
        else {
          throw new Error();
        }
    }
    
    // gets the user with the help of api()
    async createUser(user) {
        const response = await this.api('/users', 'POST', user);
        if (response.status === 201) {
            return [];
        }
        else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors;
            });
        }
        else {
            throw new Error();
        }
    }
}