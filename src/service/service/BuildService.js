import TemplateRepository from "./TemplateRepositoryService";

class BuildService extends TemplateRepository{
    constructor(){
        super('/build');
    }

    getLogUrl(id)
    {
        return super.getApiUrl()+"/build/log/"+id
    }
}
export default new BuildService();