package com.electro.controller;

import com.electro.constant.ResourceName;
import com.electro.constant.SearchFields;
import com.electro.dto.address.AddressRequest;
import com.electro.dto.address.AddressResponse;
import com.electro.dto.address.DistrictRequest;
import com.electro.dto.address.DistrictResponse;
import com.electro.dto.address.ProvinceRequest;
import com.electro.dto.address.ProvinceResponse;
import com.electro.dto.authentication.RoleRequest;
import com.electro.dto.authentication.RoleResponse;
import com.electro.dto.authentication.UserRequest;
import com.electro.dto.authentication.UserResponse;
import com.electro.dto.customer.CustomerGroupRequest;
import com.electro.dto.customer.CustomerGroupResponse;
import com.electro.dto.customer.CustomerRequest;
import com.electro.dto.customer.CustomerResourceRequest;
import com.electro.dto.customer.CustomerResourceResponse;
import com.electro.dto.customer.CustomerResponse;
import com.electro.dto.customer.CustomerStatusRequest;
import com.electro.dto.customer.CustomerStatusResponse;
import com.electro.dto.employee.DepartmentRequest;
import com.electro.dto.employee.DepartmentResponse;
import com.electro.dto.employee.EmployeeRequest;
import com.electro.dto.employee.EmployeeResponse;
import com.electro.dto.employee.JobLevelRequest;
import com.electro.dto.employee.JobLevelResponse;
import com.electro.dto.employee.JobTitleRequest;
import com.electro.dto.employee.JobTitleResponse;
import com.electro.dto.employee.JobTypeRequest;
import com.electro.dto.employee.JobTypeResponse;
import com.electro.dto.employee.OfficeRequest;
import com.electro.dto.employee.OfficeResponse;
import com.electro.dto.product.BrandRequest;
import com.electro.dto.product.BrandResponse;
import com.electro.entity.address.Address;
import com.electro.entity.address.District;
import com.electro.entity.authentication.Role;
import com.electro.entity.authentication.User;
import com.electro.entity.customer.Customer;
import com.electro.entity.customer.CustomerGroup;
import com.electro.entity.customer.CustomerResource;
import com.electro.entity.customer.CustomerStatus;
import com.electro.entity.employee.Department;
import com.electro.entity.employee.Employee;
import com.electro.entity.employee.JobLevel;
import com.electro.entity.employee.JobTitle;
import com.electro.entity.employee.JobType;
import com.electro.entity.employee.Office;
import com.electro.entity.product.Brand;
import com.electro.mapper.address.AddressMapper;
import com.electro.mapper.address.DistrictMapper;
import com.electro.mapper.authentication.RoleMapper;
import com.electro.mapper.authentication.UserMapper;
import com.electro.mapper.customer.CustomerGroupMapper;
import com.electro.mapper.customer.CustomerMapper;
import com.electro.mapper.customer.CustomerResourceMapper;
import com.electro.mapper.customer.CustomerStatusMapper;
import com.electro.mapper.employee.DepartmentMapper;
import com.electro.mapper.employee.EmployeeMapper;
import com.electro.mapper.employee.JobLevelMapper;
import com.electro.mapper.employee.JobTitleMapper;
import com.electro.mapper.employee.JobTypeMapper;
import com.electro.mapper.employee.OfficeMapper;
import com.electro.mapper.product.BrandMapper;
import com.electro.repository.address.AddressRepository;
import com.electro.repository.address.DistrictRepository;
import com.electro.repository.authentication.RoleRepository;
import com.electro.repository.authentication.UserRepository;
import com.electro.repository.customer.CustomerGroupRepository;
import com.electro.repository.customer.CustomerRepository;
import com.electro.repository.customer.CustomerResourceRepository;
import com.electro.repository.customer.CustomerStatusRepository;
import com.electro.repository.employee.DepartmentRepository;
import com.electro.repository.employee.EmployeeRepository;
import com.electro.repository.employee.JobLevelRepository;
import com.electro.repository.employee.JobTitleRepository;
import com.electro.repository.employee.JobTypeRepository;
import com.electro.repository.employee.OfficeRepository;
import com.electro.repository.product.BrandRepository;
import com.electro.service.CrudService;
import com.electro.service.GenericService;
import com.electro.service.address.ProvinceService;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.AllArgsConstructor;
import org.springframework.context.ApplicationContext;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.mvc.method.RequestMappingInfo;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;
import org.springframework.web.util.pattern.PathPatternParser;

import javax.annotation.PostConstruct;
import java.util.List;

@Component
@AllArgsConstructor
public class GenericMappingRegister {

    private ApplicationContext context;
    private RequestMappingHandlerMapping handlerMapping;

    // Controllers
    private GenericController<ProvinceRequest, ProvinceResponse> provinceController;
    private GenericController<DistrictRequest, DistrictResponse> districtController;
    private GenericController<AddressRequest, AddressResponse> addressController;
    private GenericController<UserRequest, UserResponse> userController;
    private GenericController<RoleRequest, RoleResponse> roleController;
    private GenericController<OfficeRequest, OfficeResponse> officeController;
    private GenericController<DepartmentRequest, DepartmentResponse> departmentController;
    private GenericController<JobLevelRequest, JobLevelResponse> jobLevelController;
    private GenericController<JobTypeRequest, JobTypeResponse> jobTypeController;
    private GenericController<JobTitleRequest, JobTitleResponse> jobTitleController;
    private GenericController<EmployeeRequest, EmployeeResponse> employeeController;
    private GenericController<CustomerGroupRequest, CustomerGroupResponse> customerGroupController;
    private GenericController<CustomerResourceRequest, CustomerResourceResponse> customerResourceController;
    private GenericController<CustomerStatusRequest, CustomerStatusResponse> customerStatusController;
    private GenericController<CustomerRequest, CustomerResponse> customerController;
    private GenericController<BrandRequest, BrandResponse> brandController;

    // Services
    private GenericService<District, DistrictRequest, DistrictResponse> districtService;
    private GenericService<Address, AddressRequest, AddressResponse> addressService;
    private GenericService<User, UserRequest, UserResponse> userService;
    private GenericService<Role, RoleRequest, RoleResponse> roleService;
    private GenericService<Office, OfficeRequest, OfficeResponse> officeService;
    private GenericService<Department, DepartmentRequest, DepartmentResponse> departmentService;
    private GenericService<JobLevel, JobLevelRequest, JobLevelResponse> jobLevelService;
    private GenericService<JobType, JobTypeRequest, JobTypeResponse> jobTypeService;
    private GenericService<JobTitle, JobTitleRequest, JobTitleResponse> jobTitleService;
    private GenericService<Employee, EmployeeRequest, EmployeeResponse> employeeService;
    private GenericService<CustomerGroup, CustomerGroupRequest, CustomerGroupResponse> customerGroupService;
    private GenericService<CustomerResource, CustomerResourceRequest, CustomerResourceResponse> customerResourceService;
    private GenericService<CustomerStatus, CustomerStatusRequest, CustomerStatusResponse> customerStatusService;
    private GenericService<Customer, CustomerRequest, CustomerResponse> customerService;
    private GenericService<Brand, BrandRequest, BrandResponse> brandService;

    @PostConstruct
    public void registerControllers() throws NoSuchMethodException {

        register("provinces", provinceController, context.getBean(ProvinceService.class), ProvinceRequest.class);

        register("districts", districtController, districtService.init(
                context.getBean(DistrictRepository.class),
                context.getBean(DistrictMapper.class),
                SearchFields.DISTRICT,
                ResourceName.DISTRICT
        ), DistrictRequest.class);

        register("addresses", addressController, addressService.init(
                context.getBean(AddressRepository.class),
                context.getBean(AddressMapper.class),
                SearchFields.ADDRESS,
                ResourceName.ADDRESS
        ), AddressRequest.class);

        register("users", userController, userService.init(
                context.getBean(UserRepository.class),
                context.getBean(UserMapper.class),
                SearchFields.USER,
                ResourceName.USER
        ), UserRequest.class);

        register("roles", roleController, roleService.init(
                context.getBean(RoleRepository.class),
                context.getBean(RoleMapper.class),
                SearchFields.ROLE,
                ResourceName.ROLE
        ), RoleRequest.class);

        register("offices", officeController, officeService.init(
                context.getBean(OfficeRepository.class),
                context.getBean(OfficeMapper.class),
                SearchFields.OFFICE,
                ResourceName.OFFICE
        ), OfficeRequest.class);

        register("departments", departmentController, departmentService.init(
                context.getBean(DepartmentRepository.class),
                context.getBean(DepartmentMapper.class),
                SearchFields.DEPARTMENT,
                ResourceName.DEPARTMENT
        ), DepartmentRequest.class);

        register("job-levels", jobLevelController, jobLevelService.init(
                context.getBean(JobLevelRepository.class),
                context.getBean(JobLevelMapper.class),
                SearchFields.JOB_LEVEL,
                ResourceName.JOB_LEVEL
        ), JobLevelRequest.class);

        register("job-titles", jobTitleController, jobTitleService.init(
                context.getBean(JobTitleRepository.class),
                context.getBean(JobTitleMapper.class),
                SearchFields.JOB_TITLE,
                ResourceName.JOB_TITLE
        ), JobTitleRequest.class);

        register("job-types", jobTypeController, jobTypeService.init(
                context.getBean(JobTypeRepository.class),
                context.getBean(JobTypeMapper.class),
                SearchFields.JOB_TYPE,
                ResourceName.JOB_TYPE
        ), JobTypeRequest.class);

        register("employees", employeeController, employeeService.init(
                context.getBean(EmployeeRepository.class),
                context.getBean(EmployeeMapper.class),
                SearchFields.EMPLOYEE,
                ResourceName.EMPLOYEE
        ), EmployeeRequest.class);

        register("customer-groups", customerGroupController, customerGroupService.init(
                context.getBean(CustomerGroupRepository.class),
                context.getBean(CustomerGroupMapper.class),
                SearchFields.CUSTOMER_GROUP,
                ResourceName.CUSTOMER_GROUP
        ), CustomerGroupRequest.class);

        register("customer-resources", customerResourceController, customerResourceService.init(
                context.getBean(CustomerResourceRepository.class),
                context.getBean(CustomerResourceMapper.class),
                SearchFields.CUSTOMER_RESOURCE,
                ResourceName.CUSTOMER_RESOURCE
        ), CustomerResourceRequest.class);

        register("customer-status", customerStatusController, customerStatusService.init(
                context.getBean(CustomerStatusRepository.class),
                context.getBean(CustomerStatusMapper.class),
                SearchFields.CUSTOMER_STATUS,
                ResourceName.CUSTOMER_STATUS
        ), CustomerStatusRequest.class);

        register("customers", customerController, customerService.init(
                context.getBean(CustomerRepository.class),
                context.getBean(CustomerMapper.class),
                SearchFields.CUSTOMER,
                ResourceName.CUSTOMER
        ), CustomerRequest.class);

        register("brands", brandController, brandService.init(
                context.getBean(BrandRepository.class),
                context.getBean(BrandMapper.class),
                SearchFields.BRAND,
                ResourceName.BRAND
        ), BrandRequest.class);

    }

    private <I, O> void register(String resource,
                                 GenericController<I, O> controller,
                                 CrudService<I, O> service,
                                 Class<I> requestType
    ) throws NoSuchMethodException {
        RequestMappingInfo.BuilderConfiguration options = new RequestMappingInfo.BuilderConfiguration();
        options.setPatternParser(new PathPatternParser());

        controller.setCrudService(service);
        controller.setRequestType(requestType);

        handlerMapping.registerMapping(
                RequestMappingInfo.paths("/api/" + resource)
                        .methods(RequestMethod.GET)
                        .produces(MediaType.APPLICATION_JSON_VALUE)
                        .options(options)
                        .build(),
                controller,
                controller.getClass().getMethod("getAllResources", int.class, int.class,
                        String.class, String.class, String.class, boolean.class)
        );

        handlerMapping.registerMapping(
                RequestMappingInfo.paths("/api/" + resource + "/{id}")
                        .methods(RequestMethod.GET)
                        .produces(MediaType.APPLICATION_JSON_VALUE)
                        .options(options)
                        .build(),
                controller,
                controller.getClass().getMethod("getResource", Long.class)
        );

        handlerMapping.registerMapping(
                RequestMappingInfo.paths("/api/" + resource)
                        .methods(RequestMethod.POST)
                        .consumes(MediaType.APPLICATION_JSON_VALUE)
                        .produces(MediaType.APPLICATION_JSON_VALUE)
                        .options(options)
                        .build(),
                controller,
                controller.getClass().getMethod("createResource", JsonNode.class)
        );

        handlerMapping.registerMapping(
                RequestMappingInfo.paths("/api/" + resource + "/{id}")
                        .methods(RequestMethod.PUT)
                        .consumes(MediaType.APPLICATION_JSON_VALUE)
                        .produces(MediaType.APPLICATION_JSON_VALUE)
                        .options(options)
                        .build(),
                controller,
                controller.getClass().getMethod("updateResource", Long.class, JsonNode.class)
        );

        handlerMapping.registerMapping(
                RequestMappingInfo.paths("/api/" + resource + "/{id}")
                        .methods(RequestMethod.DELETE)
                        .options(options)
                        .build(),
                controller,
                controller.getClass().getMethod("deleteResource", Long.class)
        );

        handlerMapping.registerMapping(
                RequestMappingInfo.paths("/api/" + resource)
                        .methods(RequestMethod.DELETE)
                        .consumes(MediaType.APPLICATION_JSON_VALUE)
                        .options(options)
                        .build(),
                controller,
                controller.getClass().getMethod("deleteResources", List.class)
        );
    }

}
