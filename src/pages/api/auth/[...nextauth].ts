import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from '@/utils/server/dbConnect';
import { verifyPassword } from '@/utils/server/auth';
import { User } from '@/models/index';

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      credentials: {
        id: { label: '아이디 :', type: 'text' },
        password: { label: '비밀번호 :', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) throw new Error('credentials is null!');
        await dbConnect();
        const user = await User.findOne({ id: credentials.id }).exec();
        console.log(user);
        if (!user) {
          throw new Error('해당하는 아이디가 없습니다.');
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error('비밀번호가 틀렸습니다.');
        }
        return { id: user.id };
      },
    }),
  ],
});
