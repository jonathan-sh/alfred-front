import TemplateRepository from "./TemplateRepositoryService";

class AuthService extends TemplateRepository{
    constructor(){
        super('/auth');
    }

    getId()
    {
        let  name = JSON.parse(localStorage.getItem('profile')).id;
        return (name)? name : "007";
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
    getLevel()
    {
        let  level = JSON.parse(localStorage.getItem('profile')).level;
        return (level)? level : "007";
    }
    isAdminLevel()
    {
        return (JSON.parse(localStorage.getItem('profile')).level === 'ADMIN');
    }
}
export default new AuthService();


