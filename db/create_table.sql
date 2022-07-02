SET NAMES utf8mb4;

SET FOREIGN_KEY_CHECKS=0;
-- CREATE FUNCTION UPDATE_TIMESTAMP_FUNC

create or replace function update_timestamp_func() returns trigger as
$$
begin
  new.updated_on = current_timestamp;
  return new;
end
$$
language plpgsql;

DROP TABLE IF EXISTS public.user_info;
CREATE TABLE IF NOT EXISTS public.user_info
(
    id smallserial NOT NULL,
    created_on timestamp with time zone NOT NULL DEFAULT NOW(),
    updated_on timestamp with time zone NOT NULL DEFAULT NOW(),
    status smallint NOT NULL,
    op_user int ,
    user_name character varying(50),
    real_name character varying(50),
    password character varying(50) NOT NULL,
    phone character varying(50) NOT NULL,
    email character varying(100),
    gender smallint,
    type integer NOT NULL,
    perf_level_id smallint,
    PRIMARY KEY (id)
);

COMMENT ON COLUMN public.user_info.status IS '状态（0-停用，1-可用）';
COMMENT ON COLUMN public.user_info.user_name IS '用户名称';
COMMENT ON COLUMN public.user_info.real_name IS '真实姓名';
COMMENT ON COLUMN public.user_info.password IS '密码';
COMMENT ON COLUMN public.user_info.phone IS '联系方式';
COMMENT ON COLUMN public.user_info.email IS '邮箱';
COMMENT ON COLUMN public.user_info.gender IS '性别（0-女，1-男）';
COMMENT ON COLUMN public.user_info.type IS '用户类型（99-超级管理员）';
COMMENT ON COLUMN public.user_info.perf_level_id IS '绩效提成ID';

create trigger user_info_upt before update on user_info for each row execute procedure update_timestamp_func();
select setval('user_info_id_seq',1000,false);

CREATE UNIQUE INDEX uk_user_info_phone ON user_info(phone);

INSERT INTO user_info (status , user_name , real_name , password , phone , email , gender , type)
VALUES (1 , '超级管理员' , '管理员' , 'E10ADC3949BA59ABBE56E057F20F883E' , '19999999999' , '1234567@qq.com' , 0 , 99 )
on conflict(phone) DO NOTHING RETURNING id;

--CREATE TABLE app_info
CREATE TABLE IF NOT EXISTS public.app_info
(
    id smallserial NOT NULL,
    created_on timestamp with time zone NOT NULL DEFAULT NOW(),
    updated_on timestamp with time zone NOT NULL DEFAULT NOW(),
    status smallint NOT NULL,
    op_user int ,
    app_type smallint NOT NULL,
    device_type smallint NOT NULL,
    version character varying(20) NOT NULL,
    version_num smallint NOT NULL,
    min_version_num smallint NOT NULL,
    force_update smallint NOT NULL,
    url character varying(200) NOT NULL,
    remarks character varying(400),
    PRIMARY KEY (id)
);

COMMENT ON COLUMN public.app_info.status IS '状态(0:停用,1:启用)';
COMMENT ON COLUMN public.app_info.app_type IS 'app类型';
COMMENT ON COLUMN public.app_info.device_type IS '设备类型(1-安卓 2-苹果)';
COMMENT ON COLUMN public.app_info.version IS '版本号';
COMMENT ON COLUMN public.app_info.version_num IS '版本序号';
COMMENT ON COLUMN public.app_info.min_version_num IS '最小支持版本';
COMMENT ON COLUMN public.app_info.force_update IS '是否强制更新(0-不更新 1-更新)';
COMMENT ON COLUMN public.app_info.url IS '下载地址';
COMMENT ON COLUMN public.app_info.remarks IS '备注';

DROP TRIGGER IF EXISTS app_info_upt ON app_info;
create trigger app_info_upt before update on app_info for each row execute procedure update_timestamp_func();


--CREATE TABLE user_perf_level
CREATE TABLE IF NOT EXISTS public.user_perf_level
(
    "id" smallserial NOT NULL,
    "created_on" timestamp with time zone NOT NULL DEFAULT NOW(),
    "updated_on" timestamp with time zone NOT NULL DEFAULT NOW(),
    "status" smallint NOT NULL DEFAULT 1,
    "perf_name" character varying(50),
    "remark" character varying(50),
    "sale_ratio" decimal(12,2) NOT NULL DEFAULT 1,
    "deploy_ratio" decimal(12,2) NOT NULL DEFAULT 1,
    "check_ratio" decimal(12,2) NOT NULL DEFAULT 1,
    PRIMARY KEY (id)
);

COMMENT ON COLUMN public.user_perf_level.status IS '状态（0-停用，1-可用）';
COMMENT ON COLUMN public.user_perf_level.perf_name IS '绩效等级名称';
COMMENT ON COLUMN public.user_perf_level.remark IS '备注';
COMMENT ON COLUMN public.user_perf_level.sale_ratio IS '销售提成比列';
COMMENT ON COLUMN public.user_perf_level.deploy_ratio IS '施工提成比例';
COMMENT ON COLUMN public.user_perf_level.check_ratio IS '验收提成比例';

DROP TRIGGER IF EXISTS user_perf_level_upt ON user_perf_level;
create trigger user_perf_level_upt before update on user_perf_level for each row execute procedure update_timestamp_func();
select setval('user_perf_level_id_seq',100,false);


--CREATE TABLE user_type_menu
CREATE TABLE IF NOT EXISTS public.user_type_menu
(
    id smallserial NOT NULL,
    created_on timestamp with time zone NOT NULL DEFAULT NOW(),
    updated_on timestamp with time zone NOT NULL DEFAULT NOW(),
    status smallint NOT NULL DEFAULT 1,
    type_name character varying(50) NOT NULL,
    menu_list jsonb NOT NULL DEFAULT '{}',
    remarks character varying(400),
    PRIMARY KEY (id)
);
COMMENT ON COLUMN public.user_type_menu.status IS '状态';
COMMENT ON COLUMN public.user_type_menu.type_name IS '类型名称';
COMMENT ON COLUMN public.user_type_menu.menu_list IS '菜单列表';

DROP TRIGGER IF EXISTS user_type_menu_upt ON user_type_menu;
create trigger user_type_menu_upt before update on user_type_menu for each row execute procedure update_timestamp_func();
select setval(' user_type_menu_id_seq',1000,false);


--CREATE TABLE hr_student
CREATE TABLE IF NOT EXISTS public.hr_student
(
    id int NOT NULL,
    created_on timestamp with time zone NOT NULL DEFAULT NOW(),
    updated_on timestamp with time zone NOT NULL DEFAULT NOW(),
    status smallint NOT NULL DEFAULT 1,
    ksh character varying(20) NOT NULL,
    name character varying(10) NOT NULL,
    id_num character varying(20) NOT NULL,
    gender smallint  DEFAULT 1,
    birth int ,
    college_year int NOT NULL,
    college_name character varying(200) NOT NULL,
    major_name character varying(200),
    phones character varying(200),
    PRIMARY KEY (id)
);
COMMENT ON COLUMN public.hr_student.college_year IS '入学年份';

DROP TRIGGER IF EXISTS hr_student_upt ON hr_student;
create trigger hr_student_upt before update on hr_student for each row execute procedure update_timestamp_func();
select setval(' hr_student_id_seq',1000,false);


--CREATE TABLE hr_employee
CREATE TABLE IF NOT EXISTS public.hr_employee
(
    id int NOT NULL,
    created_on timestamp with time zone NOT NULL DEFAULT NOW(),
    updated_on timestamp with time zone NOT NULL DEFAULT NOW(),
    status smallint NOT NULL DEFAULT 1,
    id_num character varying(50) NOT NULL,
    gender smallint  DEFAULT 1,
    birth int ,
    name character varying(50) NOT NULL,
    phone character varying(20),
    nation character varying(50) NOT NULL,
    grad_year int,
    college_name character varying(200),
    major_name character varying(200),
    degree character varying(20),
    company_name character varying(200),
    company_type smallint NOT NULL,
    pos_name character varying(200),
    pos_type smallint NOT NULL,
    remark character varying(200),
    PRIMARY KEY (id)
);
COMMENT ON COLUMN public.hr_employee.remark IS '备注';
COMMENT ON COLUMN public.hr_employee.id_num IS '身份证号';
COMMENT ON COLUMN public.hr_employee.nation IS '民族';
COMMENT ON COLUMN public.hr_employee.grad_year IS '毕业年份';
COMMENT ON COLUMN public.hr_employee.company_type IS '单位性质';
COMMENT ON COLUMN public.hr_employee.pos_name IS '职位名称';
COMMENT ON COLUMN public.hr_employee.pos_type IS '职称';

DROP TRIGGER IF EXISTS hr_employee_upt ON hr_employee;
create trigger hr_employee_upt before update on hr_employee for each row execute procedure update_timestamp_func();
select setval(' hr_employee_id_seq',1000,false);

--CREATE TABLE college_info
CREATE TABLE IF NOT EXISTS public.college_info
(
    id smallserial NOT NULL,
    created_on timestamp with time zone NOT NULL DEFAULT NOW(),
    updated_on timestamp with time zone NOT NULL DEFAULT NOW(),
    status smallint NOT NULL DEFAULT 1,
    college_name character varying(50) NOT NULL,
    college_locate character varying(50),
    college_owner character varying(50) ,
    college_degree character varying(50) ,
    high_level smallint NOT NULL DEFAULT 0,
    has_master smallint NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
);
COMMENT ON COLUMN public.college_info.college_locate IS '所在地';
COMMENT ON COLUMN public.college_info.college_owner IS '主管部门';
COMMENT ON COLUMN public.college_info.college_degree IS '学历层次';
COMMENT ON COLUMN public.college_info.high_level IS '双一流';
COMMENT ON COLUMN public.college_info.has_master IS '研究生院';

DROP TRIGGER IF EXISTS college_info_upt ON college_info;
create trigger college_info_upt before update on college_info for each row execute procedure update_timestamp_func();
select setval(' college_info_id_seq',1000,false);