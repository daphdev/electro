package com.electro.utils;

import com.electro.entity.BaseEntity;
import com.electro.entity.address.District;
import com.electro.entity.address.Province;
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
import com.electro.entity.product.Category;
import com.electro.entity.product.Guarantee;
import com.electro.entity.product.Product;
import com.electro.entity.product.Supplier;
import com.electro.entity.product.Unit;
import com.electro.repository.authentication.RoleRepository;
import com.electro.repository.product.TagRepository;
import lombok.AllArgsConstructor;
import org.mapstruct.AfterMapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Component
@AllArgsConstructor
public class MapperUtils {

    private PasswordEncoder passwordEncoder;
    private RoleRepository roleRepository;
    private TagRepository tagRepository;

    @Named("mapProvinceIdToProvince")
    public Province mapProvinceIdToProvince(Long id) {
        return (Province) new Province().setId(id);
    }

    @Named("mapDistrictIdToDistrict")
    public District mapDistrictIdToDistrict(Long id) {
        return (District) new District().setId(id);
    }

    @Named("hashPassword")
    public String hashPassword(String password) {
        return passwordEncoder.encode(password);
    }

    @Named("mapOfficeIdToOffice")
    public Office mapOfficeIdToOffice(Long id) {
        return (Office) new Office().setId(id);
    }

    @Named("mapDepartmentIdToDepartment")
    public Department mapDepartmentIdToDepartment(Long id) {
        return (Department) new Department().setId(id);
    }

    @Named("mapJobTypeIdToJobType")
    public JobType mapJobTypeIdToJobType(Long id) {
        return (JobType) new JobType().setId(id);
    }

    @Named("mapJobLevelIdToJobLevel")
    public JobLevel mapJobLevelIdToJobLevel(Long id) {
        return (JobLevel) new JobLevel().setId(id);
    }

    @Named("mapJobTitleIdToJobTitle")
    public JobTitle mapJobTitleIdToJobTitle(Long id) {
        return (JobTitle) new JobTitle().setId(id);
    }

    @Named("mapCustomerGroupIdToCustomerGroup")
    public CustomerGroup mapCustomerGroupIdToCustomerGroup(Long id) {
        return (CustomerGroup) new CustomerGroup().setId(id);
    }

    @Named("mapCustomerResourceIdToCustomerResource")
    public CustomerResource mapCustomerResourceIdToCustomerResource(Long id) {
        return (CustomerResource) new CustomerResource().setId(id);
    }

    @Named("mapCustomerStatusIdToCustomerStatus")
    public CustomerStatus mapCustomerStatusIdToCustomerStatus(Long id) {
        return (CustomerStatus) new CustomerStatus().setId(id);
    }

    @Named("mapCategoryIdToCategory")
    public Category mapCategoryIdToCategory(Long id) {
        return (Category) new Category().setId(id);
    }

    @Named("mapBrandIdToBrand")
    public Brand mapBrandIdToBrand(Long id) {
        return (Brand) new Brand().setId(id);
    }

    @Named("mapSupplierIdToSupplier")
    public Supplier mapSupplierIdToSupplier(Long id) {
        return (Supplier) new Supplier().setId(id);
    }

    @Named("mapUnitIdToUnit")
    public Unit mapUnitIdToUnit(Long id) {
        return (Unit) new Unit().setId(id);
    }

    @Named("mapGuaranteeIdToGuarantee")
    public Guarantee mapGuaranteeIdToGuarantee(Long id) {
        return (Guarantee) new Guarantee().setId(id);
    }

    @Named("mapProductIdToProduct")
    public Product mapProductIdToProduct(Long id) {
        return (Product) new Product().setId(id);
    }

    @AfterMapping
    @Named("attachUser")
    public User attachUser(@MappingTarget User user) {
        return user.setRoles(attachSet(user.getRoles(), roleRepository));
    }

    @AfterMapping
    @Named("attachEmployee")
    public Employee attachEmployee(@MappingTarget Employee employee) {
        employee.getUser().setRoles(attachSet(employee.getUser().getRoles(), roleRepository));
        return employee;
    }

    @AfterMapping
    @Named("attachCustomer")
    public Customer attachCustomer(@MappingTarget Customer customer) {
        customer.getUser().setRoles(attachSet(customer.getUser().getRoles(), roleRepository));
        return customer;
    }

    @AfterMapping
    @Named("attachProduct")
    public Product attachProduct(@MappingTarget Product product) {
        return product.setTags(attachSet(product.getTags(), tagRepository));
    }

    private <E extends BaseEntity> Set<E> attachSet(Set<E> entities, JpaRepository<E, Long> repository) {
        Set<E> detachedSet = Optional.ofNullable(entities).orElseGet(HashSet::new);
        Set<E> attachedSet = new HashSet<>();

        for (E entity : detachedSet) {
            if (entity.getId() != null) {
                repository.findById(entity.getId()).ifPresent(attachedSet::add);
            } else {
                attachedSet.add(entity);
            }
        }

        return attachedSet;
    }

}
