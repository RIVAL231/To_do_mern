import lists from '../models/lists.js';
import User from '../models/user.js';

export const getUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id);  
        res.status(200).json(user);

}catch{
    res.status(500).json({ error: err.message });
}
};





