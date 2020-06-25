
var pa = require("../../../../../../package.json");

// const state = {
    
//     version: pa.version,
//     author: pa.author,

//     electron: process.versions.electron,
//     node: process.versions.node,
//     platform: require('os').platform(),
//     vue: require('vue/package.json').version,
//     ui:require('element-ui/package.json').version,

//     baseUrl:"http://localhost:8888/"
// }
  
// const mutations = {
//     UPDATE_BASE_URL: (state, baseUrl) => {
//         state.baseUrl = baseUrl;
//     }
// }

// const actions = {
//     setBaseUrl({ commit, dispatch },baseUrl){
//         console.log(111,baseUrl);
//         //commit('UPDATE_BASE_URL',baseUrl)
//     }
// }

export default {
    namespaced: true,
    state: {
        version: pa.version,
        author: pa.author,    
        title: pa.title,
        baseUrl:"http://localhost:8888/",
        dbKeys: ["system"]
    },
    mutations:{
        SET_BASE_URL: (state, baseUrl) => {
            state.baseUrl = baseUrl;
        },
        SET_DB_KEYS: (state, dbKeys) => {
            state.dbKeys = dbKeys;
        }
    },
    actions:{
        setBaseUrl({ commit },baseUrl){
            commit('SET_BASE_URL',baseUrl)
        },
        setDbKeys({ commit },dbKeys){
            commit('SET_DB_KEYS',dbKeys)
        },
    }
}
