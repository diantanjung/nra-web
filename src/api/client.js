import request from '@/utils/request';

export function ClientList() {
  return request({
    url: 'client',
    method: 'get'
  });
}

export function ClientDetail(id) {
  return request({
    url: `client/${id}`,
    method: 'get'
  });
}
