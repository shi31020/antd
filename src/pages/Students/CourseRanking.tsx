import React, { useState, useEffect } from 'react';
import { ProTable } from '@ant-design/pro-components';
import { fetchCourseRanking } from '@/services/ant-design-pro/api';
import { message } from 'antd';

const columns = [
  { title: '课程号', dataIndex: 'CID', key: 'CID' },
  { title: '课程名称', dataIndex: 'CourseName', key: 'CourseName' },
  { title: '教师名称', dataIndex: 'TName', key: 'TName' },
  { title: '上课时间', dataIndex: 'TimeSlot', key: 'TimeSlot' },
  { title: '容量', dataIndex: 'Capacity', key: 'Capacity' },
  { title: '排名', dataIndex: 'Ranking', key: 'Ranking' },
  { title: '选课人数', dataIndex: 'EnrollmentCount', key: 'EnrollmentCount' },
];

export default () => {
  const [dataSource, setDataSource] = useState<API.CourseRanking[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchRanking = async () => {
    try {
      const response = await fetchCourseRanking();
      if (response.success) {
        setDataSource(response.data);
        message.info('加载选课排名完成');
      } else {
        message.error('加载选课排名失败');
      }
    } catch (error) {
      message.error('加载选课排名失败');
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchRanking().finally(() => setLoading(false));
  }, []);

  return (
    <ProTable<API.CourseRanking>
      columns={columns}
      dataSource={dataSource}
      rowKey={(record) => record.CID}
      loading={loading}
      search={false} // 禁用 ProTable 默认查询表单
    />
  );
};
