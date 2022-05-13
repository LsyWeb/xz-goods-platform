import axios from 'axios'

// export async function getList(data) {
//   return axios.post('/ShiZhan1/user/selectByPageAndCondition?currentPage=1&pageSize=5', data)
// }

export async function addGoods() {
  return axios.post('/goods/v2/addStudent', {
    "building": "桃1",
    "house": "fddsf",
    "name": "xiaoliu",
    "phone": "sdf",
    "num": 7,
    "goodsregion": "",
    "goodsname": "卫生巾",
    "remarks": "fds",
    "img": ""
})
}
// addGoods();

export async function upload(formData){
  return axios.post('/goods/v2/upload',formData,{
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

}