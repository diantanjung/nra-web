import request from '@/utils/request';

export function login(data) {
  return request({
    url: 'auth',
    method: 'post',
    data: data,
  });
}

export function info() {
  return request({
    url: 'auth',
    method: 'get'
  });
}

export function ChangePassword(data) {
  return request({
    url: 'auth/change-password',
    method: 'post',
    data: data,
  });
}

export function RoleList() {
  return request({
    url: 'auth/roles',
    method: 'get'
  });
}

export function logout() {
  return request({
    url: 'auth',
    method: 'delete',
  });
}
