<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import router from '@/router';
import { loginApi } from '@/api';
import type { loginType } from '@/types/api.ts';

const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  name: '',
  pwd: '',
});

const rules = reactive<FormRules>({
  name: [
    { required: true, message: 'Please input your name', trigger: 'blur' },
    { min: 5, max: 10, message: 'Length should be 5 to 10', trigger: 'blur' },
  ],
  pwd: [
    { required: true, message: 'Please input your password', trigger: 'blur' },
    { min: 8, max: 30, message: 'Length should be 8 to 30', trigger: 'blur' },
  ],
});

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

const resetPwd = () => {
  router.push('/resetPwd');
  // return false;
};

const register = () => {
  router.push('/register');
};

const handleLogin = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  else {
    formEl.validate((valid) => {
      if (valid) {
        let data: loginType = { name: ruleForm.name, pwd: ruleForm.pwd };
        // post用data传递，传过去的是一个对象，传过去的数据在body（ctx.request.body）上
        // get用params传递，传过去的数据是直接拼接到url上的，传过去的数据在query（ctx.query）上
        // console.log(import.meta.env.VITE_BASE_URL);
        loginApi(data).then((res) => {
          let token = res.token;
          sessionStorage.setItem('token', token);
          router.push('/');
        });
      } else return;
    });
  }
};
</script>

<template>
  <el-text style="display: block; margin-bottom: 10px">登&nbsp;&nbsp;录</el-text>
  <div class="wrapper">
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="80px">
      <el-form-item label="Name" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="pwd">
        <el-input v-model="ruleForm.pwd"></el-input>
      </el-form-item>
      <el-form-item>
        <div>
          <el-button type="primary" @click="handleLogin(ruleFormRef)">确 定</el-button>
          <el-button @click="resetForm(ruleFormRef)">取 消</el-button>
        </div>
      </el-form-item>
    </el-form>
    <p class="text">Forgot&nbsp;&nbsp;<a href="javascript:;" @click="resetPwd">Password</a>?</p>
    <p class="text"><a href="javascript:;" @click="register">Create</a>&nbsp;an&nbsp;account</p>
  </div>
</template>

<style lang="less">
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  .text {
    display: inline-block;
    font-size: 5px;
  }
}
</style>
