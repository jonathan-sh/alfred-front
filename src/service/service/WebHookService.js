import TemplateRepository from "./TemplateRepositoryService";

class WebHookService extends TemplateRepository{
    constructor()
    {
        super('/wh-git-hub');
    };
}
export default new WebHookService();