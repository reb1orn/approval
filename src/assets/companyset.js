// 企业设置
import Vue from 'vue'
const companyset = {
    // 获取企业设置信息
    GainCompanyInfo:function GainCompanyInfo(ip,postdata){
        return Vue.http.post(ip,postdata).then(response => {
            if(response.status == 200){
                return Promise.resolve(response.body)
            }else{
                return Promise.reject(response.data.message)
            }
        })
    },
    // 保存企业设置信息
    SaveCompanySet:function SaveCompanySet(ip,postdata){
        return Vue.http.post(ip,postdata).then(response => {
            if(response.status == 200){
                return Promise.resolve(response.body)
            }else{
                return Promise.reject(response.data.message)
            }
        })
    },
    // 上传文件
    uploadFile:function uploadFile(ip,postdata){
        return Vue.http.post(ip,postdata).then(response => {
            if(response.status == 200){
                return Promise.resolve(response.body)
            }else{
                return Promise.reject(response.data.message)
            }
        })
    },
}
export default companyset
// module.exports = companyset