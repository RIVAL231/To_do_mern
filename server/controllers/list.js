import List from '../models/lists.js';
import User from '../models/user.js';


export const addList = async (req, res) => {
    try {
        const { description } = req.body;
        const {userId} = req.params;
        const user = await User.findById(userId);
        const newList = await List.create({ userId, description });
        await newList.save();
        user.lists.push(newList._id);
        const list = await List.find({ userId });
        res.status(201).json(list);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }  
};
    
export const getLists = async (req, res) => { 
    try {
        const { userId } = req.params;
        const lists = await List.find({ userId });
        res.status(200).json(lists);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
  };

 export const deleteList = async (req, res) => { 
    try {
        const { listId } = req.params;
        await List.findByIdAndDelete(listId);
        res.status(200).json({ message: "List deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
   };

   export const updateList = async (req, res) => {
    try {
        const { listId } = req.params;
        const { description, isChecked } = req.body;

        const list = await List.findById(listId);

        if (description) {
            list.description = description;
        }

        // Explicitly check for the presence of isChecked
        if (typeof isChecked !== 'undefined') {
            list.isChecked = isChecked;
        }

        await list.save();
        res.status(200).json({ message: "List updated successfully", list });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
