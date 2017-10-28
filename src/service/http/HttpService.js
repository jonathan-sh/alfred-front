const API_URL = "https://alfred.saas-solinftec.com";


/**
 * Abstraction of the ~GenericHttpRequest~ for each existing url
 */
class HttpService {

    static make = () =>
    {
        if(!this.HTTP_SERVICE_INSTANCE)
        {
            this.HTTP_SERVICE_INSTANCE = new GenericHttpRequest(API_URL);
        }
        return this.HTTP_SERVICE_INSTANCE;
    };

}
export default HttpService;


/**
 * Generic class to make requests
 */
class GenericHttpRequest {

    constructor(url)
    {
        this.URL = url;
    }

    get(uri)
    {
        return this.makeRequest('GET', uri);
    }

    post(uri, data)
    {
        return this.makeRequest('POST', uri, data);
    }

    put(uri, data) {
        return this.makeRequest('PUT', uri, data);
    }

    deleteOne(uri, data) {
        return this.makeRequest('DELETE', uri, data);
    }

    makeRequest(method, uri, data)
    {
        let requestInfo = this.makeRequestInfo(method,data);
        return fetch(this.URL + uri, requestInfo)
            .then(response =>
            {
                if (response.status === 200 || response.status === 201)
                {
                    return response.json();
                }
                if (response.status === 401)
                {
                    throw this.sendError("unauthorized");
                }
                if (response.status === 404)
                {
                    throw this.sendError("not found");
                }
                throw this.sendError("http request error");

            });
    }

    sendError(value){
        let error = value;
        return error;
    }

    makeRequestInfo(method,data)
    {
        let info =
            {
                method: method,
                body: JSON.stringify(data),
                headers:this.makeHeaders()
            };
        return info
    }

    makeHeaders()
    {
        let token = localStorage.getItem('auth-token');
        return new Headers({
            'Content-type': 'application/json;charset=UTF-8',
            'X-Auth-Token': token === undefined ? '-' : token
        });
    }
}



