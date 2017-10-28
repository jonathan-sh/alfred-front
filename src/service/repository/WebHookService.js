import TemplateRepository from "./TemplateRepositoryService";

class WebHookService extends TemplateRepository{
    constructor()
    {
        super('/web-hook');
    };
}
export default new WebHookService();