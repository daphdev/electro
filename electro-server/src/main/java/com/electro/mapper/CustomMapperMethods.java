package com.electro.mapper;

import com.electro.entity.address.District;
import com.electro.entity.address.Province;
import org.mapstruct.Named;

public interface CustomMapperMethods {

    @Named("mapProvinceIdToProvince")
    default Province mapProvinceIdToProvince(Long id) {
        return (Province) new Province().setId(id);
    }

    @Named("mapDistrictIdToDistrict")
    default District mapDistrictIdToDistrict(Long id) {
        return (District) new District().setId(id);
    }

}
