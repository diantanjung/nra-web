import request from '@/utils/request';

export function ClientList() {
  return request({
    url: 'clients',
    method: 'get'
  });
}
