package com.electro.utils;

import com.electro.entity.BaseEntity;
import com.electro.entity.address.District;
import com.electro.entity.address.Province;
import com.electro.entity.authentication.User;
import com.electro.entity.customer.CustomerGroup;
import com.electro.entity.customer.CustomerResource;
import com.electro.entity.customer.CustomerStatus;
import com.electro.entity.employee.Department;
import com.electro.entity.employee.JobLevel;
import com.electro.entity.employee.JobTitle;
import com.electro.entity.employee.JobType;
import com.electro.entity.employee.Office;
import com.electro.entity.inventory.Count;
import com.electro.entity.inventory.Transfer;
import com.electro.entity.inventory.Warehouse;
import com.electro.entity.product.Brand;
import com.electro.entity.product.Category;
import com.electro.entity.product.Guarantee;
import com.electro.entity.product.Product;
import com.electro.entity.product.Supplier;
import com.electro.entity.product.Unit;
import com.electro.entity.product.Variant;
import com.electro.repository.authentication.RoleRepository;
import com.electro.repository.product.TagRepository;
import com.electro.repository.product.VariantRepository;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;
import org.mapstruct.ReportingPolicy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public abstract class MapperUtils {

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private TagRepository tagRepository;
    @Autowired
    private VariantRepository variantRepository;

    public abstract Province mapToProvince(Long id);

    public abstract District mapToDistrict(Long id);

    public abstract Office mapToOffice(Long id);

    public abstract Department mapToDepartment(Long id);

    public abstract JobType mapToJobType(Long id);

    public abstract JobLevel mapToJobLevel(Long id);

    public abstract JobTitle mapToJobTitle(Long id);

    public abstract CustomerGroup mapToCustomerGroup(Long id);

    public abstract CustomerResource mapToCustomerResource(Long id);

    public abstract CustomerStatus mapToCustomerStatus(Long id);

    public abstract Category mapToCategory(Long id);

    public abstract Brand mapToBrand(Long id);

    public abstract Supplier mapToSupplier(Long id);

    public abstract Unit mapToUnit(Long id);

    public abstract Guarantee mapToGuarantee(Long id);

    public abstract Product mapToProduct(Long id);

    public abstract Warehouse mapToWarehouse(Long id);

    public Variant mapToVariant(Long id) {
        return variantRepository.getById(id);
    }

    @Named("hashPassword")
    public String hashPassword(String password) {
        return passwordEncoder.encode(password);
    }

    @AfterMapping
    @Named("attachUser")
    public User attachUser(@MappingTarget User user) {
        return user.setRoles(attachSet(user.getRoles(), roleRepository));
    }

    @AfterMapping
    @Named("attachProduct")
    public Product attachProduct(@MappingTarget Product product) {
        return product.setTags(attachSet(product.getTags(), tagRepository));
    }

    @AfterMapping
    @Named("attachCount")
    public Count attachCount(@MappingTarget Count count) {
        count.getCountVariants().forEach(countVariant -> countVariant.setCount(count));
        return count;
    }

    @AfterMapping
    @Named("attachTransfer")
    public Transfer attachTransfer(@MappingTarget Transfer transfer) {
        transfer.getTransferVariants().forEach(transferVariant -> transferVariant.setTransfer(transfer));
        return transfer;
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
