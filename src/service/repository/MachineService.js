import TemplateRepository from "./TemplateRepositoryService";

class MachineService extends TemplateRepository
{
    constructor(){
        super('/machine');
    }
}
export default new MachineService();