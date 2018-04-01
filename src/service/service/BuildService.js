import TemplateRepository from "./TemplateRepositoryService";

class BuildService extends TemplateRepository{
    constructor(){
        super('/build');
    }
}
export default new BuildService();