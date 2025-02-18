import React, { useState } from 'react';
import { Button, message } from 'antd';
import { ProTable, QueryFilter, ProFormText, ProFormDigit } from '@ant-design/pro-components';
import { queryClasses, selectCourse } from '@/services/ant-design-pro/api';

const handleSelectCourse = async (record: any) => {
  try {
    const response = await selectCourse({ CID: record.CID , ID:record.ID });
    if (response.success) {
      message.success('选课成功');
    } else {
      message.error('选课失败');
    }
  } catch (error) {
    message.error('选课失败');
  }
};

const columns = [
  {
    title: '操作',
    key: 'action',
    render: (text: any, record: any) => (
      <Button onClick={() => handleSelectCourse(record)}>选课</Button>
    ),
  },
];

export default () => {
  const [dataSource, setDataSource] = useState<API.ClassQuery[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 20, total: 0 });

  // 处理查询
  const handleQuery = async (values: API.ClassQuery) => {
    setLoading(true);
    try {
      const result = await queryClasses(values);
      setDataSource(result || []);
      setPagination((prev) => ({ ...prev, total: result.length }));
    } catch (error) {
      console.error('查询失败:', error);
    }
    setLoading(false);
  };

  return (
    <div>
      {/* 查询表单 */}
      <QueryFilter onFinish={handleQuery} collapsed={false} defaultColsNumber={9}>
        <ProFormText name="CID" label="课程号" />
        <ProFormText name="CName" label="课程名称" />
        <ProFormText name="TID" label="教师号" />
        <ProFormText name="TName" label="教师名称" />
        <ProFormText name="TimeSlot" label="上课时间" />
        <ProFormDigit name="Capacity" label="班级容量" min={1} />
      </QueryFilter>

      {/* 课程数据表 */}
      <ProTable<API.ClassQuery>
        columns={[
          { title: '课程号', dataIndex: 'CID', key: 'CID' },
          { title: '课程名称', dataIndex: 'CName', key: 'CName' },
          { title: '教师号', dataIndex: 'TID', key: 'TID' },
          { title: '教师名称', dataIndex: 'TName', key: 'TName' },
          { title: '上课时间', dataIndex: 'TimeSlot', key: 'TimeSlot' },
          { title: '容量', dataIndex: 'Capacity', key: 'Capacity' },
          ...columns,
        ]}
        dataSource={dataSource}
        rowKey={(record) => `${record.CID}-${record.TID}`}
        loading={loading}
        pagination={{
          ...pagination,
          onChange: (page, pageSize) => setPagination({ ...pagination, current: page, pageSize }),
        }}
        search={false} // 禁用 ProTable 默认查询表单
      />
    </div>
  );
};
