import TemplateRepository from "./TemplateRepositoryService";

class ProfileService extends TemplateRepository{
    constructor(){
        super('/profile');
    }

    getName()
    {
       let  name = JSON.parse(localStorage.getItem('profile')).name;
       return (name)? name : "007";
    }
    getEmail()
    {
        let  email = JSON.parse(localStorage.getItem('profile')).email;
        return (email)? email : "007";
    }
}
export default new ProfileService();


