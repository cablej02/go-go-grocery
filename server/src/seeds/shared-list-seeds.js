import { SharedList } from "../models/index.js";

export const seedSharedLists = async () => {
    await SharedList.bulkCreate([
        { list_id: 1, user_id: 2 },
        { list_id: 2, user_id: 2 },
    ]);
};