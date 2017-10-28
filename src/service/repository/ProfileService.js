import TemplateRepository from "./TemplateRepositoryService";

class ProfileService extends TemplateRepository{
    constructor(){
        super('/profile');
    }
}
export default new ProfileService();


