import React, { useState, useEffect } from 'react';
import { Button, Popconfirm, message } from 'antd';
import { ProTable } from '@ant-design/pro-components';
import { fetchClasses, deleteClass } from '@/services/ant-design-pro/api';

const handleDeleteClass = async (ID: number, fetchCourses: () => void) => {
  try {
    const response = await deleteClass(ID);
    if (response.success) {
      message.success('删除成功');
      // 重新加载课程数据
      fetchCourses();
    } else {
      message.error('删除失败');
    }
  } catch (error) {
    message.error('删除失败');
  }
};

const columns = (fetchClasses: () => void) => [
  { title: '课程号', dataIndex: 'CID', key: 'CID' },
  { title: '课程名称', dataIndex: 'CourseName', key: 'CourseName' },
  { title: '教师号', dataIndex: 'TID', key: 'TID' },
  { title: '教师名称', dataIndex: 'TName', key: 'TName' },
  { title: '上课时间', dataIndex: 'TimeSlot', key: 'TimeSlot' },
  { title: '容量', dataIndex: 'Capacity', key: 'Capacity' },
  {
    title: '操作',
    key: 'action',
    render: (text: any, record: any) => (
      <Popconfirm
        title="确定删除这门课程吗？"
        onConfirm={() => handleDeleteClass(record.ID, fetchClasses)}
        okText="确定"
        cancelText="取消"
      >
        <Button type="primary" danger>删除</Button>
      </Popconfirm>
    ),
  },
];

export default () => {
  const [dataSource, setDataSource] = useState<API.CourseData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCourses = async () => {
    try {
      const response = await fetchClasses();
      if (response.success) {
        setDataSource(response.data);
        message.info('加载课程完成');
      } else {
        message.error('加载课程失败');
      }
    } catch (error) {
      message.error('加载课程失败');
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchCourses().finally(() => setLoading(false));
  }, []);

  return (
    <ProTable<API.CourseData>
      columns={columns(fetchCourses)}
      dataSource={dataSource}
      rowKey={(record) => record.ID}
      loading={loading}
      search={false} // 禁用 ProTable 默认查询表单
    />
  );
};
