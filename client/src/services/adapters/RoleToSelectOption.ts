import Role from "../../interfaces/Role";
import SelectOption from "../../interfaces/SelectOption";

class RoleToSelectOption {
    adapt = (role: Role): SelectOption => {
        return (
            {
                value: role.id,
                title: role.name
            }
        )
    }
}

export default new RoleToSelectOption();