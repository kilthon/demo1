import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost:27017/test');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('connection succeed!');
});

const Schema = mongoose.Schema;

// 用户
interface userSchemaIF {
  name: string;
  pwd: string;
  token: string;
}
const userSchema = new Schema<userSchemaIF>({
  name: {
    type: String,
    required: true,
  },
  pwd: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

// 验证码
interface codeIF {
  token: string;
  code: string;
}
const codeSchema = new Schema<codeIF>({
  token: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
});

export const User = mongoose.model('User', userSchema);
export const Code = mongoose.model('Code', codeSchema);
