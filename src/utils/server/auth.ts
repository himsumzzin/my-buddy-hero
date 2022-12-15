import { hash, compare } from 'bcryptjs';

// 비밀번호 해쉬
export async function hashPassword(password: string) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

// 비밀번호 체크 (퓨어 비번, 해쉬된 비번)
export async function verifyPassword(password: string, hashedPassword: string) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}
