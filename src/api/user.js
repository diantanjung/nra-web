import request from '@/utils/request';


export function UserDetail(id) {
  return request({
    url: `users/${id}`,
    method: 'get'
  });
}

export function UserCreate(data) {
  return request({
    url: 'users',
    method: 'post',
    data: data,
  });
}

export function UserUpdate(id, data) {
  return request({
    url: `users/${id}`,
    method: 'put',
    data: data,
  });
}
