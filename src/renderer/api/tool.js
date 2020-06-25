import request from "@/request";

/**
 * 测试连接
 * @param {Object} params 参数
 */
export const testDbConnect = params => {
  return request.post(`api/Tool/TestDbConnect`,  params );
};
/**
 * 建库
 * @param {Object} params 参数
 */
export const createDb = params => {
    return request.post(`api/Tool/CreateDb`, params);
};

/**
 * 初始化库
 * @param {Object} params 参数
 */
export const initDb = params => {
    return request.post(`api/Tool/InitDb`, params);
};

/**
 * 生成种子数据
 * @param {Object} params 参数
 */
export const generateSeedData = params => {
    return request.post(`api/Tool/GenerateSeedData`, params);
};


