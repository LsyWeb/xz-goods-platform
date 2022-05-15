import { useState, useRef } from "react"
import { ExclamationCircleFilled } from "@ant-design/icons"
import moment from "moment"
import { PageContainer } from "@ant-design/pro-layout"
import ProTable, { ProColumns, ActionType } from "@ant-design/pro-table"

import type { FC } from "react"
import { useRequest, history } from "umi"

import { deleteGoods, getGoodsList } from "./service"

import styles from "./index.less"
import { message, Modal } from "antd"

export type TableListItem = {
  id: number
  building: string
  house: string
  name: string
  phone: string
  goodsregion: string
  goodsname: string
  num: number
  remarks: string
  img: string
}

export const GoodsList: FC<Record<string, any>> = () => {
  const actionRef = useRef<ActionType>() // table状态实例，用来刷新数据、重置数据
  // 获取最新数据
  const { run } = useRequest(
    (values: any) => {
      return getGoodsList({
        ...values,
      })
    },
    {
      manual: true,
    }
  )

  // 根据搜索条件获取最新数据
  const [requestParams, setRequestParams] = useState({})

  // 筛选条件
  const [filterOptions, setFilterOptions] = useState({})

  // 通过params触发request(更新列表数据)
  async function SearchTableData() {
    setRequestParams({ ...filterOptions })
  }
  

  // 表格列
  const columns: ProColumns<TableListItem>[] = [
    {
      title: "宿舍楼",
      width: 100,
      dataIndex: "building",
      valueEnum: {
        桃1: { text: "桃1" },
        桃2: { text: "桃2" },
        桃3: { text: "桃3" },
        桃4: { text: "桃4" },
        桃5: { text: "桃5" },
        桃6: { text: "桃6" },
        桃7: { text: "桃7" },
      },
    },
    {
      title: "宿舍号",
      width: 100,
      dataIndex: "house",
    },
    {
      title: "姓名",
      width: 120,
      dataIndex: "name",
    },
    {
      title: "手机号",
      width: 150,
      dataIndex: "phone",
    },
    {
      title: "物品类型",
      width: 120,
      dataIndex: "goodsregion",
      render(_,row){
        return row.goodsregion === '1' ? "生活用品" : '药品'
      },
      valueEnum: {
        "1": { text: "生活用品" },
        "2": { text: "药品" },
      },
    },
    {
      title: "物品名称",
      width: 180,
      dataIndex: "goodsname",
    },
    {
      title: "数量",
      width: 80,
      dataIndex: "num",
      valueType: "digit",
      search:false,
    },
    {
      title: "备注",
      width: 200,
      dataIndex: "remarks",
      search:false,
      render(_,row){
        if(!row.remarks){
          return '无';
        }
        return row.remarks;
      }
    },
    {
      title:'购药证明',
      width: 100,
      dataIndex: "img",
      valueType: 'image',
      search: false,
    },
    {
      title:'操作',
      width:100,
      valueType:'option',
      render(_,row){
        return <a  onClick={()=>{
          Modal.confirm({
            title:'删除物品信息',
            content:'该操作不可逆，确定要删除该物品信息吗？',
            onOk:async () =>{
              const res = await deleteGoods(row.id);
              if(res.success){
                message.success('删除成功');
                actionRef.current?.reload();
              }else{
                message.error('删除失败');
              }
            }
          })
        }}>删除</a>
      }
    }
  ]

  return (
    <PageContainer>
      <div className={styles.authList}>
        <ProTable<TableListItem>
          columns={columns}
          params={requestParams}
          actionRef={actionRef}
          // headerTitle='物品列表'
          request={async (params, sorter, filter) => {
            console.log(params, sorter, filter)
            params.current && delete params.pageSize

            // const dataParams = params.dataParams ? params.dataParams : params;

            const res = await run(params)
            const result = res

            return {
              data: result,
              success: true,
              total: res.length,
            }
          }}
          rowKey="id"
          pagination={{
            pageSize: 10,
            size: "default",
            showTotal: () => null,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
          search={{labelWidth: 'auto',}}
          dateFormatter="string"
          // options={false}
        />
      </div>
    </PageContainer>
  )
}

export default GoodsList
