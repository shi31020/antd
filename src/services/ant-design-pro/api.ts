// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>('/api/currentUser', {
    method: 'GET',
    withCredentials: true,  // 确保请求包含凭证信息（如 cookies）
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/login/outLogin', {
    method: 'POST',
    withCredentials: true,  // 确保请求包含凭证信息（如 cookies）
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/login/account', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    withCredentials: true,  // 确保请求包含凭证信息（如 cookies）
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    withCredentials: true,  // 确保请求包含凭证信息（如 cookies）
    ...(options || {}),
  });
}

/** 更新规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    data: {
      method: 'update',
      ...(options || {}),
    },
    withCredentials: true,  // 确保请求包含凭证信息（如 cookies）
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    data: {
      method: 'post',
      ...(options || {}),
    },
    withCredentials: true,  // 确保请求包含凭证信息（如 cookies）
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'POST',
    data: {
      method: 'delete',
      ...(options || {}),
    },
    withCredentials: true,  // 确保请求包含凭证信息（如 cookies）
  });
}

// 注册表单
export async function register(data: API.RegisterData) {
  return request<{
    status: number;
    message: string;
  }>('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
    withCredentials: true,  // 确保请求包含凭证信息（如 cookies）
  });
}

// 查询请求
export async function queryClasses(params: API.ClassQuery) {
  return request<API.ClassQuery[]>('/api/query_classes', {
    method: 'POST',
    data: params,
    withCredentials: true,  // 确保请求包含凭证信息（如 cookies）
  });
}

export async function fetchAwaitingApprovalClasses() {
  return request('/api/approveAwait', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
}

export async function approveCourse(courseId: number) {
  return request('/api/Approval', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: { ID: courseId },
    withCredentials: true,
  });
}

export async function getCourseInfo(courseNumber: string) {
  return request<{
    success: boolean;
    data: API.CourseInfo;
  }>(`/api/course/info?courseNumber=${courseNumber}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
}

export async function submitCourseApplication(data: API.CourseApplication) {
  return request<API.CourseApplication>('/api/course/apply', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
    withCredentials: true,
  });
}

export async function fetchMyCourses() {
  return request<{
    success: boolean;
    data: API.CourseData;
  }>('/api/myCourses', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
}

export async function updateCourse(data: API.CourseData) {
  return request<API.CourseData>('/api/updateCourse', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
    withCredentials: true,
  });
}

export async function deleteCourse(ID: number) {
  return request(`/api/deleteCourse`, {
    method: 'POST',
    data:ID,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
}

export async function fetchCourses() {
  return request<API.CourseData[]>('/api/courses', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
}
