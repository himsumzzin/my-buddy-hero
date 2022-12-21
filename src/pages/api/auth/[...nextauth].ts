import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { dbConnect } from '@/utils/server/dbConnect';
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
      async authorize(credentials: any) {
        if (!credentials) throw new Error('credentials is null!');
        await dbConnect();
        const user = await User.findOne({ id: credentials.id }).exec();
        if (!user) {
          throw new Error('no-id');
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error('wrong-id');
        }
        return { name: user.groupId } as any;
      },
    }),
  ],
});
