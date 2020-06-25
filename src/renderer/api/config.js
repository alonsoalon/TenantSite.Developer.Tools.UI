import request from "@/request";

/**
 * 得到启动参数
 * @param {Object} params 参数
 */
export const getStartupConfig = params => {
  return request.get(`api/Config/GetStartupConfig`, { params });
};
/**
 * 更新启动参数
 * @param {Object} params 参数
 */
export const updateStartupConfig = params => {
    return request.post(`api/Config/UpdateStartupConfig`, params);
};

/**
 * 得到启动参数
 * @param {Object} params 参数
 */
export const getSystemConfig = params => {
    return request.get(`api/Config/GetSystemConfig`, { params });
  };

/**
 * 更新启动参数
 * @param {Object} params 参数
 */
export const updateSystemConfig = params => {
    return request.post(`api/Config/UpdateSystemConfig`, params);
};

/**
 * 得到租户列表
 * @param {Object} params 参数
 */
export const getTenantList = params => {
    return request.get(`api/Config/GetTenantList`, { params });
};


/**
 * 更新租户参数
 * @param {Object} params 参数
 */
export const saveTenantConfig = params => {
  return request.post(`api/Config/SaveTenantConfig`, params);
};

/**
 * 删除租户
 * @param {*} params 
 */
export const deleteTenant = params => {
  return request.delete(`api/Config/DeleteTenant`, { params });
};
