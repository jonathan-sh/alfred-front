import TemplateRepository from "./TemplateRepositoryService";

class MachineService extends TemplateRepository
{
    constructor(){
        super('/slave');
    }
}
export default new MachineService();