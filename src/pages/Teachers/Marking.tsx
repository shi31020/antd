import React, { useEffect, useState } from 'react';
import { ProTable } from '@ant-design/pro-components';
import { queryStudents, updateGrades } from '@/services/ant-design-pro/api';
import { message, Empty, Input, Button } from 'antd';

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

  const handleGradeChange = (value: string, record: API.Student, field: string) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.SNO === record.SNO ? { ...student, [field]: value } : student
      )
    );
  };

  const handleSubmitGrades = async () => {
    try {
      await updateGrades(students);
      message.success('成绩提交成功');
    } catch (error) {
      message.error('成绩提交失败');
    }
  };

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
      render: (_dom: React.ReactNode, entity: API.Student) => `${new Date().getFullYear() - entity.Admission}年级`,
    },
    {
      title: '专业',
      dataIndex: 'Major',
      key: 'Major',
    },
    {
      title: '平时成绩',
      dataIndex: 'RegularGrade',
      key: 'RegularGrade',
      render: (_dom: React.ReactNode, entity: API.Student) => (
        <Input
          defaultValue={entity.RegularGrade}
          onChange={(e) => handleGradeChange(e.target.value, entity, 'RegularGrade')}
        />
      ),
    },
    {
      title: '期末成绩',
      dataIndex: 'FinalGrade',
      key: 'FinalGrade',
      render: (_dom: React.ReactNode, entity: API.Student) => (
        <Input
          defaultValue={entity.FinalGrade}
          onChange={(e) => handleGradeChange(e.target.value, entity, 'FinalGrade')}
        />
      ),
    },
  ];

  return (
    <div>
      <h1>课程详情</h1>
      {students.length === 0 && !loading ? (
        <Empty description="暂无学生选课" />
      ) : (
        <>
          <ProTable columns={columns} dataSource={students} rowKey="SNO" search={false} loading={loading} />
          <Button type="primary" onClick={handleSubmitGrades} style={{ marginTop: 16 }}>
            提交成绩
          </Button>
        </>
      )}
    </div>
  );
};

export default Marking;
