<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';

const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  name: '',
  pwd: '',
  repwd: '',
});

const vldRepwd = () => {
  if (ruleForm.repwd !== ruleForm.pwd) return new Error("Two inputs don't match!");
  else return;
};

const rules = reactive<FormRules>({
  name: [
    { required: true, message: 'Please input your name', trigger: 'blur' },
    { min: 5, max: 10, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  pwd: [
    { required: true, message: 'Please input your password', trigger: 'blur' },
    { min: 8, max: 30, message: 'Length should be 8 to 10', trigger: 'blur' },
  ],
  repwd: [
    { required: true, message: 'Please input your password again', trigger: 'blur' },
    { validator: vldRepwd, trigger: 'blur' },
  ],
});

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<template>
  <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
    <el-form-item label="Name" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="Password" prop="pwd">
      <el-input v-model="ruleForm.pwd"></el-input>
    </el-form-item>
    <el-form-item label=" Repeat password" prop="repwd">
      <el-input v-model="ruleForm.repwd"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">Sign In</el-button>
      <el-button @click="resetForm(ruleFormRef)">Cancel</el-button>
    </el-form-item>
  </el-form>
</template>
