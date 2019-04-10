<template>
  <div>
    <div class="upload-list"
         v-for="item in uploadList">
      <template v-if="item.status === 'finished'">
        <img :src="item.url">
        <div class="upload-list-cover">
          <Icon type="ios-eye-outline"
                @click.native="handleView(item.url)"></Icon>
          <Icon type="ios-trash-outline"
                @click.native="handleRemove(item)"></Icon>
        </div>
      </template>
      <template v-else>
        <Progress v-if="item.showProgress"
                  :percent="item.percentage"
                  hide-info></Progress>
      </template>
    </div>
    <Upload ref="upload"
            :show-upload-list="false"
            :default-file-list="fileList"
            :on-success="handleSuccess"
            :format="['jpg','jpeg','png']"
            :max-size="2048"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload"
            multiple
            type="drag"
            :action="action"
            style="display: inline-block;width:58px;">
      <div style="width: 58px;height:58px;line-height: 58px;">
        <Icon type="ios-camera"
              size="20"></Icon>
      </div>
    </Upload>
    <Modal title="查看大图"
           v-model="visible">
      <img :src="imgName"
           v-if="visible"
           style="width: 100%">
    </Modal>
  </div>
</template>

<script>

export default {
  name: 'MultiUpload',
  data() {
    return {
      imgName: '',
      visible: false,
      uploadList: []
    }
  },
  props: {
    fileList: Array,
    action: String
  },
  methods: {
    handleView(name) {
      this.imgName = name
      this.visible = true
    },
    handleRemove(file) {
      const fileList = this.$refs.upload.fileList
      fileList.splice(fileList.indexOf(file), 1)
      this.$emit('remove', this.uploadList.map(item => item.name))
    },
    handleSuccess(res, file) {
      file.name = res.id
      file.url = res.url
      this.$emit('upload', this.uploadList.map(item => item.name))
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: '图片格式不正确',
        desc: `${file.name}格式不正确，请选择jpg或者png格式`
      })
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: '图片太大',
        desc: `${file.name}的大小超过了2M`
      })
    },
    handleBeforeUpload() {
      const check = this.uploadList.length < 3
      if (!check) {
        this.$Notice.warning({
          title: `最多只能上传上传 3 张图片`
        })
      }
      return check
    }
  },
  watch: {
    fileList: {
      immediate: true,
      handler(fileList) {
        this.$nextTick(function () {
          this.uploadList = this.$refs.upload.fileList
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
  img {
    width: 100%;
    height: 100%;
  }
  .upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
  }
  &:hover .upload-list-cover {
    display: block;
  }
  .upload-list-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
}
</style>
