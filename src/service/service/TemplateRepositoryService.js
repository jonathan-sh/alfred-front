import HttpService from '../http/HttpService';

class TemplateRepositoryService
{
    constructor(uri)
    {
        this.uri = uri;
        this.storageKey = 'stg-'+uri.replace('/','');
    }

    getApiUrl(){
        return HttpService.getApiUrl();
    }


    getAll()
    {
        return HttpService.make().get(this.uri);
    }

    save(data)
    {
        return HttpService.make().post(this.uri,data);
    }


    post(uri, data)
    {
        return HttpService.make().post(this.uri+uri,data);
    }

    update(data)
    {
        return HttpService.make().put(this.uri,data);
    }

    delete(id)
    {
        return HttpService.make().deleteOne(this.uri+'/'+id);
    }
}
export default TemplateRepositoryService;