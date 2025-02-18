import React, { useEffect, useState } from 'react';
import { ProTable } from '@ant-design/pro-components';
import { queryStudents } from '@/services/ant-design-pro/api';
import { message, Empty } from 'antd';

const Marking = () => {
  const currentCourse = JSON.parse(localStorage.getItem('currentCourse') || '{}');
  const [students, setStudents] = useState<API.Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const response = await queryStudents(currentCourse.CID as string);
        if (response.success) {
          setStudents(response.data);
        } else {
          message.error(response.message || '查询学生失败');
        }
      } catch (error: any) {
        message.error(error.message || '查询学生失败');
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, [currentCourse.CID]);

  const columns = [
    {
      title: '学号',
      dataIndex: 'SNO',
      key: 'SNO',
    },
    {
      title: '姓名',
      dataIndex: 'SName',
      key: 'SName',
    },
    {
      title: '性别',
      dataIndex: 'Gender',
      key: 'Gender',
    },
    {
      title: '年级',
      dataIndex: 'Admission',
      key: 'Admission',
      render: (dom: React.ReactNode, entity: API.Student) => `${new Date().getFullYear() - entity.Admission}年级`,
    },
    {
      title: '专业',
      dataIndex: 'Major',
      key: 'Major',
    },
  ];

  return (
    <div>
      <h1>课程详情</h1>
      {students.length === 0 && !loading ? (
        <Empty description="暂无学生选课" />
      ) : (
        <ProTable columns={columns} dataSource={students} rowKey="SNO" search={false} loading={loading} />
      )}
    </div>
  );
};

export default Marking;
