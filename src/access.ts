/**
 * @see https://umijs.org/docs/max/access#access
 * */
// 假设你的 API 类型中，currentUser.access 是 string[] 类型
export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const { currentUser } = initialState ?? {};

  const userAccess = Array.isArray(currentUser?.access)
    ? (currentUser.access as string[]) // 强制转换
    : [];

  return {
    canAdmin: userAccess.includes('admin'),
    canStudent: userAccess.includes('student'),
    canTeacher: userAccess.includes('teacher'),
  };
}
