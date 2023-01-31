import request from '@/utils/request';

export function StoreList() {
  return request({
    url: 'merchant',
    method: 'get'
  });
}

export function StoreDetail(id) {
  return request({
    url: `merchant/${id}`,
    method: 'get'
  });
}
