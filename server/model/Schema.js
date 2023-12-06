import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    image:{
        type: String,
        required: true,
      },
});
const User = mongoose.model('blog-1', userSchema);
export default User;