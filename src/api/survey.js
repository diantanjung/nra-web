import request from '@/utils/request';


export function reports(params) {
  return request({
    url: 'survey/reports',
    method: 'get',
    params,
  });
}
