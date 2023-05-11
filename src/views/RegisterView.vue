<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import router from '@/router';
import { registerApi, getCodeApi } from '@/api';
import type { registerType } from '@/types/api.ts';
// import { getCodeApi } from '@/api';

const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  name: '',
  pwd: '',
  repwd: '',
  code: '',
});

const repwdVld = () => {
  if (ruleForm.pwd !== ruleForm.repwd) return new Error("Two inputs don't match!");
  else return true;
};

const rules = reactive<FormRules>({
  name: [
    { required: true, message: 'Please input your name', trigger: 'blur' },
    { min: 5, max: 10, message: 'Length should be 5 to 10', trigger: 'blur' },
  ],
  pwd: [
    { required: true, message: 'Please input your password', trigger: 'blur' },
    { min: 8, max: 30, message: 'Length should be 8 to 30', trigger: 'blur' },
  ],
  repwd: [
    { required: true, message: 'Please repeat your password', trigger: 'blur' },
    { validator: repwdVld, trigger: 'blur' },
  ],
  code: [
    { required: true, message: 'Please input the code', trigger: 'blur' },
    { len: 4, message: "The code's length should be 4", trigger: 'blur' },
  ],
});

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

const setCodeSvg = (data: string) => {
  const node = document.createElement('el-form-item');
  node.innerHTML = data;
  // const wrapper = document.querySelector('.wrapper');
  const buttonNode = document.querySelector('.button');
  const parenNode = buttonNode?.parentNode;
  if (buttonNode && parenNode) parenNode.insertBefore(node, buttonNode);
};

const handleRegister = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  else {
    formEl.validate((valid) => {
      if (valid) {
        let data: registerType = { name: ruleForm.name, pwd: ruleForm.pwd, code: ruleForm.code };
        registerApi(data).then((res) => {
          let token = res.token;
          sessionStorage.setItem('token', token);
          router.push('/');
        });
      } else {
        return;
      }
    });
  }
};

getCodeApi().then((res) => {
  setCodeSvg(res.svg);
});
</script>

<template>
  <el-text style="display: block; margin-bottom: 10px">注&nbsp;&nbsp;册</el-text>
  <div class="wrapper">
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="80px">
      <el-form-item label="Name" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="pwd">
        <el-input v-model="ruleForm.pwd"></el-input>
      </el-form-item>
      <el-form-item label="Repeat" prop="repwd">
        <el-input v-model="ruleForm.repwd"></el-input>
      </el-form-item>
      <el-form-item label="Code" prop="code" class="code">
        <el-input v-model="ruleForm.code"></el-input>
      </el-form-item>
      <el-form-item class="button">
        <div>
          <el-button type="primary" @click="handleRegister(ruleFormRef)">确 定</el-button>
          <el-button @click="resetForm(ruleFormRef)">取 消</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
