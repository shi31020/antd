import React, { useState, useRef } from 'react';
import { ProTable, ModalForm, ProFormText, ProColumns, ProFormSelect } from '@ant-design/pro-components';
import { Button, message } from 'antd';
import { queryLessons, updateLesson } from '@/services/ant-design-pro/api';

const ModifyLesson: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentLesson, setCurrentLesson] = useState<API.Lesson | null>(null);
  const tableRef = useRef<any>(null); // 使用 useRef 替代 useState

  const handleUpdate = async (values: API.Lesson) => {
    if (
      values.CID === currentLesson?.CID &&
      values.CourseName === currentLesson?.CourseName &&
      values.DName === currentLesson?.DName &&
      values.Credits === currentLesson?.Credits
    ) {
      message.warning('未检测到修改');
      return;
    }

    const response = await updateLesson(values);
    if (response) {
      message.success('修改成功');
      setModalVisible(false);
      tableRef.current?.reload(); // 提交更改后重新进行一次查询
    }
  };

  const columns: ProColumns<API.Lesson, 'text'>[] = [
    {
      title: '课程号',
      dataIndex: 'CID',
    },
    {
      title: '课程名称',
      dataIndex: 'CourseName',
    },
    {
      title: '开设院系',
      dataIndex: 'DName',
    },
    {
      title: '学分',
      dataIndex: 'Credits',
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record) => (
        <Button
          key="ModifyButton"
          type="primary"
          onClick={() => {
            setCurrentLesson(record);  // 设置当前选中的课程
            setModalVisible(true);     // 打开修改课程的模态框
          }}
        >
          修改
        </Button>
      ),
    },
  ];


  return (
    <>
      <ProTable<API.Lesson>
        headerTitle="查询课程"
        actionRef={tableRef} // 设置表格引用
        request={async (params) => {
          const response = await queryLessons(params as API.LessonQueryParams);
          return {
            data: response,
            success: true,
          };
        }}
        columns={columns}
        rowKey="CID"
        search={{
          labelWidth: 'auto',
          collapsed: false, // 禁用高级选项展开
          collapseRender: false, // 隐藏展开按钮
        }}
      />
      <ModalForm
        title="修改课程信息"
        visible={modalVisible}
        onVisibleChange={setModalVisible}
        onFinish={handleUpdate}
        initialValues={currentLesson || {}}
      >
        <ProFormText name="CID" label="课程号" disabled />
        <ProFormText name="CourseName" label="课程名称" />
        <ProFormSelect
            name="DName"
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
        <ProFormText name="Credits" label="学分" />
      </ModalForm>
    </>
  );
};

export default ModifyLesson;
