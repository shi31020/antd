import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Modal, Row, Col, Typography, Table, Space, Popconfirm, message } from 'antd';
import { useModel } from '@umijs/max';
import { getCourseInfo, submitCourseApplication, fetchMyCourses, updateCourse, deleteCourse } from '@/services/ant-design-pro/api';

const { Text } = Typography;

const CourseManagement = () => {
  const [visible, setVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [courseInfo, setCourseInfo] = useState<API.CourseInfo>({ name: '', credit: 0 });
  const [courses, setCourses] = useState<API.CourseData[]>([]);
  const [editingCourse, setEditingCourse] = useState<API.CourseData | null>(null);
  const { initialState } = useModel('@@initialState');
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  const fetchCourses = async () => {
    const result = await fetchMyCourses();
    if (result.success && Array.isArray(result.data)) {
      setCourses(result.data.map((course: any) => ({
        ID: course.ID,
        CID: course.CID,
        name: course.name,
        TimeSlot: course.TimeSlot,
        Capacity: course.Capacity,
        isApproved: course.isApproved,
      })));
    } else {
      setCourses([]);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleOpenModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleEditCancel = () => {
    setEditVisible(false);
  };

  const handleCourseNumberChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const courseNumber = e.target.value;
    if (courseNumber) {
      const response = await getCourseInfo(courseNumber);
      if (response.success) {
        setCourseInfo(response.data);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await submitCourseApplication({
        CID: values.courseNumber,
        TID: initialState?.currentUser?.userid || '',
        TimeSlot: values.timeSlot,
        Capacity: values.capacity,
      });
      setVisible(false);
      form.resetFields();
      fetchCourses();
    } catch (error) {
      console.error('Failed to submit application:', error);
    }
  };

  const handleEditSubmit = async () => {
    try {
      const values = await editForm.validateFields();
      if (editingCourse) {
        if (values.timeSlot === editingCourse.TimeSlot && values.capacity === editingCourse.Capacity) {
          message.warning('开课时间和容量均未更改');
          return;
        }
        await updateCourse({
          ...editingCourse,
          TimeSlot: values.timeSlot,
          Capacity: values.capacity,
        });
        setEditVisible(false);
        editForm.resetFields();
        fetchCourses();
      }
    } catch (error) {
      console.error('Failed to update course:', error);
    }
  };

  const handleDelete = async (courseId: number) => {
    try {
      await deleteCourse(courseId);
      message.success('课程删除成功');
      fetchCourses();
    } catch (error) {
      console.error('Failed to delete course:', error);
    }
  };

  const columns = [
    {
      title: '课程号',
      dataIndex: 'CID',
      key: 'CID',
    },
    {
      title: '课程名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '上课时间',
      dataIndex: 'TimeSlot',
      key: 'TimeSlot',
    },
    {
      title: '容量',
      dataIndex: 'Capacity',
      key: 'Capacity',
    },
    {
      title: '是否已审核',
      dataIndex: 'isApproved',
      key: 'isApproved',
      render: (text: boolean) => (text ? '已审核' : '未审核'),
    },
    {
      title: '操作',
      key: 'action',
      render: (text: any, record: API.CourseData) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              setEditingCourse(record);
              setEditVisible(true);
              editForm.setFieldsValue({
                timeSlot: record.TimeSlot,
                capacity: record.Capacity,
              });
            }}
          >
            修改
          </Button>
          <Popconfirm
            title="确定删除该课程吗？"
            onConfirm={() => handleDelete(record.ID)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="primary" danger>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={handleOpenModal}>
        开课申请
      </Button>
      <Modal
        title="开课申请"
        visible={visible}
        onCancel={handleCancel}
        onOk={handleSubmit}
      >
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="courseNumber"
                label="课程号"
                rules={[{ required: true, message: '请输入课程号' }]}
              >
                <Input onBlur={handleCourseNumberChange} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="课程名称">
                <Text>{courseInfo.name}</Text>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="绩点">
                <Text>{courseInfo.credit}</Text>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="timeSlot"
                label="开课时间"
                rules={[{ required: true, message: '请输入开课时间' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="capacity"
                label="容量"
                rules={[{ required: true, message: '请输入容量' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
      <Table columns={columns} dataSource={courses} rowKey="ID" />
      <Modal
        title="修改课程"
        visible={editVisible}
        onCancel={handleEditCancel}
        onOk={handleEditSubmit}
      >
        <Form form={editForm} layout="vertical">
          <Form.Item
            name="timeSlot"
            label="开课时间"
            rules={[{ required: true, message: '请输入开课时间' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="capacity"
            label="容量"
            rules={[{ required: true, message: '请输入容量' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CourseManagement;
