import TemplateRepository from "./TemplateRepositoryService";

class ApplicationService extends TemplateRepository{
    constructor(){
        super('/application');
    }
}
export default new ApplicationService();