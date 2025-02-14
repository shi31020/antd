import React, { useState, useRef } from 'react';
import {
  ProForm,
  ProFormText,
  ProFormRadio,
  ProFormDatePicker,
  ProFormDependency,
  ProFormSelect,
  ProFormDigit,
  ProFormInstance,
} from '@ant-design/pro-components';
import { Modal, Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { register } from '@/services/ant-design-pro/api'; // 导入register函数

const RegisterModalForm: React.FC = () => {
  const formRef = useRef<ProFormInstance>();
  const [visible, setVisible] = useState(false); // 控制Modal的显示和隐藏

  // 提交表单
  const handleFinish = async (values: API.RegisterData) => {
    const response = await register(values);
    if (response.status === 200) {
      formRef.current?.resetFields();
      message.success('注册成功');
      setVisible(false); // 提交成功后关闭Modal
      return true;
    } else {
      message.error(response.message);
      return false;
    }
  };

  // 打开Modal
  const openModal = () => setVisible(true);

  // 关闭Modal
  const closeModal = () => setVisible(false);

  // 密码验证规则
  const passwordRules = [
    {
      required: true,
      message: '请输入密码',
    },
    {
      pattern:
        /^(?![A-Za-z]+$)(?![A-Z\d]+$)(?![A-Z\W]+$)(?![a-z\d]+$)(?![a-z\W]+$)(?![\d\W]+$)\S{8,}$/,
      message:
        '密码必须包含数字、小写字母、大写字母和特殊符号（!@#$%^&*）中的至少三种，且长度大于 8 个字符',
    },
  ];

  return (
    <>
      {/* 打开Modal的按钮 */}
      <Button
        type="primary"
        onClick={openModal}
        style={{
          width: 'auto', // 设置按钮的宽度为自动
          padding: '6px 16px', // 设置内边距以缩小按钮
        }}
      >
        <PlusOutlined />
        打开注册表单
      </Button>

      <Modal open={visible} title="用户注册" onCancel={closeModal} footer={null} width={600}>
        <ProForm
          onFinish={handleFinish} // 使用handleFinish函数提交表单
          layout="vertical" // 设置表单布局
          formRef={formRef}
        >
          {/* 第一部分: 基本信息 */}
          <ProFormRadio.Group
            name="identity"
            label="身份"
            options={[
              { label: '学生', value: 'student' },
              { label: '教师', value: 'teacher' },
            ]}
            rules={[{ required: true, message: '请选择身份' }]}
          />

          <ProFormText
            name="name"
            label="姓名"
            rules={[{ required: true, message: '请输入姓名' }]}
            placeholder="请输入姓名"
          />

          <ProFormRadio.Group
            name="gender"
            label="性别"
            options={[
              { label: '男', value: 'male' },
              { label: '女', value: 'female' },
            ]}
            rules={[{ required: true, message: '请选择性别' }]}
          />

          {/* 院系选择（带搜索框） */}
          <ProFormSelect
            name="department"
            label="院系"
            rules={[{ required: true, message: '请选择院系' }]}
            request={async () => {
              try {
                const response = await fetch('/api/departments'); // 请求院系数据的 API
                const result = await response.json(); // 解析返回的 JSON 数据
                if (result.success) {
                  return result.data.map((dept: string) => ({
                    label: dept, // 中文院系名称作为 label 和 value
                    value: dept,
                  }));
                } else {
                  message.error('获取院系数据失败');
                  return [];
                }
              } catch (error) {
                message.error('获取院系数据失败');
                return [];
              }
            }}
            showSearch // 启用搜索功能
          />

          {/* 第二部分: 身份相关信息 */}
          <ProFormDependency name={['identity']}>
            {({ identity }) => {
              return (
                <>
                  {identity === 'student' && (
                    <>
                      <ProFormText
                        name="major"
                        label="专业"
                        rules={[{ required: true, message: '请输入专业' }]}
                      />
                      <ProFormText
                        name="studentId"
                        label="学生 ID"
                        rules={[
                          { required: true, message: '请输入学生 ID' },
                          { pattern: /^2\d{7}$/, message: '学生 ID 格式错误' },
                        ]}
                      />
                      <ProFormDatePicker
                        name="enrollmentYear"
                        label="入学年份"
                        rules={[{ required: true, message: '请选择入学年份' }]}
                        fieldProps={{
                          picker: 'year', // 仅显示年份选择器
                          format: 'YYYY', // 确保返回的数据为 "YYYY" 格式
                        }}
                      />
                      <ProFormDigit name="GPA" label="绩点" />
                    </>
                  )}

                  {identity === 'teacher' && (
                    <>
                      <ProFormText
                        name="teacherId"
                        label="教师 ID"
                        rules={[
                          { required: true, message: '请输入教职工 ID' },
                          { pattern: /^1\d{7}$/, message: '教职工 ID 必须为8位数字' },
                        ]}
                      />
                      <ProFormText name="title" label="职称" />
                    </>
                  )}

                  <ProFormText.Password
                    name="password"
                    label="密码"
                    rules={passwordRules}
                    placeholder="请输入密码"
                  />
                  <ProFormText.Password
                    name="confirmPassword"
                    label="确认密码"
                    rules={[
                      { required: true, message: '请再次输入密码' },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('两次输入的密码不一致'));
                        },
                      }),
                    ]}
                    placeholder="请确认密码"
                  />
                </>
              );
            }}
          </ProFormDependency>

          {/* 是否管理员 */}
          <ProFormRadio.Group
            name="isAdmin"
            label="是否为管理员"
            options={[
              { label: '是', value: true },
              { label: '否', value: false },
            ]}
            rules={[{ required: true, message: '请选择是否为管理员' }]}
          />
        </ProForm>
      </Modal>
    </>
  );
};

export default RegisterModalForm;
