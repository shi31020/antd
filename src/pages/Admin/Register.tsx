import React, { useState, useEffect } from 'react';
import { register, fetchDepartments } from '@/services/ant-design-pro/api'; // API 请求
import { Form, Input, Select, Checkbox, Button, Row, Col, message, Radio } from 'antd';

const { Option } = Select;

const RegisterForm: React.FC = () => {
  const [identity, setIdentity] = useState<'student' | 'teacher'>('student'); // 身份选择
  const [, setIsAdmin] = useState<boolean>(false); // 是否管理员
  const [departments, setDepartments] = useState<string[]>([]); // 院系列表

  useEffect(() => {
    // 获取院系列表
    const loadDepartments = async () => {
      try {
        const response = await fetchDepartments();
        setDepartments(response || []);
      } catch (error) {
        console.error('获取院系列表失败', error);
      }
    };
    loadDepartments();
  }, []);

  // 提交表单
  const handleSubmit = async (values: any) => {
    try {
      await register(values);
      message.success('注册成功!');
    } catch (error) {
      message.error('注册失败，请重试');
    }
  };

  return (
    <div>
      <h2>用户注册</h2>
      <Form onFinish={handleSubmit} layout="vertical">
        {/* 身份选择 */}
        <Form.Item label="身份" name="identity" initialValue={identity}>
          <Radio.Group onChange={(e) => setIdentity(e.target.value)}>
            <Radio value="student">学生</Radio>
            <Radio value="teacher">老师</Radio>
          </Radio.Group>
        </Form.Item>

        {/* 是否管理员 */}
        <Form.Item name="isAdmin" valuePropName="checked">
          <Checkbox onChange={(e) => setIsAdmin(e.target.checked)}>是否管理员</Checkbox>
        </Form.Item>

        {/* 根据身份动态显示表单项 */}
        {identity === 'student' ? (
          <>
            <Form.Item
              label="学号"
              name="studentId"
              rules={[{ required: true, message: '请输入学号' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="姓名" name="name" rules={[{ required: true, message: '请输入姓名' }]}>
              <Input />
            </Form.Item>
            <Form.Item
              label="入学年份"
              name="enrollmentYear"
              rules={[{ required: true, message: '请输入入学年份' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="性别"
              name="gender"
              rules={[{ required: true, message: '请选择性别' }]}
            >
              <Select>
                <Option value="male">男</Option>
                <Option value="female">女</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="院系"
              name="department"
              rules={[{ required: true, message: '请选择院系' }]}
            >
              <Select
                showSearch
                optionFilterProp="children"
                onChange={(value) => console.log(value)}
              >
                {departments.map((department) => (
                  <Option key={department} value={department}>
                    {department}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </>
        ) : (
          <>
            <Form.Item
              label="教师号"
              name="teacherId"
              rules={[{ required: true, message: '请输入教师号' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="姓名" name="name" rules={[{ required: true, message: '请输入姓名' }]}>
              <Input />
            </Form.Item>
            <Form.Item
              label="院系"
              name="department"
              rules={[{ required: true, message: '请选择院系' }]}
            >
              <Select
                showSearch
                optionFilterProp="children"
                onChange={(value) => console.log(value)}
              >
                {departments.map((department) => (
                  <Option key={department} value={department}>
                    {department}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="性别"
              name="gender"
              rules={[{ required: true, message: '请选择性别' }]}
            >
              <Select>
                <Option value="male">男</Option>
                <Option value="female">女</Option>
              </Select>
            </Form.Item>
          </>
        )}

        {/* 密码输入项 */}
        <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
          <Input.Password />
        </Form.Item>

        {/* 确认密码 */}
        <Form.Item
          label="确认密码"
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            { required: true, message: '请确认密码' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('密码不一致'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Row justify="end">
          <Col>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default RegisterForm;
