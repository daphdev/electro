package com.electro.controller;

import com.electro.constant.ResourceName;
import com.electro.constant.SearchFields;
import com.electro.dto.address.AddressRequest;
import com.electro.dto.address.AddressResponse;
import com.electro.dto.address.DistrictRequest;
import com.electro.dto.address.DistrictResponse;
import com.electro.dto.address.ProvinceRequest;
import com.electro.dto.address.ProvinceResponse;
import com.electro.dto.address.WardRequest;
import com.electro.dto.address.WardResponse;
import com.electro.dto.authentication.RoleRequest;
import com.electro.dto.authentication.RoleResponse;
import com.electro.dto.authentication.UserRequest;
import com.electro.dto.authentication.UserResponse;
import com.electro.dto.cashbook.PaymentMethodRequest;
import com.electro.dto.cashbook.PaymentMethodResponse;
import com.electro.dto.chat.RoomRequest;
import com.electro.dto.chat.RoomResponse;
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
import com.electro.dto.general.ImageRequest;
import com.electro.dto.general.ImageResponse;
import com.electro.dto.inventory.CountRequest;
import com.electro.dto.inventory.CountResponse;
import com.electro.dto.inventory.DestinationRequest;
import com.electro.dto.inventory.DestinationResponse;
import com.electro.dto.inventory.DocketReasonRequest;
import com.electro.dto.inventory.DocketReasonResponse;
import com.electro.dto.inventory.DocketRequest;
import com.electro.dto.inventory.DocketResponse;
import com.electro.dto.inventory.ProductInventoryLimitRequest;
import com.electro.dto.inventory.ProductInventoryLimitResponse;
import com.electro.dto.inventory.PurchaseOrderRequest;
import com.electro.dto.inventory.PurchaseOrderResponse;
import com.electro.dto.inventory.StorageLocationRequest;
import com.electro.dto.inventory.StorageLocationResponse;
import com.electro.dto.inventory.TransferRequest;
import com.electro.dto.inventory.TransferResponse;
import com.electro.dto.inventory.VariantInventoryLimitRequest;
import com.electro.dto.inventory.VariantInventoryLimitResponse;
import com.electro.dto.inventory.WarehouseRequest;
import com.electro.dto.inventory.WarehouseResponse;
import com.electro.dto.order.OrderCancellationReasonRequest;
import com.electro.dto.order.OrderCancellationReasonResponse;
import com.electro.dto.order.OrderRequest;
import com.electro.dto.order.OrderResourceRequest;
import com.electro.dto.order.OrderResourceResponse;
import com.electro.dto.order.OrderResponse;
import com.electro.dto.product.BrandRequest;
import com.electro.dto.product.BrandResponse;
import com.electro.dto.product.CategoryRequest;
import com.electro.dto.product.CategoryResponse;
import com.electro.dto.product.GuaranteeRequest;
import com.electro.dto.product.GuaranteeResponse;
import com.electro.dto.product.ProductRequest;
import com.electro.dto.product.ProductResponse;
import com.electro.dto.product.PropertyRequest;
import com.electro.dto.product.PropertyResponse;
import com.electro.dto.product.SpecificationRequest;
import com.electro.dto.product.SpecificationResponse;
import com.electro.dto.product.SupplierRequest;
import com.electro.dto.product.SupplierResponse;
import com.electro.dto.product.TagRequest;
import com.electro.dto.product.TagResponse;
import com.electro.dto.product.UnitRequest;
import com.electro.dto.product.UnitResponse;
import com.electro.dto.product.VariantRequest;
import com.electro.dto.product.VariantResponse;
import com.electro.dto.promotion.PromotionRequest;
import com.electro.dto.promotion.PromotionResponse;
import com.electro.dto.review.ReviewRequest;
import com.electro.dto.review.ReviewResponse;
import com.electro.dto.reward.RewardStrategyRequest;
import com.electro.dto.reward.RewardStrategyResponse;
import com.electro.dto.waybill.WaybillRequest;
import com.electro.dto.waybill.WaybillResponse;
import com.electro.entity.address.Address;
import com.electro.entity.address.District;
import com.electro.entity.address.Ward;
import com.electro.entity.authentication.Role;
import com.electro.entity.authentication.User;
import com.electro.entity.cashbook.PaymentMethod;
import com.electro.entity.chat.Room;
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
import com.electro.entity.general.Image;
import com.electro.entity.inventory.Count;
import com.electro.entity.inventory.Destination;
import com.electro.entity.inventory.DocketReason;
import com.electro.entity.inventory.ProductInventoryLimit;
import com.electro.entity.inventory.PurchaseOrder;
import com.electro.entity.inventory.StorageLocation;
import com.electro.entity.inventory.Transfer;
import com.electro.entity.inventory.VariantInventoryLimit;
import com.electro.entity.inventory.Warehouse;
import com.electro.entity.order.Order;
import com.electro.entity.order.OrderCancellationReason;
import com.electro.entity.order.OrderResource;
import com.electro.entity.product.Brand;
import com.electro.entity.product.Category;
import com.electro.entity.product.Guarantee;
import com.electro.entity.product.Product;
import com.electro.entity.product.Property;
import com.electro.entity.product.Specification;
import com.electro.entity.product.Supplier;
import com.electro.entity.product.Tag;
import com.electro.entity.product.Unit;
import com.electro.entity.product.Variant;
import com.electro.entity.reward.RewardStrategy;
import com.electro.mapper.address.AddressMapper;
import com.electro.mapper.address.DistrictMapper;
import com.electro.mapper.address.WardMapper;
import com.electro.mapper.authentication.RoleMapper;
import com.electro.mapper.authentication.UserMapper;
import com.electro.mapper.cashbook.PaymentMethodMapper;
import com.electro.mapper.chat.RoomMapper;
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
import com.electro.mapper.general.ImageMapper;
import com.electro.mapper.inventory.CountMapper;
import com.electro.mapper.inventory.DestinationMapper;
import com.electro.mapper.inventory.DocketReasonMapper;
import com.electro.mapper.inventory.ProductInventoryLimitMapper;
import com.electro.mapper.inventory.PurchaseOrderMapper;
import com.electro.mapper.inventory.StorageLocationMapper;
import com.electro.mapper.inventory.TransferMapper;
import com.electro.mapper.inventory.VariantInventoryLimitMapper;
import com.electro.mapper.inventory.WarehouseMapper;
import com.electro.mapper.order.OrderCancellationReasonMapper;
import com.electro.mapper.order.OrderMapper;
import com.electro.mapper.order.OrderResourceMapper;
import com.electro.mapper.product.BrandMapper;
import com.electro.mapper.product.CategoryMapper;
import com.electro.mapper.product.GuaranteeMapper;
import com.electro.mapper.product.ProductMapper;
import com.electro.mapper.product.PropertyMapper;
import com.electro.mapper.product.SpecificationMapper;
import com.electro.mapper.product.SupplierMapper;
import com.electro.mapper.product.TagMapper;
import com.electro.mapper.product.UnitMapper;
import com.electro.mapper.product.VariantMapper;
import com.electro.mapper.reward.RewardStrategyMapper;
import com.electro.repository.address.AddressRepository;
import com.electro.repository.address.DistrictRepository;
import com.electro.repository.address.WardRepository;
import com.electro.repository.authentication.RoleRepository;
import com.electro.repository.authentication.UserRepository;
import com.electro.repository.cashbook.PaymentMethodRepository;
import com.electro.repository.chat.RoomRepository;
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
import com.electro.repository.general.ImageRepository;
import com.electro.repository.inventory.CountRepository;
import com.electro.repository.inventory.DestinationRepository;
import com.electro.repository.inventory.DocketReasonRepository;
import com.electro.repository.inventory.ProductInventoryLimitRepository;
import com.electro.repository.inventory.PurchaseOrderRepository;
import com.electro.repository.inventory.StorageLocationRepository;
import com.electro.repository.inventory.TransferRepository;
import com.electro.repository.inventory.VariantInventoryLimitRepository;
import com.electro.repository.inventory.WarehouseRepository;
import com.electro.repository.order.OrderCancellationReasonRepository;
import com.electro.repository.order.OrderRepository;
import com.electro.repository.order.OrderResourceRepository;
import com.electro.repository.product.BrandRepository;
import com.electro.repository.product.CategoryRepository;
import com.electro.repository.product.GuaranteeRepository;
import com.electro.repository.product.ProductRepository;
import com.electro.repository.product.PropertyRepository;
import com.electro.repository.product.SpecificationRepository;
import com.electro.repository.product.SupplierRepository;
import com.electro.repository.product.TagRepository;
import com.electro.repository.product.UnitRepository;
import com.electro.repository.product.VariantRepository;
import com.electro.repository.reward.RewardStrategyRepository;
import com.electro.service.CrudService;
import com.electro.service.GenericService;
import com.electro.service.address.ProvinceService;
import com.electro.service.inventory.DocketService;
import com.electro.service.promotion.PromotionService;
import com.electro.service.review.ReviewService;
import com.electro.service.waybill.WaybillService;
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
    private GenericController<WardRequest, WardResponse> wardController;
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
    private GenericController<PropertyRequest, PropertyResponse> propertyController;
    private GenericController<CategoryRequest, CategoryResponse> categoryController;
    private GenericController<TagRequest, TagResponse> tagController;
    private GenericController<GuaranteeRequest, GuaranteeResponse> guaranteeController;
    private GenericController<UnitRequest, UnitResponse> unitController;
    private GenericController<SupplierRequest, SupplierResponse> supplierController;
    private GenericController<BrandRequest, BrandResponse> brandController;
    private GenericController<SpecificationRequest, SpecificationResponse> specificationController;
    private GenericController<ProductRequest, ProductResponse> productController;
    private GenericController<VariantRequest, VariantResponse> variantController;
    private GenericController<ImageRequest, ImageResponse> imageController;
    private GenericController<ProductInventoryLimitRequest, ProductInventoryLimitResponse> productInventoryLimitController;
    private GenericController<VariantInventoryLimitRequest, VariantInventoryLimitResponse> variantInventoryLimitController;
    private GenericController<WarehouseRequest, WarehouseResponse> warehouseController;
    private GenericController<CountRequest, CountResponse> countController;
    private GenericController<DestinationRequest, DestinationResponse> destinationController;
    private GenericController<DocketReasonRequest, DocketReasonResponse> docketReasonController;
    private GenericController<TransferRequest, TransferResponse> transferController;
    private GenericController<DocketRequest, DocketResponse> docketController;
    private GenericController<StorageLocationRequest, StorageLocationResponse> storageLocationController;
    private GenericController<PurchaseOrderRequest, PurchaseOrderResponse> purchaseOrderController;
    private GenericController<OrderResourceRequest, OrderResourceResponse> orderResourceController;
    private GenericController<OrderCancellationReasonRequest, OrderCancellationReasonResponse> orderCancellationReasonController;
    private GenericController<OrderRequest, OrderResponse> orderController;
    private GenericController<WaybillRequest, WaybillResponse> waybillController;
    private GenericController<ReviewRequest, ReviewResponse> reviewController;
    private GenericController<PaymentMethodRequest, PaymentMethodResponse> paymentMethodController;
    private GenericController<PromotionRequest, PromotionResponse> promotionController;
    private GenericController<RoomRequest, RoomResponse> roomController;
    private GenericController<RewardStrategyRequest, RewardStrategyResponse> rewardStrategyController;

    // Services
    private GenericService<District, DistrictRequest, DistrictResponse> districtService;
    private GenericService<Ward, WardRequest, WardResponse> wardService;
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
    private GenericService<Property, PropertyRequest, PropertyResponse> propertyService;
    private GenericService<Category, CategoryRequest, CategoryResponse> categoryService;
    private GenericService<Tag, TagRequest, TagResponse> tagService;
    private GenericService<Guarantee, GuaranteeRequest, GuaranteeResponse> guaranteeService;
    private GenericService<Unit, UnitRequest, UnitResponse> unitService;
    private GenericService<Supplier, SupplierRequest, SupplierResponse> supplierService;
    private GenericService<Brand, BrandRequest, BrandResponse> brandService;
    private GenericService<Specification, SpecificationRequest, SpecificationResponse> specificationService;
    private GenericService<Product, ProductRequest, ProductResponse> productService;
    private GenericService<Variant, VariantRequest, VariantResponse> variantService;
    private GenericService<Image, ImageRequest, ImageResponse> imageService;
    private GenericService<ProductInventoryLimit, ProductInventoryLimitRequest, ProductInventoryLimitResponse> productInventoryLimitService;
    private GenericService<VariantInventoryLimit, VariantInventoryLimitRequest, VariantInventoryLimitResponse> variantInventoryLimitService;
    private GenericService<Warehouse, WarehouseRequest, WarehouseResponse> warehouseService;
    private GenericService<Count, CountRequest, CountResponse> countService;
    private GenericService<Destination, DestinationRequest, DestinationResponse> destinationService;
    private GenericService<DocketReason, DocketReasonRequest, DocketReasonResponse> docketReasonService;
    private GenericService<Transfer, TransferRequest, TransferResponse> transferService;
    private GenericService<StorageLocation, StorageLocationRequest, StorageLocationResponse> storageLocationService;
    private GenericService<PurchaseOrder, PurchaseOrderRequest, PurchaseOrderResponse> purchaseOrderService;
    private GenericService<OrderResource, OrderResourceRequest, OrderResourceResponse> orderResourceService;
    private GenericService<OrderCancellationReason, OrderCancellationReasonRequest, OrderCancellationReasonResponse> orderCancellationReasonService;
    private GenericService<Order, OrderRequest, OrderResponse> orderService;
    private GenericService<PaymentMethod, PaymentMethodRequest, PaymentMethodResponse> paymentMethodService;
    private GenericService<Room, RoomRequest, RoomResponse> roomService;
    private GenericService<RewardStrategy, RewardStrategyRequest, RewardStrategyResponse> rewardStrategyService;

    @PostConstruct
    public void registerControllers() throws NoSuchMethodException {

        register("provinces", provinceController, context.getBean(ProvinceService.class), ProvinceRequest.class);

        register("districts", districtController, districtService.init(
                context.getBean(DistrictRepository.class),
                context.getBean(DistrictMapper.class),
                SearchFields.DISTRICT,
                ResourceName.DISTRICT
        ), DistrictRequest.class);

        register("wards", wardController, wardService.init(
                context.getBean(WardRepository.class),
                context.getBean(WardMapper.class),
                SearchFields.WARD,
                ResourceName.WARD
        ), WardRequest.class);

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

        register("properties", propertyController, propertyService.init(
                context.getBean(PropertyRepository.class),
                context.getBean(PropertyMapper.class),
                SearchFields.PROPERTY,
                ResourceName.PROPERTY
        ), PropertyRequest.class);

        register("categories", categoryController, categoryService.init(
                context.getBean(CategoryRepository.class),
                context.getBean(CategoryMapper.class),
                SearchFields.CATEGORY,
                ResourceName.CATEGORY
        ), CategoryRequest.class);

        register("tags", tagController, tagService.init(
                context.getBean(TagRepository.class),
                context.getBean(TagMapper.class),
                SearchFields.TAG,
                ResourceName.TAG
        ), TagRequest.class);

        register("guarantees", guaranteeController, guaranteeService.init(
                context.getBean(GuaranteeRepository.class),
                context.getBean(GuaranteeMapper.class),
                SearchFields.GUARANTEE,
                ResourceName.GUARANTEE
        ), GuaranteeRequest.class);

        register("units", unitController, unitService.init(
                context.getBean(UnitRepository.class),
                context.getBean(UnitMapper.class),
                SearchFields.UNIT,
                ResourceName.UNIT
        ), UnitRequest.class);

        register("suppliers", supplierController, supplierService.init(
                context.getBean(SupplierRepository.class),
                context.getBean(SupplierMapper.class),
                SearchFields.SUPPLIER,
                ResourceName.SUPPLIER
        ), SupplierRequest.class);

        register("brands", brandController, brandService.init(
                context.getBean(BrandRepository.class),
                context.getBean(BrandMapper.class),
                SearchFields.BRAND,
                ResourceName.BRAND
        ), BrandRequest.class);

        register("specifications", specificationController, specificationService.init(
                context.getBean(SpecificationRepository.class),
                context.getBean(SpecificationMapper.class),
                SearchFields.SPECIFICATION,
                ResourceName.SPECIFICATION
        ), SpecificationRequest.class);

        register("products", productController, productService.init(
                context.getBean(ProductRepository.class),
                context.getBean(ProductMapper.class),
                SearchFields.PRODUCT,
                ResourceName.PRODUCT
        ), ProductRequest.class);

        register("variants", variantController, variantService.init(
                context.getBean(VariantRepository.class),
                context.getBean(VariantMapper.class),
                SearchFields.VARIANT,
                ResourceName.VARIANT
        ), VariantRequest.class);

        register("images", imageController, imageService.init(
                context.getBean(ImageRepository.class),
                context.getBean(ImageMapper.class),
                SearchFields.IMAGE,
                ResourceName.IMAGE
        ), ImageRequest.class);

        register("product-inventory-limits", productInventoryLimitController, productInventoryLimitService.init(
                context.getBean(ProductInventoryLimitRepository.class),
                context.getBean(ProductInventoryLimitMapper.class),
                SearchFields.PRODUCT_INVENTORY_LIMIT,
                ResourceName.PRODUCT_INVENTORY_LIMIT
        ), ProductInventoryLimitRequest.class);

        register("variant-inventory-limits", variantInventoryLimitController, variantInventoryLimitService.init(
                context.getBean(VariantInventoryLimitRepository.class),
                context.getBean(VariantInventoryLimitMapper.class),
                SearchFields.VARIANT_INVENTORY_LIMIT,
                ResourceName.VARIANT_INVENTORY_LIMIT
        ), VariantInventoryLimitRequest.class);

        register("warehouses", warehouseController, warehouseService.init(
                context.getBean(WarehouseRepository.class),
                context.getBean(WarehouseMapper.class),
                SearchFields.WAREHOUSE,
                ResourceName.WAREHOUSE
        ), WarehouseRequest.class);

        register("counts", countController, countService.init(
                context.getBean(CountRepository.class),
                context.getBean(CountMapper.class),
                SearchFields.COUNT,
                ResourceName.COUNT
        ), CountRequest.class);

        register("destinations", destinationController, destinationService.init(
                context.getBean(DestinationRepository.class),
                context.getBean(DestinationMapper.class),
                SearchFields.DESTINATION,
                ResourceName.DESTINATION
        ), DestinationRequest.class);

        register("docket-reasons", docketReasonController, docketReasonService.init(
                context.getBean(DocketReasonRepository.class),
                context.getBean(DocketReasonMapper.class),
                SearchFields.DOCKET_REASON,
                ResourceName.DOCKET_REASON
        ), DocketReasonRequest.class);

        register("transfers", transferController, transferService.init(
                context.getBean(TransferRepository.class),
                context.getBean(TransferMapper.class),
                SearchFields.TRANSFER,
                ResourceName.TRANSFER
        ), TransferRequest.class);

        register("dockets", docketController, context.getBean(DocketService.class), DocketRequest.class);

        register("storage-locations", storageLocationController, storageLocationService.init(
                context.getBean(StorageLocationRepository.class),
                context.getBean(StorageLocationMapper.class),
                SearchFields.STORAGE_LOCATION,
                ResourceName.STORAGE_LOCATION
        ), StorageLocationRequest.class);

        register("purchase-orders", purchaseOrderController, purchaseOrderService.init(
                context.getBean(PurchaseOrderRepository.class),
                context.getBean(PurchaseOrderMapper.class),
                SearchFields.PURCHASE_ORDER,
                ResourceName.PURCHASE_ORDER
        ), PurchaseOrderRequest.class);

        register("order-resources", orderResourceController, orderResourceService.init(
                context.getBean(OrderResourceRepository.class),
                context.getBean(OrderResourceMapper.class),
                SearchFields.ORDER_RESOURCE,
                ResourceName.ORDER_RESOURCE
        ), OrderResourceRequest.class);

        register("order-cancellation-reasons", orderCancellationReasonController, orderCancellationReasonService.init(
                context.getBean(OrderCancellationReasonRepository.class),
                context.getBean(OrderCancellationReasonMapper.class),
                SearchFields.ORDER_CANCELLATION_REASON,
                ResourceName.ORDER_CANCELLATION_REASON
        ), OrderCancellationReasonRequest.class);

        register("orders", orderController, orderService.init(
                context.getBean(OrderRepository.class),
                context.getBean(OrderMapper.class),
                SearchFields.ORDER,
                ResourceName.ORDER
        ), OrderRequest.class);

        register("waybills", waybillController, context.getBean(WaybillService.class), WaybillRequest.class);

        register("reviews", reviewController, context.getBean(ReviewService.class), ReviewRequest.class);

        register("payment-methods", paymentMethodController, paymentMethodService.init(
                context.getBean(PaymentMethodRepository.class),
                context.getBean(PaymentMethodMapper.class),
                SearchFields.PAYMENT_METHOD,
                ResourceName.PAYMENT_METHOD
        ), PaymentMethodRequest.class);

        register("promotions", promotionController, context.getBean(PromotionService.class), PromotionRequest.class);

        register("rooms", roomController, roomService.init(
                context.getBean(RoomRepository.class),
                context.getBean(RoomMapper.class),
                SearchFields.ROOM,
                ResourceName.ROOM
        ), RoomRequest.class);

        register("reward-strategies", rewardStrategyController, rewardStrategyService.init(
                context.getBean(RewardStrategyRepository.class),
                context.getBean(RewardStrategyMapper.class),
                SearchFields.REWARD_STRATEGY,
                ResourceName.REWARD_STRATEGY
        ), RewardStrategyRequest.class);

    }

    private <I, O> void register(String resource,
                                 GenericController<I, O> controller,
                                 CrudService<Long, I, O> service,
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
