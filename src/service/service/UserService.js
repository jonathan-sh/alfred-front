import TemplateRepository from "./TemplateRepositoryService";

class UserService extends TemplateRepository{
    constructor(){
        super('/user');
    }
}
export default new UserService();