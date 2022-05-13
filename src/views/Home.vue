<template>
 <van-notice-bar left-icon="volume-o" :text="notice" />
  <div class="home-container">
   
    <h2>信工院急需物品采购平台</h2>
    <van-form class="form-container" @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="formData.building"
          is-link
          readonly
          name="building"
          label="寝室楼"
          placeholder="点击选择寝室楼"
          required
          :rules="[{ required: true, message: '请选择寝室楼' }]"
          @click="showPicker = true"
        />
        <van-popup v-model:show="showPicker" position="bottom">
          <van-picker
            :columns="pickerColumns"
            @confirm="
              (value) => {
                formData.building = value;
                showPicker = false;
              }
            "
            @cancel="showPicker = false"
          />
        </van-popup>
        <van-field
          v-model="formData.house"
          name="house"
          label="寝室号"
          placeholder="请填写寝室号"
          required
          :rules="[{ required: true, message: '请填写寝室号' }]"
        />
        <van-field
          v-model="formData.name"
          name="name"
          label="姓名"
          placeholder="请填写姓名"
          required
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="formData.phone"
          type="phone"
          name="phone"
          label="手机号"
          placeholder="请填写手机号"
          required
          :rules="[{ required: true, message: '请填写手机号' }]"
        />
        <van-field
          v-model="formData.goodsregion"
          name="goodsregion"
          label="类型"
          placeholder="请选择类型"
          required
          :rules="[{ required: true, message: '请填写类型' }]"
        >
          <template #input>
            <van-radio-group
              v-model="formData.goodsregion"
              direction="horizontal"
            >
              <van-radio name="1">生活用品</van-radio>
              <van-radio name="2">药品</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
          v-if="formData.goodsregion === '2'"
          v-model="formData.drug"
          name="drug"
          label="药品"
          placeholder="请填写药品名称"
          required
          :rules="[{ required: true, message: '请填写药品名称' }]"
        />
        <van-field
          v-if="formData.goodsregion === '1'"
          v-model="formData.goodsname"
          is-link
          readonly
          name="goodsname"
          label="生活用品"
          placeholder="请选择生活用品"
          required
          :rules="[{ required: true, message: '请选择生活用品' }]"
          @click="lifeShowPicker = true"
        />
        <van-popup v-model:show="lifeShowPicker" position="bottom">
          <van-picker
            :columns="lifeGoodsColumns"
            @confirm="
              (value) => {
                formData.goodsname = value;
                lifeShowPicker = false;
              }
            "
            @cancel="lifeShowPicker = false"
          />
        </van-popup>
        <van-field v-model="formData.num" name="num" label="数量">
          <template #input>
            <van-stepper v-model="formData.num" :max="6" />
          </template>
        </van-field>
        <van-field
          v-model="formData.remarks"
          type="textarea"
          name="remarks"
          label="备注"
          placeholder="请填写备注"
          autosize
        />
      </van-cell-group>
      <van-cell-group
        v-if="formData.goodsregion === '2'"
        inset
        title="购买药品必须要上传手写证明"
      >
        <van-field
          v-if="formData.goodsregion === '2'"
          name="images"
          label="图片上传"
          required
          :rules="[{ required: true, message: '请上传图片' }]"
        >
          <template #input>
            <van-uploader
              v-model="formData.images"
              :max-count="1"
              :multiple="false"
              :before-read="onBeforeUpload"
              :after-read="onAfterUpload"
            >
              <template #preview-cover="{ file }">
                <div class="preview-cover van-ellipsis">{{ file.name }}</div>
              </template>
            </van-uploader>
          </template>
        </van-field>
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
// @ is an alias to /src
import { Toast } from "vant";
import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { addGoods, upload } from "../api";
export default {
  name: "Home",
  setup() {
    const router = useRouter();
    const notice = ref("疫情之下物品来之不易 请同学们按需如实填写！");
    // form表单数据
    const formData = reactive({
      building: "",
      house: "",
      phone: "",
      name: "",
      goodsregion: "1",
      drug: "",
      goodsname: "",
      num: 1,
      remarks: "",
      img: "",
      images: [],
    });
    const showPicker = ref(false); //选择宿舍楼弹出层是否显示
    let column = [];
    for (let i = 1; i < 8; i++) {
      column.push(`桃${i}`);
    }
    const pickerColumns = ref(column); //宿舍楼选择器的数据

    const lifeShowPicker = ref(false); //生活用品是否显示
    // 生活用品数据
    const lifeGoodsColumns = ref([
      "毛巾",
      "香皂",
      "洗衣粉",
      "牙膏",
      "牙刷",
      "洗发水",
      "卫生巾",
      "卫生纸",
      "口罩10片装",
    ]);

    //表单提交事件
    const onSubmit = async (form) => {
      // console.log(form);
      const data = { ...formData };
      if (form.goodsregion === "2") {
        data.goodsname = form.drug;
      }
      delete data.drug;
      data.num = +form.num;
      delete data.images;
      // console.log(data);
      Toast.loading("提交中");
      const res = await addGoods(data);
      if (res.data.success) {
        Toast.success("提交成功");
        router.push("/result");
      } else {
        Toast.fail("提交失败");
      }
    };

    const onBeforeUpload = (file) => {
      if (file.type === "image/jpeg" || file.type === "image/png") {
        return true;
      } else {
        Toast("请上传 jpg/png 格式图片");
        return false;
      }
    };
    const onAfterUpload = async (file) => {
      let uploadformData = new FormData();
      uploadformData.append("myfile", file.file);

      const res = await upload(uploadformData);
      console.log(res);

      if (res.data.success) {
        formData.img = res.data.data.url;
        file.status = "success";
        Toast("上传成功");
      } else {
        file.status = "failed";
        file.message = "上传失败";
        Toast("上传失败");
      }
    };

    onMounted(() => {});
    return {
      notice,
      formData,
      showPicker,
      pickerColumns,
      lifeGoodsColumns,
      lifeShowPicker,
      onSubmit,
      onBeforeUpload,
      onAfterUpload,
    };
  },
};
</script>

<style lang="scss" scoped>
.home-container {
  background-color: #efefef;
  padding: 12px;
  width: 100%;
  height: calc(100vh - 40px);
  box-sizing: border-box;
  overflow: auto;
  .form-container {
    text-align: left;
    .preview-cover {
      position: absolute;
      bottom: 0;
      box-sizing: border-box;
      width: 100%;
      padding: 4px;
      color: #fff;
      font-size: 12px;
      text-align: center;
      background: rgba(0, 0, 0, 0.3);
    }
  }
}
</style>