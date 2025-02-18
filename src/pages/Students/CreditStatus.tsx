import React, { useState, useEffect } from 'react';
import { ProTable } from '@ant-design/pro-components';
import { checkScheme } from '@/services/ant-design-pro/api';
import { message } from 'antd';

const columns = [
  { title: '课程号', dataIndex: 'CID', key: 'CID' },
  { title: '课程名称', dataIndex: 'CourseName', key: 'CourseName' },
  { title: '是否完成', dataIndex: 'IsCompleted', key: 'IsCompleted', render: (dom: React.ReactNode, entity: API.CreditStatus) => (entity.IsCompleted ? '是' : '否') },
  { title: '绩点', dataIndex: 'GRADE', key: 'GRADE' },
];

export default () => {
  const [dataSource, setDataSource] = useState<API.CreditStatus[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCreditStatus = async () => {
    setLoading(true);
    try {
      const response = await checkScheme();
      if (response.success) {
        setDataSource(response.data);
        message.info('加载学分完成情况成功');
      } else {
        message.error('加载学分完成情况失败');
      }
    } catch (error) {
      message.error('加载学分完成情况失败');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCreditStatus();
  }, []);

  return (
    <ProTable<API.CreditStatus>
      columns={columns}
      dataSource={dataSource}
      rowKey={(record) => record.CID}
      loading={loading}
      search={false} // 禁用 ProTable 默认查询表单
    />
  );
};
