import BaseResponse from 'models/BaseResponse';
import { UserRequest, UserResponse } from 'models/User';
import { OfficeResponse } from 'models/Office';
import { DepartmentResponse } from 'models/Department';
import { JobTypeResponse } from 'models/JobType';
import { JobLevelResponse } from 'models/JobLevel';
import { JobTitleResponse } from 'models/JobTitle';

export interface EmployeeResponse extends BaseResponse {
  user: UserResponse;
  office: OfficeResponse;
  department: DepartmentResponse;
  jobType: JobTypeResponse;
  jobLevel: JobLevelResponse;
  jobTitle: JobTitleResponse;
}

export interface EmployeeRequest {
  user: UserRequest;
  officeId: number;
  departmentId: number;
  jobTypeId: number;
  jobLevelId: number;
  jobTitleId: number;
}
