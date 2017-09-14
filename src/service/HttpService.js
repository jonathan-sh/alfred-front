//const URL = "http://development-sgpa-web-hooks.saas-solinftec.com";
const URL = "http://localhost:5555";

class HttpService {


    get(uri, token) {

        const requestInfo = {
            method: 'GET',
            headers: this.makeHeaders(token)
        };

        return fetch(URL + uri, requestInfo);
    }

    post(uri, data, token) {

        const requestInfo = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: this.makeHeaders(token)
        };

        return fetch(URL + uri, requestInfo);
    }

    put(uri, data, token) {

        const requestInfo = {
            method: 'PUT',
            body: JSON.stringify(data),
            headers:this.makeHeaders(token)
        };

        return fetch(URL + uri, requestInfo);
    }

    delete(uri, data, token) {

        const requestInfo = {
            method: 'DELETE',
            body: JSON.stringify(data),
            headers:this.makeHeaders(token)
        };

        return fetch(URL + uri, requestInfo);
    }

    makeHeaders(token) {
        return new Headers({
            'Content-type': 'application/json;charset=UTF-8',
            'X-Auth-Token': token === undefined ? '-' : token
        })
    }


}

export default HttpService;
