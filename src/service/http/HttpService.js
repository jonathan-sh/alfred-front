import history from '../../service/router/History';
const API_URL = "http://localhost:4212/v1";

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

    static getApiUrl= ()=>
    {
        return  API_URL;
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

    get = (uri)=>
    {
        return this.makeRequest('GET', uri);
    };

    post = (uri, data)=>
    {
        return this.makeRequest('POST', uri, data);
    };

    put = (uri, data) =>
    {
        return this.makeRequest('PUT', uri, data);
    };

    deleteOne = (uri) =>
    {
        return this.makeRequest('DELETE', uri);
    };

    makeRequest = (method, uri, data)=>
    {
        let requestInfo = this.makeRequestInfo(method,data);
        return fetch(this.URL + uri, requestInfo)
            .then(response =>
            {
                if (response.status === 200 || response.status === 201)
                {
                    return response.json();
                }
                history.push('/');
            })
            .catch(error =>
            {
                console.log(error);
                history.push('/');
            });
    };

    sendError = (value) => {return value;};

    makeRequestInfo = (method,data)=>
    {
        let info =
            {
                method: method,
                body: JSON.stringify(data),
                headers:this.makeHeaders()
            };
        return info
    };

    makeHeaders = () =>
    {
        let token = localStorage.getItem('auth-token');
        return new Headers({
            'Content-type': 'application/json;charset=UTF-8',
            'x-auth-token': token,
            'x-github-event': 'manual-build'
        });
    };
}



