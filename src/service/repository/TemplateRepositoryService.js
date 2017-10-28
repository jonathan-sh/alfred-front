import HttpService from '../http/HttpService';

class TemplateRepositoryService
{
    constructor(uri)
    {
        this.uri = uri;
        this.storageKey = 'stg-'+uri.replace('/','');
    }

    getAll()
    {
        return HttpService.make().get(this.uri);
    }

    save(data)
    {
        return HttpService.make().post(this.uri,data);
    }

    update(data)
    {
        return HttpService.make().put(this.uri,data);
    }

    delete(data)
    {
        return HttpService.make().deleteOne(this.uri,data);
    }
}
export default TemplateRepositoryService;