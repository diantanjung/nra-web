import request from '@/utils/request';

export function UserCreate(data) {
  return request({
    url: 'users',
    method: 'post',
    data: data,
  });
}
