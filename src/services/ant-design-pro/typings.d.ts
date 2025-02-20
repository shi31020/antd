declare namespace API {
  type CurrentUser = {
    name?: string;
    userid?: string;
    access?: string[];
  };

  type LoginParams = {
    id?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type LoginResult = {
    success?: boolean;
    message?: string;
    data?: {
      id?: string;
      access?: string[];
    };
  };

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type ruleParams = {
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  };

  type RegisterData = {
    identity: 'student' | 'teacher'; // 用户身份
    isAdmin: boolean; // 是否管理员
    name: string; // 姓名
    gender: 'male' | 'female'; // 性别
    department: string; // 院系
    password: string; // 密码

    // 针对身份不同，附加字段
    studentId?: string; // 学生ID，学生专用
    enrollmentYear?: string; // 入学年份，学生专用
    teacherId?: string; // 教师ID，教师专用
    title?: string; // 职称，教师专用
    major?: string; // 专业，学生专用
    gpa?: number; // 绩点，学生专用
  };

  type ClassQuery = {
    ID?: string;
    CID?: string; // 课程号（可选）
    CName?: string;
    TID?: string; // 教师号（可选）
    TName?: string;
    TimeSlot?: string; // 上课时间（可选）
    Capacity?: number; // 容量（可选）
  };

  type ClassData =  {
    ID: number;
    CID: string;
    TID: string;
    TimeSlot: string | null;
    Capacity: number | null;
    name: string; // 课程名称
    teacherName: string; // 教师名称
    gpa: number; // 绩点
  }

  type ApproveAwaitResponse =  {
    success: boolean;
    data: ClassData[];
  }

  type CourseInfo = {
    name: string;
    credit: number;
  };

  type CourseApplication = {
    CID: string;
    TID: string;
    TimeSlot: string;
    Capacity: number;
  };

  type CourseData = {
    ID: number;
    CID: string;
    name: string;
    TimeSlot: string;
    Capacity: number;
    isApproved: boolean;
  };

  type LessonQueryParams = {
    CID?: string;
    CourseName?: string;
    OfferingDepartment?: string;
    Credits?: number;
  };

  type Lesson = {
    CID: string;
    CourseName: string;
    Credits: number;
    DName: string;
  };

  type gradeUpdateRes = {
    success: boolean;
    message?: string;
  };

  type Student = {
    FinalGrade: string | number | readonly string[] | undefined;
    RegularGrade: string | number | readonly string[] | undefined;
    SNO: string;
    SName: string;
    Gender: string;
    GPA: number;
    Admission: number;
    Major: string;
    Grade: number;
  };

  type studentQueryResponse = {
    success: boolean;
    message: string;
    data: Student[];
  };

  type CourseRanking = {
    CID: string;
    CourseName: string;
    TID: string;
    TName: string;
    StudentCount: number;
  };

  type CreditStatus = {
    CID: string;
    CourseName: string;
    IsCompleted: boolean;
    GRADE: number | null;
  };
}
