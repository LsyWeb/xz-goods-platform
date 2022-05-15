import { request } from "umi"
import type { authTableDataType } from "./data"

export async function getGoodsList(params: any) {
  const res = await request("/goods/v2/SelectAllServlet")
  if (!res.success) {
    return res
  }
  let result: any[] = []
  result = res.data.filter((item: any) => {
    return (
      item.building.includes(params.building ? params.building : '') &&
      item.house.includes(params.house ? params.house : '') && 
      item.name.includes(params.name ? params.name : '') && 
      item.phone.includes(params.phone ? params.phone : '') && 
      (params.goodsregion ? item.goodsregion ===  params.goodsregion : true) && 
      item.goodsname.includes(params.goodsname ? params.goods : '')
    )
  })
  return {
    data: result,
    msg: res.msg,
    success: res.success,
  }
}
// 删除物品信息
export async function deleteGoods(id:number){
  return request("/goods/v2/deleteStudent",{
    params:{
      id
    }
  })
}
