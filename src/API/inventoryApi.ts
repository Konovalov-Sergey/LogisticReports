import { InventoryType } from "../types/inventoryType";
import { instance } from './api';


export const inventoryApi = {
    getInventory(department: string) {
        return instance.get<getInventoryType>(`inventory/get_inventory.php?department=${department}`)
        .then(res => res.data);
    }
}
export type getInventoryType = {
    inventory: InventoryType 
}