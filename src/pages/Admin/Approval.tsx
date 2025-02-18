import React, { useRef } from 'react';
import { Button, message } from 'antd';
import { ProTable, ActionType } from '@ant-design/pro-components';
import { fetchAwaitingApprovalClasses, approveCourse } from '@/services/ant-design-pro/api';

const Approval: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const handleApprove = async (courseId: number) => {
    const hide = message.loading('正在批准...');
    try {
      await approveCourse(courseId);
      hide();
      message.success('批准成功');
      actionRef.current?.reload();
    } catch (error) {
      hide();
      message.error('批准失败，请重试');
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
      dataIndex: 'CName',
      key: 'CName',
    },
    {
      title: '教师号',
      dataIndex: 'TID',
      key: 'TID',
    },
    {
      title: '教师名称',
      dataIndex: 'TName',
      key: 'TName',
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
      title: '绩点',
      dataIndex: 'Credits',
      key: 'Credits',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: any) => (
        <Button type="primary" onClick={() => handleApprove(record.ID)}>
          批准
        </Button>
      ),
    },
  ];

  return (
    <ProTable
      headerTitle="未审核课程"
      actionRef={actionRef}
      rowKey="id"
      request={async () => {
        const response = await fetchAwaitingApprovalClasses();
        const data = Array.isArray(response.data) ? response.data : [];
        return {
          data: data.map((row: any) => ({
            ID: row.ID,
            CID: row.CID,
            CName: row.CName,
            TID: row.TID,
            TName: row.TName,
            TimeSlot: row.TimeSlot,
            Capacity: row.Capacity,
            Credits: row.Credits,
          })),
          success: response.success,
        };
      }}
      columns={columns}
      search={false}
    />
  );
};

export default Approval;
