import request from "@/utils/request";

export function reports(params) {
  return request({
    url: "survey/reports",
    method: "get",
    params,
  });
}

export function downloadReport(params) {
  return request({
    url: "survey/export",
    method: "get",
    params,
  });
}
